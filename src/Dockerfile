# ---- Build Frontend ----
    FROM node:18 AS frontend-build
    WORKDIR /app/frontend
    COPY frontend/package*.json ./
    RUN npm install
    COPY frontend/ .
    RUN npm run build
    
    # ---- Build Backend ----
    FROM maven:3.9.6-eclipse-temurin-17 AS backend-build
    WORKDIR /app/backend
    COPY backend/pom.xml .
    RUN mvn dependency:go-offline
    COPY backend/ .
    RUN mvn clean package -DskipTests
    
    # ---- Final Image ----
    FROM eclipse-temurin:17-jdk
    WORKDIR /app
    
    # Copy Spring Boot jar
    COPY --from=backend-build /app/backend/target/*.jar app.jar
    
    # Copy frontend build into backend static resources
    COPY --from=frontend-build /app/frontend/dist /app/static
    
    EXPOSE 8080
    CMD ["java", "-jar", "app.jar"]
    