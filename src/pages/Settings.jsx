import React, { useState } from "react";
import "../styles/Settings.css";

function Settings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newsletter, setNewsletter] = useState(true);

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <form className="settings-form">
        <label>
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="settings-checkbox">
          <input
            type="checkbox"
            checked={newsletter}
            onChange={(e) => setNewsletter(e.target.checked)}
          />
          Subscribe to newsletter
        </label>
        <button type="button" className="save-btn">Save</button>
      </form>
    </div>
  );
}

export default Settings;


