import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// In-memory user store for demo
const users = new Map(); // key: email, value: { name, email, passwordHash }

function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

function authMiddleware(req, res, next) {
  const token = req.cookies['auth_token'];
  if (!token) return res.status(401).json({ message: 'Not authenticated' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

// Helpers
function setAuthCookie(res, token) {
  res.cookie('auth_token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
  });
}

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.post('/api/auth/signup', (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing fields' });
  }
  const normalizedEmail = String(email).toLowerCase();
  if (users.has(normalizedEmail)) {
    return res.status(409).json({ message: 'Email already registered' });
  }
  users.set(normalizedEmail, { name, email: normalizedEmail, passwordHash: password });
  const token = signToken({ name, email: normalizedEmail });
  setAuthCookie(res, token);
  res.json({ user: { name, email: normalizedEmail } });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ message: 'Missing fields' });
  }
  const normalizedEmail = String(email).toLowerCase();
  const user = users.get(normalizedEmail);
  if (!user || user.passwordHash !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = signToken({ name: user.name, email: user.email });
  setAuthCookie(res, token);
  res.json({ user: { name: user.name, email: user.email } });
});

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('auth_token', { path: '/' });
  res.json({ ok: true });
});

app.get('/api/auth/me', authMiddleware, (req, res) => {
  res.json({ user: { name: req.user.name, email: req.user.email } });
});

app.listen(PORT, () => {
  console.log(`Auth server listening on http://localhost:${PORT}`);
});


