# WM Application

A comprehensive workforce management application built with React and Express.js, using SQLite as the database.

## Project Overview

This application handles client management, employee management, job assignments, billings, and status reporting for workforce management operations. It provides a complete solution for managing workforce, tracking job progress, and generating reports.

## Features

- User authentication and authorization
- Interactive dashboard with clickable statistics cards for quick navigation
- Recent job activity list with clickable items linking directly to job details
- Jobs by assignee dashboard card showing employee workload distribution
- Client management (add, edit, delete, view)
- Employee management with status tracking
- Job management with categories and priorities
- Complete job assignment system to allocate work to employees
- Document handling and attachments
- Status reporting and updates
- Interactive charts and data visualization
- Data export to CSV
- User profile and settings management

## Technology Stack

- **Frontend**: React.js
- **Backend**: Express.js
- **Database**: SQLite
- **Authentication**: JWT with bcrypt

## Setup and Installation

### Prerequisites
- Node.js (v14 or later)
- npm (v6 or later)

### Backend Setup
1. Clone the repository
2. Install all dependencies using the provided script:
   ```
   ./install-deps.sh
   ```
   This script installs dependencies for the root project, backend, and all modules.

3. Set up environment variables:
   Create a `.env` file with the following:
   ```
   PORT=5000
   JWT_SECRET=your_secret_key
   DB_NAME=WorkManagement.db
   ```

4. Database Setup:
   The database schema is in `db/wm_db.sql` and seed data in `db/seedData.sql`.
   SQLite database `WorkManagement.db` is pre-created in the db directory.
   
5. Run the server:
   ```
   npm run server
   ```
   
### Frontend Setup
1. Navigate to the client directory:
   ```
   cd client
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Run the React application:
   ```
   npm start
   ```

### Running the Full Application
To run both the backend and frontend concurrently:
```
npm run dev
```

## Default Credentials
- user_name: admin
- Password: Admin@123

## API Documentation

The application provides RESTful API endpoints for all resources. Most endpoints follow standard CRUD operations:

- GET /api/{resource} - List all resources
- GET /api/{resource}/:id - Get a specific resource by ID
- POST /api/{resource} - Create a new resource
- PUT /api/{resource}/:id - Update a resource
- DELETE /api/{resource}/:id - Delete a resource

Key API resources:
- /api/user - User authentication and management
- /api/client_master - Client management
- /api/employee_master - Employee management
- /api/job_master - Job management

## Test Data Generation

A test data generation script has been included to populate the database with sample data for testing and demonstration purposes.

### Features
- 5 distinct user roles with different access permissions
- 20 users distributed across these roles
- 10 client companies with contact details
- 50 jobs assigned to various employees
- Status reports, job timelines, and billing information

### Running the Test Data Script
```
node scripts/seed-test-data.js
```

## Reporting System

The application includes a comprehensive reporting system that generates various analytical reports in CSV format.

### Available Reports
1. User Role Distribution - Shows how many users are in each role
2. Job Status Overview - Breakdown of jobs by their current status
3. Employee Job Assignment - Details of job assignments per employee with hours reported
4. Job Category Distribution - Jobs distributed across different categories
5. Client Job Allocation - Number of jobs and employees assigned to each client
6. Billing Summary - Financial overview of billing by client
7. Job Timeline and Status - Timeline of jobs with planned and actual dates

### Generating Reports
```
node scripts/generate-reports.js
```
Reports will be saved to the `/reports` directory.

## License

This project is proprietary and confidential. Unauthorized copying or distribution is prohibited.

## Author

EmployDEX Consulting Services
