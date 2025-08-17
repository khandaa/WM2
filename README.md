# WM Application

A comprehensive workforce management application built with React and Express.js, using SQLite as the database.

## Project Overview

This application handles client management, employee management, job assignments, billings, and status reporting for workforce management operations. It provides a complete solution for managing workforce, tracking job progress, and generating reports.

## Features

- User authentication and authorization
- Feature toggle system for enabling/disabling CRUD operations
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
- **Email Service**: ZeptoMail API

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
   The schema has been updated to fix syntax errors and inconsistencies.
   
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

## Feature Toggle System

The application includes a comprehensive feature toggle system that allows administrators to enable or disable specific CRUD operations for different resources.

### Features

- Granular control over all CRUD operations (Create, Read, Update, Delete)
- Each resource has individual toggles for each operation type
- Admin users always have access to all features regardless of toggle status
- Dynamic middleware that automatically applies the appropriate toggle check based on HTTP method and resource

### Feature Toggle Naming Convention

Feature toggles follow this naming pattern: `crud_operation_resource`

Examples:
- `crud_read_users` - Controls access to GET /api/crud/users
- `crud_create_clients` - Controls access to POST /api/crud/clients
- `crud_update_jobs` - Controls access to PUT /api/crud/jobs
- `crud_delete_employees` - Controls access to DELETE /api/crud/employees

### Managing Feature Toggles

Feature toggles can be managed through the following API endpoints:

- GET /api/feature-toggles - View all feature toggles
- GET /api/feature-toggles/:name - View a specific feature toggle
- PATCH /api/feature-toggles/update - Update a feature toggle status

### Database Initialization

Run the feature toggle seed script to initialize all feature toggles in the database:
```
node db/seed-feature-toggles.js
```

## API Documentation

The application provides RESTful API endpoints for all resources. Most endpoints follow standard CRUD operations:

- GET /api/{resource} - List all resources (requires `crud_read_{resource}` toggle)
- GET /api/{resource}/:id - Get a specific resource by ID (requires `crud_read_{resource}` toggle)
- POST /api/{resource} - Create a new resource (requires `crud_create_{resource}` toggle)
- PUT /api/{resource}/:id - Update a resource (requires `crud_update_{resource}` toggle)
- DELETE /api/{resource}/:id - Delete a resource (requires `crud_delete_{resource}` toggle)

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

## Email System

The application includes email sending functionality using the ZeptoMail API. There are multiple implementation options available:

### 1. ZeptoMailer Class

A standalone PHP class that provides a simple interface to send emails via the ZeptoMail API.

#### Features
- Customizable sender email address
- Support for recipient name and email address
- HTML body content
- Customizable subject line
- API response handling with error detection

#### Usage Example
```php
$mailer = new ZeptoMailer();
$result = $mailer->sendEmail(
    'support@yourdomain.com',      // From address
    'recipient@example.com',       // To address
    'Recipient Name',              // To name
    'Your Email Subject',          // Subject
    '<div><b>Your HTML email content here</b></div>'  // HTML body
);

// Check result
if ($result['success']) {
    echo "Email sent successfully";
} else {
    echo "Failed to send email: " . json_encode($result['response']);
}
```

### 2. EZeptoMailer Yii 1.1 Extension

A full-featured Yii 1.1 extension for seamless integration with Yii applications.

#### Features
- Simple integration with Yii 1.1 applications
- Send transactional emails with HTML content
- Template-based email support
- Configurable default sender information
- Built-in logging and automatic error handling
- Integration with Yii's component system

#### Usage Example
```php
// In your Yii controller or model
$result = Yii::app()->zeptoMailer->sendEmail(
    'recipient@example.com',                              // To address
    'Welcome to Our Service',                             // Subject
    '<div><b>Thank you for registering!</b></div>',       // HTML body
    'Recipient Name'                                      // To name (optional)
);

// Or use template-based emails
$mergeVars = array(
    'user_name' => 'John Doe',
    'reset_link' => 'https://yourdomain.com/reset?token=ABC123'
);

$result = Yii::app()->zeptoMailer->sendTemplateEmail(
    'recipient@example.com',                              // To address
    'password_reset',                                     // Template key
    $mergeVars,                                           // Merge variables
    'John Doe'                                            // To name (optional)
);
```

For detailed documentation on the Yii 1.1 extension, see `EZeptoMailer.README.md`

## License

This project is proprietary and confidential. Unauthorized copying or distribution is prohibited.

## Author

EmployDEX Consulting Services
