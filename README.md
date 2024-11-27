# Admin Dashboard - User and Role Management

This project is a basic admin dashboard built using **Angular 18** for managing **users** and **roles**. It features CRUD operations on users and roles, along with dynamic permission management, and simulates API calls using `json-server`.

## Features

### 1. **User Management**
- View a list of users.
- Add, edit, or delete users.
- Assign roles to users and manage their status (Active/Inactive).

### 2. **Role Management**
- Create, edit, and delete roles.
- Define roles with associated permissions (Read, Write, Delete, etc.).
- Assign roles to users.

### 3. **Dynamic Permissions**
- Assign or modify permissions for each role.
- Easily view and update permissions for any role.

### 4. **Custom API Simulation**
- CRUD operations are simulated using `json-server` as the mock API backend.
- Provides realistic API responses for managing users, roles, and permissions.

---

## Project Setup

### Prerequisites

Make sure you have the following installed:

- **Node.js** (Version 16 or later)
- **Angular CLI** (Version 18 or later)
- **json-server** (for simulating the backend API)

### 1. Clone the Repository

First, clone the project repository:
git clone https://github.com/pPande199803/admin-dashboard.git
cd admin-dashboard



2. Install Dependencies
Run the following command to install the necessary dependencies for the Angular project:

npm install
Also, install json-server globally to simulate the backend:

json-server --watch db.json