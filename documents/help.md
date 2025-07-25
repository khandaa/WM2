# CA ERP Application - Feature & Capability Documentation

## Overview
The CA ERP application is a comprehensive enterprise resource planning system designed specifically for Chartered Accountancy (CA) firms. The system facilitates management of employees, clients, jobs, assignments, billing, documents, and reporting within a CA firm. This document outlines all features and capabilities to serve as a reference for rebuilding the application using React.js and Express.js.

## System Architecture

The current application is built using the PHP Yii framework with a modular architecture. The application consists of the following core modules:

1. **User Management**
2. **Employee Management** 
3. **Client Management**
4. **Job Management**
5. **Job Assignment**
6. **Document Management**
7. **Billing & Receipts**
8. **Notifications & Mailer**
9. **Reports & Analytics**
10. **Dashboard**

## User Roles & Permissions

The system implements a role-based access control with the following user roles:

1. **Admin** - Full system access and control
2. **Level I Partner** - Senior partner with elevated permissions
3. **Level II Partner** - Partner with standard management permissions
4. **Manager** - Oversees employees and job assignments
5. **Employee** - Handles assigned jobs and tasks
6. **Client** - Limited access to view own jobs and submit documents

Each role has specific permissions regarding CRUD (Create, Read, Update, Delete) operations across different modules.

## Detailed Functionality

### 1. Authentication & User Management

#### Features:
- **User Registration**: Create new user accounts with role assignments
- **Login/Logout**: Secure authentication system
- **Password Management**: 
  - Password reset
  - Change password
  - Password encryption
- **Profile Management**: 
  - View and edit user profile
  - Upload profile picture
- **Access Control**: Role-based access to different modules and features

#### Technical Requirements:
- JWT-based authentication
- Password hashing
- Session management
- Remember me functionality
- Account lockout after failed attempts

### 2. Employee Management

#### Features:
- **Employee Registration**: Register new employees with detailed information
- **Employee Profile Management**:
  - Personal details (name, DOB, gender, contact info)
  - Professional details (qualification, designation, reporting manager)
  - Address information
  - Emergency contact details
  - Document attachments (certificates, ID proofs)
- **Employee Search & Filtering**: Search employees by various criteria
- **Employee Performance Tracking**:
  - Job assignments
  - Job completion rates
  - Billable hours
- **Employee Cost Management**:
  - Salary information
  - Cost per billable hour
- **Reporting Structure**: Define and visualize employee hierarchies

#### Technical Requirements:
- Advanced search and filtering
- Document upload and validation
- Data export to Excel/PDF
- Dashboard widgets for employee metrics

### 3. Client Management

#### Features:
- **Client Registration**: Register new clients with detailed information
- **Client Profile Management**:
  - Client details (name, contact person, email, phone)
  - Client company information
  - Address details
  - Billing information
- **Client Search & Filtering**: Search clients by various criteria
- **Client Companies**: Manage multiple companies under the same client
- **Client Contact Persons**: Manage multiple contact persons for each client
- **Client History**: View history of jobs done for each client

#### Technical Requirements:
- Client data validation
- Client document management
- Export client data
- Client activity logging

### 4. Job Management

#### Features:
- **Job Creation**: Create new jobs with detailed requirements
- **Job Categories**: Manage different types of jobs:
  - Audit
  - Tax
  - Accounting
  - Compliance
  - Consulting
  - Others
- **Job Status Management**:
  - Pending
  - In Progress
  - Completed
  - Closed
  - Archived
- **Job Search & Filtering**: Search jobs by various parameters
- **Job Timeline Management**:
  - Planned start and end dates
  - Actual start and end dates
  - Progress tracking
- **Job Details**:
  - Assessment year
  - Service category
  - Physical file number
  - Company information
  - Job description
  - Notes

#### Technical Requirements:
- Job workflow management
- Status transitions
- Timeline visualization
- Job filters and sorting
- Export job data to Excel/PDF

### 5. Job Assignment

#### Features:
- **Assign Jobs to Employees**: Assign single or multiple employees to jobs
- **Job Reassignment**: Change job assignments as needed
- **Manager Oversight**: Managers can oversee assigned jobs
- **Assignment History**: Track history of job assignments
- **Job Status Reporting**: Employees can report job status
- **Workload Management**: Visualize and balance employee workloads
- **Notification System**: Notify employees of new assignments

#### Technical Requirements:
- Drag-and-drop assignment interface
- Calendar integration
- Workload visualization
- Notification system
- Conflict detection for assignments

### 6. Document Management

#### Features:
- **Document Uploads**: Upload documents related to jobs, clients, or employees
- **Document Categories**: Categorize documents by type
- **Document Versioning**: Track document versions
- **Document Search**: Search documents by metadata
- **Document Access Control**: Restrict document access based on roles
- **Document Templates**: Create and use document templates

#### Technical Requirements:
- Secure file storage
- File type validation
- Version control
- Document preview
- Search indexing
- Cloud storage integration options

### 7. Billing & Receipts

#### Features:
- **Job Billing**: Create bills for completed jobs
- **Billing Rates**: Manage different billing rates
- **Invoice Generation**: Generate invoices for clients
- **Payment Tracking**: Track payments received
- **Receipt Management**: Generate and manage receipts
- **Payment History**: View payment history by client
- **Billing Reports**: Generate reports on billing and payments

