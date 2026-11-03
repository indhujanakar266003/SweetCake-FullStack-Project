# SweetCake – Full Stack Cake Ordering & Management System

SweetCake is a full-stack web application that allows customers to explore and customize cakes, place orders, and manage their purchases. It also provides an admin dashboard to manage cakes, customers, and orders.

## Project Modules

### 1. Customer Website
- Browse available cakes
- Customize cakes
- Add cakes to cart
- Place orders
- Select payment method

### 2. Admin Dashboard
- Dashboard overview and statistics
- Cake management (Add, View, Edit, Delete)
- Order management
- Customer management
- Update order status
- Manage cake stock

### 3. Backend
- REST API development using Java Spring Boot
- PostgreSQL database integration
- Handle cakes, customers, and orders
- Connect customer website and admin dashboard

## Technologies Used

| Module | Technologies |
|---|---|
| Frontend | HTML, CSS, JavaScript, Bootstrap |
| Admin Dashboard | React.js, Vite |
| Backend | Java, Spring Boot |
| Database | PostgreSQL |
| Tools | VS Code, Eclipse, Git, GitHub |

## Application Architecture

```text
Customer Website
       |
       v
Spring Boot REST API
       |
       v
PostgreSQL Database
       |
       v
React Admin Dashboard
```

## Project Structure

```text
SweetCake-FullStack-Project/
│
├── customer-website/
│
├── admin-dashboard/
│
├── backend/
│   ├── src/
│   ├── pom.xml
│   └── mvnw
│
└── README.md
```

## Backend Configuration

Configure your PostgreSQL database in `backend/src/main/resources/application.properties`.

Set the `DB_PASSWORD` environment variable with your PostgreSQL password before running the backend.

## How to Run

1. Start PostgreSQL and make sure the database is configured.
2. Run the Spring Boot backend on port `8080`.
3. Start the React admin dashboard using `npm install` and `npm run dev`.
4. Open the customer website using VS Code Live Server.

## Project Status

Core customer ordering, admin management, and backend database integration are implemented.

## Author

**J. Indhumathi**

GitHub: [indhujanakar266003](https://github.com/indhujanakar266003)