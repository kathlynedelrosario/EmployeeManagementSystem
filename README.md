# Employee Management System

A simple web-based Employee Management System developed as part of an application development assignment.

The project allows users to log in, manage employee records, view reports, organize employees by department, and archive or restore employee records.

---

## Features

- User Login and Logout
- Dashboard
- Employee Management
  - Add employees
  - View employees
  - Edit employee information
  - Archive employees
- Employee Archive
  - View archived employees
  - Restore employees
  - Permanently delete employees
- Employee Reports
- Department Summary
- Salary and Date Hired information
- RESTful API
- SQL Server database
- React and Ant Design interface

---

## Technologies Used

### Frontend

- ReactJS
- Ant Design
- Axios
- React Router
- Vite
- JavaScript
- HTML
- CSS

### Backend

- ASP.NET Core Web API
- C#
- Entity Framework Core

### Database

- Microsoft SQL Server
- SQL Server Management Studio (SSMS)

### Version Control

- Git
- GitHub

---

## Project Structure

```text
EmployeeManagementSystemFinal
│
├── ClientApp
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── pages
│   │   ├── App.jsx
│   │   ├── MainLayout.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── EmployeeManagementSystem.Server
│   ├── Controllers
│   ├── Data
│   ├── Migrations
│   ├── Models
│   ├── Properties
│   ├── Program.cs
│   └── appsettings.json
│
├── EmployeeManagementSystemFinal.sln
├── .gitignore
└── README.md
```

---

## Requirements

Before running the project, make sure the following are installed:

- Visual Studio
- .NET SDK
- Node.js and npm
- Microsoft SQL Server
- SQL Server Management Studio (SSMS)
- Git

---

## Database Setup

The project uses Microsoft SQL Server.

### Database Name

```text
EmployeeManagementDB
```

### Entity Framework Core Migrations

The project includes the following migrations:

- `InitialCreate`
- `AddAdminUser`
- `AddEmployeeArchive`

### Step 1: Make sure SQL Server is running

Open SQL Server Management Studio and make sure you can connect to your SQL Server instance.

The database connection string can be found in:

```text
EmployeeManagementSystem.Server/appsettings.json
```

### Step 2: Open the backend folder

Open PowerShell or another terminal and go to the backend folder:

```powershell
cd "EmployeeManagementSystem.Server"
```

If you are using the full project path, for example:

```powershell
cd "C:\Users\asus\source\repos\EmployeeManagementSystemFinal\EmployeeManagementSystem.Server"
```

### Step 3: Update the database

Run:

```powershell
dotnet ef database update
```

This will apply the Entity Framework Core migrations and create or update the required database tables.

The database should contain tables such as:

- `Employees`
- `Users`
- `__EFMigrationsHistory`

---

## How to Run the Application

The frontend and backend are separate applications, so both need to be running at the same time.

### Step 1: Run the Backend

Open a terminal and go to the backend folder:

```powershell
cd "EmployeeManagementSystem.Server"
```

Run:

```powershell
dotnet run --launch-profile http
```

The backend API should run at:

```text
http://localhost:5129
```

Keep this terminal running.

---

### Step 2: Run the Frontend

Open a second terminal.

Go to the React frontend folder:

```powershell
cd "ClientApp"
```

Run:

```powershell
npm.cmd run dev
```

The frontend should run at:

```text
http://localhost:5173
```

Open the following address in your browser:

```text
http://localhost:5173/
```

If your PowerShell allows the normal npm command, you can also use:

```powershell
npm run dev
```

---

## Login

The project includes a default administrator account for demonstration.

**Username:**

```text
admin
```

**Password:**

```text
admin123
```

After logging in, the user is taken to the Dashboard.

> Note: The current authentication uses a simple username and password stored in the database for demonstration purposes. It is not intended for production use.

---

## How to Test the Application

The following steps can be used to test the main features of the system.

### 1. Test Login

1. Open:

   ```text
   http://localhost:5173/
   ```

2. Enter:

   ```text
   Username: admin
   Password: admin123
   ```

3. Click **Login**.
4. The Dashboard should appear.
5. Click **Logout**.
6. The application should return to the Login page.

---

### 2. Test Employee Creation

1. Log in to the application.
2. Go to **Employees** from the sidebar.
3. Click the button for adding a new employee.
4. Enter the employee information:
   - First Name
   - Last Name
   - Email
   - Position
   - Department
   - Salary
   - Date Hired