#### Technical Requirements:
- Invoice templates
- PDF generation
- Payment integration options
- Tax calculation
- Currency formatting
- Financial reporting

### 8. Notifications & Communication

#### Features:
- **Email Notifications**: Send emails for various system events
- **Notification Preferences**: Configure notification settings
- **Internal Messaging**: Communication between users within the system
- **Task Reminders**: Automated reminders for tasks and deadlines
- **Status Updates**: Notify stakeholders of status changes
- **Bulk Notifications**: Send notifications to groups of users

#### Technical Requirements:
- Email template system
- Email queuing and retry
- Real-time notifications
- Multi-channel notifications (email, in-app, SMS)
- Read receipt tracking

### 9. Reports & Analytics

#### Features:
- **Standard Reports**:
  - Employee performance
  - Job status
  - Billing status
  - Client activity
- **Custom Reports**: Create custom reports with selected parameters
- **Export Options**: Export reports to Excel, PDF, CSV
- **Dashboard Widgets**: Visual representation of key metrics
- **Filtering & Sorting**: Filter and sort report data
- **Scheduled Reports**: Schedule automatic report generation

#### Technical Requirements:
- Data visualization components
- Chart and graph generation
- Data export in multiple formats
- Report scheduler
- Interactive filtering

### 10. Dashboard

#### Features:
- **Role-based Dashboards**: Different dashboard views for different roles
- **Key Performance Indicators**: Display relevant KPIs
- **Recent Activities**: Show recent system activities
- **Quick Actions**: Provide shortcuts to common actions
- **Task Lists**: Display pending tasks and assignments
- **Notifications**: Show recent notifications
- **Calendar View**: Upcoming deadlines and events

#### Technical Requirements:
- Customizable dashboard layouts
- Widget system
- Real-time data updates
- Interactive elements
- Responsive design

## Technical Requirements for Rebuild

### Frontend (React.js)
- Component-based architecture
- State management with Redux or Context API
- Responsive design with Bootstrap or Material UI
- Form validation and handling
- File upload components
- Data visualization components
- Notification system
- Route protection based on roles

### Backend (Express.js)
- RESTful API design
- Authentication middleware with JWT
- Role-based access control
- File upload handling
- Email service integration
- Database ORM (Sequelize or similar)
- Validation middleware
- Logging and error handling
- API documentation

### Database
- User schema
- Employee schema
- Client schema
- Job schema
- Document schema
- Billing schema
- Notification schema
- Permissions schema
- Activity logs schema
- Reports schema

## API Endpoints (Preliminary Structure)

The Express.js backend should implement the following API endpoints:

### Authentication
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/auth/register`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`
- `PUT /api/auth/change-password`

### Users
- `GET /api/users`
- `GET /api/users/:id`
- `POST /api/users`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`
- `GET /api/users/profile`
- `PUT /api/users/profile`

### Employees
- `GET /api/employees`
- `GET /api/employees/:id`
- `POST /api/employees`
- `PUT /api/employees/:id`
- `DELETE /api/employees/:id`
- `GET /api/employees/:id/jobs`
- `GET /api/employees/:id/documents`
- `POST /api/employees/:id/documents`

### Clients
- `GET /api/clients`
- `GET /api/clients/:id`
- `POST /api/clients`
- `PUT /api/clients/:id`
- `DELETE /api/clients/:id`
- `GET /api/clients/:id/companies`
- `POST /api/clients/:id/companies`
- `GET /api/clients/:id/contacts`
- `POST /api/clients/:id/contacts`
- `GET /api/clients/:id/jobs`

### Jobs
- `GET /api/jobs`
- `GET /api/jobs/:id`
- `POST /api/jobs`
- `PUT /api/jobs/:id`
- `DELETE /api/jobs/:id`
- `GET /api/jobs/:id/assignments`
- `POST /api/jobs/:id/assignments`
- `GET /api/jobs/:id/documents`
- `POST /api/jobs/:id/documents`
- `PUT /api/jobs/:id/status`
- `GET /api/jobs/:id/billing`

### Documents
- `GET /api/documents`
- `GET /api/documents/:id`
- `POST /api/documents`
- `PUT /api/documents/:id`
- `DELETE /api/documents/:id`
- `GET /api/documents/types`

### Billing
- `GET /api/billing`
- `GET /api/billing/:id`
- `POST /api/billing`
- `PUT /api/billing/:id`
- `DELETE /api/billing/:id`
- `GET /api/billing/receipts`
- `POST /api/billing/receipts`

### Reports
- `GET /api/reports/jobs`
- `GET /api/reports/employees`
- `GET /api/reports/clients`
- `GET /api/reports/billing`
- `POST /api/reports/custom`
- `GET /api/reports/dashboard`

## Conclusion

This document provides a comprehensive outline of the CA ERP application's features and capabilities. It should serve as a guide for rebuilding the application using React.js for the frontend and Express.js for the backend. The modular nature of the current application should be preserved in the new architecture, with a focus on scalability, maintainability, and user experience.

The rebuild should maintain all existing functionality while improving the user interface, performance, and adding modern features such as real-time updates, responsive design, and enhanced data visualization.

## Changelog

- Initial documentation created: July 19, 2025

## Changelog
[Application change history will be tracked here]

## Default Access
- Default admin credentials: admin/admin

## Support
For any issues or support requests, please contact the system administrator

---
