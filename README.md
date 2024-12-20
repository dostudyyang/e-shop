
# EECS 4413 E-Shop Project

## Overview

This is a full-stack e-commerce application built using React (Frontend) and Spring Boot (Backend). It features a user-friendly interface, secure login/registration, item management, and more.

---
### Team Name
- TechTrek

### Authors
- Yang Xu
- Shang Yang

**GitHub Repository:** [E-Shop Project](https://github.com/dostudyyang/e-shop)

---

## Setup Instructions

### 1. Database Configuration
#### Step 1: Run SQL Scripts
1. Navigate to the `starter-files\SQL` folder (or wherever your SQL scripts are located).
2. Execute the following scripts in order using your MySQL database client:
   - **`React-Springboot-Add-Tables-Script-1.sql`**: This will create all necessary tables in the database.
   - **`insert_statements.sql`**: This will insert sample item data into the `Item` table.

#### Step 2: Update `application.properties`
1. Open the `application.properties` file in the `backend` folder.
2. Update the following lines with your MySQL database credentials:
   ```properties
   spring.datasource.username=YOUR_USERNAME
   spring.datasource.password=YOUR_PASSWORD

### 2. Frontend SetUp
1. Open a terminal and navigate to the frontend folder:
```bash
    cd path/e-shop/frontend
```
2. Install dependencies:
```bash
    npm install
```
3. Start the React application:
```bash
    npm start
```

### 3. Account SetUp
You are free to create any types of account (Admin/Customer) in the register page.
