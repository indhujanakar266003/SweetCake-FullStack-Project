# SweetCake Admin Panel — React + Vite

A responsive starter admin dashboard for a cake customisation website. This first version uses sample/mock data only. It is **not connected to Java Spring Boot or PostgreSQL yet**.

## Requirements

- Node.js LTS installed on Windows
- VS Code recommended for the React/Vite frontend
- Eclipse can be used later for the Java Spring Boot backend

## Run the project

1. Extract `cake-admin-vite.zip`.
2. Open the extracted `cake-admin-vite` folder in VS Code.
3. In VS Code, choose **Terminal → New Terminal**.
4. Check Node.js and npm:

   ```bash
   node -v
   npm -v
   ```

5. Install project packages:

   ```bash
   npm install
   ```

6. Start the development server:

   ```bash
   npm run dev
   ```

7. Open the URL shown in the terminal, usually `http://localhost:5173`.

Stop the server with `Ctrl + C`.

## Current pages

- Dashboard
- Cake Management
- Order Management
- Customer Management
- Custom Cake Requests
- Categories
- Offers / Coupons
- Settings

Navigation and sample interactions work locally, but changes are not saved to a database.

## Later: Java + PostgreSQL integration

1. Create a Spring Boot project in Eclipse with Spring Web, Spring Data JPA, PostgreSQL Driver and Validation.
2. Configure the PostgreSQL connection in `application.properties`.
3. Create entities, repositories, services and REST controllers.
4. Replace sample arrays in `src/App.jsx` with `fetch()` calls to your Spring Boot API.
5. Add admin authentication and authorization before enabling real create/edit/delete actions.
6. Configure CORS on the Spring Boot backend for the frontend's local origin.

Do not store database passwords in frontend code. A React app runs in the browser; it must call your backend API, never connect directly to PostgreSQL.
