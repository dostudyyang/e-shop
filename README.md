# EECS 4413 E-Shop Project



## Overview



This is a full-stack e-commerce application built using React (Frontend) and Spring Boot (Backend). It features a user-friendly interface, secure login/registration, item management, and more.

------

### Team Name



- TechTrek

### Authors



- Yang Xu
- Shang Yang

**GitHub Repository:** [E-Shop Project](https://github.com/dostudyyang/e-shop)

------

## Setup Instructions

### 1.Download zip and Extract it

### 2.Backend SetUp

Step 1:Import Existing Project:

- Open Eclipse IDE.
- Navigate to `File > Import > Maven > Existing Maven Projects`.
- Browse to the project directory (`backend`) and select it.
- Click `Finish` to import the project.

Step 2: Edit Dependencies  (If Needed)

- Open the `pom.xml` file in your project.

- Ensure the Java version matches your local environment. If necessary, update it under the 

  `<properties>`

   section:

  ```
  xml<properties>
      <java.version>17</java.version> <!-- Update this to your local Java version -->
  </properties>
  ```

Step 3: Run the Spring Boot Application

- Open a terminal in the root directory of the project.

- Use the following commands to rebuild and start the application:

  ```
  mvnw clean install
  mvnw spring-boot:run
  ```

  



### 3. Database Configuration

#### Step 1: Run SQL Scripts



1. Navigate to the `starter-files\SQL` folder (or wherever your SQL scripts are located).
2. Execute the following scripts in order using your MySQL database client:
   - **`React-Springboot-Add-Tables-Script-1.sql`**: This will create all necessary tables in the database.
   - **`insert_statements.sql`**: This will insert sample item data into the `Item` table.

#### Step 2: Update `application.properties`



1. Open the `application.properties` file in the `backend` folder.

2. Update the following lines with your MySQL database credentials:

   ```
   spring.datasource.username=YOUR_USERNAME
   spring.datasource.password=YOUR_PASSWORD
   ```

   

### 4. Frontend SetUp



1. Open a terminal and navigate to the frontend folder:

```
    cd path/e-shop/frontend
```



1. Install dependencies:

```
    npm install
```



1. Start the React application:

```
    npm start
```



### 5. Account SetUp



You are free to create any types of account (Admin/Customer) in the register page.