5. Save the employee.
6. The new employee should appear in the employee table.

---

### 3. Test Employee Editing

1. Go to the **Employees** page.
2. Select an employee.
3. Click **Edit**.
4. Change one or more employee details.
5. Save the changes.
6. Verify that the updated information appears in the table.

---

### 4. Test Employee Archiving

1. Go to the **Employees** page.
2. Select an employee.
3. Click **Delete**.
4. Confirm the action.
5. The employee should disappear from the active employee list.
6. Go to **Archive**.
7. The employee should appear in the archived employee list.

The employee is not immediately removed from the database. Instead, the system changes the employee's `IsArchived` value.

---

### 5. Test Employee Restore

1. Go to **Archive**.
2. Find an archived employee.
3. Click **Restore**.
4. Return to the **Employees** page.
5. The employee should appear again in the active employee list.

---

### 6. Test Permanent Delete

1. Go to **Archive**.
2. Find an archived employee.
3. Click **Delete Forever**.
4. Confirm the action.
5. The employee should be permanently removed from the database.
6. Refresh the Archive page and verify that the employee is no longer listed.

---

### 7. Test Reports

1. Go to **Reports**.
2. Check the number of active employees.
3. Check the number of archived employees.
4. Check the number of departments.
5. Check the employee count for each department.
6. Archive an employee and return to **Reports**.
7. Verify that the active employee and department statistics are updated.

Archived employees are not included in the active employee and department statistics.

---

### 8. Test Departments

1. Go to **Departments**.
2. The page should display the departments and their active employee counts.
3. Archive an employee.
4. Return to the **Departments** page.
5. The archived employee should no longer be included in the department count.

---

## REST API Endpoints

The application uses a RESTful API built with ASP.NET Core Web API.

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/Auth/login` | Login user |

### Employees

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/Employees` | Get active employees |
| GET | `/api/Employees/{id}` | Get employee by ID |
| POST | `/api/Employees` | Create employee |
| PUT | `/api/Employees/{id}` | Update employee |
| DELETE | `/api/Employees/{id}` | Archive employee |
| GET | `/api/Employees/archived` | Get archived employees |
| PUT | `/api/Employees/{id}/restore` | Restore employee |
| DELETE | `/api/Employees/{id}/permanent` | Permanently delete employee |

---

## Git and GitHub

Git was used throughout the development of the project to keep track of changes.

The project was developed using feature-based commits, including:

```text
chore: initialize employee management system
feat: implement login and dashboard navigation
feat: implement employee archive and restore
feat: implement employee archive backend
feat: finalize employee management system
docs: add project README
```

### GitHub Repository

[Employee Management System - GitHub](https://github.com/kathlynedelrosario/EmployeeManagementSystem)

---

## Challenges Encountered

One of the main challenges I encountered during the development of this project was using Git and GitHub.

At the beginning, I was not very familiar with Git commands and the process of adding, committing, and pushing changes to a repository. I also had some confusion about the project folders and which folder should be used as the Git repository root.

As I worked on the project, I gradually learned how Git works and became more comfortable with commands such as:

```text
git status
git add .
git commit
git push
```

Another challenge was making the React frontend communicate properly with the ASP.NET Core backend. I had to configure CORS and the Vite proxy so that the frontend could communicate with the REST API during development.

Implementing the archive feature was also something I had to work through because deleting an employee was changed from permanently removing the record to first moving it into an archive. This required changes to the Employee model, API endpoints, and frontend pages.

I also encountered some UI layout issues while working with Ant Design, especially with making the sidebar and content fit properly on the screen.

Although there were several problems along the way, I enjoyed working on the assignment because I was able to learn new things while building the application.

---

## Future Enhancements

Some features that could be added in a future version include:

- Employee attendance tracking
- Automatic time-in and time-out
- Employee work schedules
- Leave management
- Overtime calculation
- Payroll integration
- User roles and permissions
- More secure authentication and password hashing
- Additional reports
- Export reports to PDF, Excel, and Print

---

## Author

**Kathlyne Del Rosario**

Bachelor of Science in Information Technology Graduate

---

## Project Status

The current version of the Employee Management System includes the required core features:

- Login and Logout
- Employee CRUD operations
- Employee Archive and Restore
- Permanent Employee Deletion
- Dashboard
- Reports
- Department Summary
- RESTful API
- SQL Server Database
- Git and GitHub Version Control

The application was tested locally by running both the ASP.NET Core backend and React frontend and testing the main user workflows from login through logout.