# Database Script for WorkManagement Application

## Overview
This document contains the database schema for the WorkManagement application, designed specifically for SKJ Consulting & Accounting Firm. The schema is designed to support a role-based workflow management system that accommodates the hierarchical structure of an accounting firm.

## Database Selection
- Development/Testing: SQLite
- Production: PostgreSQL

## Database Schema

### Master Tables

```sql
-- Role Master Table
CREATE TABLE role_master (
    role_id INTEGER PRIMARY KEY AUTOINCREMENT,
    role_name VARCHAR(50) NOT NULL UNIQUE,
    permission_level INTEGER NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Master Table
CREATE TABLE user_master (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    role_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    FOREIGN KEY (role_id) REFERENCES role_master(role_id)
);

-- Client Master Table
CREATE TABLE client_master (
    client_id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_name VARCHAR(100) NOT NULL,
    client_group VARCHAR(100),
    client_owner_person_name VARCHAR(100),
    client_owner_person_mobile_no VARCHAR(20),
    client_owner_person_email VARCHAR(100),
    client_contact_person_name VARCHAR(100),
    client_contact_person_mobile_no VARCHAR(20),
    client_contact_person_email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive'))
);

-- Work Type Master Table
CREATE TABLE work_type_master (
    work_type_id INTEGER PRIMARY KEY AUTOINCREMENT,
    work_type_name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_by_user_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by_user_id) REFERENCES user_master(user_id)
);

-- Activity Master Table
CREATE TABLE activity_master (
    activity_id INTEGER PRIMARY KEY AUTOINCREMENT,
    work_type_id INTEGER NOT NULL,
    activity_name VARCHAR(100) NOT NULL,
    description TEXT,
    estimated_duration INTEGER, -- Duration in hours
    sequence INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (work_type_id) REFERENCES work_type_master(work_type_id)
);


-- Task Status Master Table
CREATE TABLE task_status_master (
    status_id INTEGER PRIMARY KEY AUTOINCREMENT,
    status_name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Priority Master Table
CREATE TABLE priority_master (
    priority_id INTEGER PRIMARY KEY AUTOINCREMENT,
    priority_name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Transaction Tables

```sql
-- Work Request Transaction Table
CREATE TABLE work_request_tx (
    work_request_id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER NOT NULL,
    work_type_id INTEGER NOT NULL,
    requested_by_user_id INTEGER NOT NULL,
    assigned_to_director_id INTEGER NOT NULL,
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description TEXT,
    priority_id INTEGER NOT NULL,
    status_id INTEGER NOT NULL,
    deadline DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES client_master(client_id),
    FOREIGN KEY (work_type_id) REFERENCES work_type_master(work_type_id),
    FOREIGN KEY (requested_by_user_id) REFERENCES user_master(user_id),
    FOREIGN KEY (assigned_to_director_id) REFERENCES user_master(user_id),
    FOREIGN KEY (priority_id) REFERENCES priority_master(priority_id),
    FOREIGN KEY (status_id) REFERENCES task_status_master(status_id)
);

-- Task Transaction Table
CREATE TABLE task_tx (
    task_id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_name VARCHAR(100) NOT NULL,
    work_request_id INTEGER NOT NULL,
    client_id INTEGER NOT NULL,
    task_type_id INTEGER NOT NULL, -- References work_type_master
    task_description TEXT,
    task_received_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    planned_start_date DATE,
    planned_end_date DATE,
    actual_start_date DATE,
    actual_end_date DATE,
    status_id INTEGER NOT NULL,
    is_billable BOOLEAN DEFAULT TRUE,
    task_assigned_to INTEGER,
    priority_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (work_request_id) REFERENCES work_request_tx(work_request_id),
    FOREIGN KEY (client_id) REFERENCES client_master(client_id),
    FOREIGN KEY (task_type_id) REFERENCES work_type_master(work_type_id),
    FOREIGN KEY (status_id) REFERENCES task_status_master(status_id),
    FOREIGN KEY (task_assigned_to) REFERENCES user_master(user_id),
    FOREIGN KEY (priority_id) REFERENCES priority_master(priority_id)
);

-- Task Assignment Transaction Table
CREATE TABLE task_assignment_tx (
    assignment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_id INTEGER NOT NULL,
    assigned_by_user_id INTEGER NOT NULL,
    assigned_to_user_id INTEGER NOT NULL,
    assignment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activity_id INTEGER, -- Optional reference to specific activity
    priority_id INTEGER NOT NULL,
    planned_start_date DATE,
    planned_end_date DATE,
    status_id INTEGER NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES task_tx(task_id),
    FOREIGN KEY (assigned_by_user_id) REFERENCES user_master(user_id),
    FOREIGN KEY (assigned_to_user_id) REFERENCES user_master(user_id),
    FOREIGN KEY (activity_id) REFERENCES activity_master(activity_id),
    FOREIGN KEY (priority_id) REFERENCES priority_master(priority_id),
    FOREIGN KEY (status_id) REFERENCES task_status_master(status_id)
);

-- Status Update Transaction Table
CREATE TABLE status_update_tx (
    update_id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_id INTEGER NOT NULL,
    assignment_id INTEGER,
    user_id INTEGER NOT NULL,
    update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status_id INTEGER NOT NULL,
    percentage_complete INTEGER DEFAULT 0,
    comments TEXT,
    hours_spent DECIMAL(5,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES task_tx(task_id),
    FOREIGN KEY (assignment_id) REFERENCES task_assignment_tx(assignment_id),
    FOREIGN KEY (user_id) REFERENCES user_master(user_id),
    FOREIGN KEY (status_id) REFERENCES task_status_master(status_id)
);

-- Attachment Transaction Table
CREATE TABLE attachment_tx (
    attachment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    work_request_id INTEGER,
    task_id INTEGER,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(512) NOT NULL,
    file_type VARCHAR(50),
    uploaded_by_user_id INTEGER NOT NULL,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (work_request_id) REFERENCES work_request_tx(work_request_id),
    FOREIGN KEY (task_id) REFERENCES task_tx(task_id),
    FOREIGN KEY (uploaded_by_user_id) REFERENCES user_master(user_id)
);

-- Notification Transaction Table
CREATE TABLE notification_tx (
    notification_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    message TEXT NOT NULL,
    related_entity_type VARCHAR(50) NOT NULL, -- 'task', 'work_request', etc.
    related_entity_id INTEGER NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user_master(user_id)
);

-- User Activity Log Transaction Table
CREATE TABLE user_activity_log_tx (
    log_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    activity_type VARCHAR(50) NOT NULL,
    description TEXT,
    ip_address VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user_master(user_id)
);
```

## PostgreSQL-Specific Adaptations

For PostgreSQL deployment in production, make the following changes:

```sql
-- Replace AUTOINCREMENT with SERIAL
-- Replace INTEGER PRIMARY KEY AUTOINCREMENT with SERIAL PRIMARY KEY
-- Replace TIMESTAMP DEFAULT CURRENT_TIMESTAMP with TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- Replace BOOLEAN with BOOLEAN instead of INTEGER in SQLite
```

Example PostgreSQL version for a table:

```sql
CREATE TABLE role_master (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE,
    permission_level INTEGER NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Initial Data

```sql
-- Insert default roles
INSERT INTO role_master (role_name, permission_level, description) VALUES 
('Partner', 100, 'Highest level with all permissions'),
('Director', 90, 'Can manage work and assign to team'),
('Associate Director', 85, 'Can manage work under director supervision'),
('Senior Manager', 80, 'Can oversee work and manage reference data'),
('Manager', 70, 'Can manage specific client work'),
('Senior Associate', 60, 'Can perform advanced tasks'),
('Associate', 50, 'Can perform standard tasks'),
('Employee', 40, 'Basic user permissions'),
('Article', 30, 'Limited user permissions');

-- Insert default task statuses
INSERT INTO task_status_master (status_name, description) VALUES
('Not Started', 'Task has been created but work has not begun'),
('In Progress', 'Task is currently being worked on'),
('On Hold', 'Task has been temporarily paused'),
('Completed', 'Task has been finished'),
('Reviewed', 'Task has been reviewed by a supervisor'),
('Approved', 'Task has been approved by the client or senior staff'),
('Cancelled', 'Task has been cancelled');

-- Insert default priorities
INSERT INTO priority_master (priority_name, description) VALUES
('Critical', 'Requires immediate attention'),
('High', 'Important task with significant impact'),
('Medium', 'Standard priority task'),
('Low', 'Task can be addressed after higher priorities');

-- Insert admin user
INSERT INTO user_master (username, password_hash, full_name, email, role_id, status) VALUES
('admin', 'Admin@123', 'System Administrator', 'admin@example.com', 1, 'active');
```

## Database Info

### Table Descriptions

1. **role_master**
   - Stores the different user roles in the system (Partner, Director, etc.)
   - Contains permission levels for each role
   - Used for role-based access control

2. **user_master**
   - Contains all user accounts and their authentication information
   - Links users to their respective roles
   - Tracks user status and login activity

3. **client_master**
   - Stores information about all clients
   - Contains contact details for client representatives
   - Associates clients with their assigned director

4. **work_type_master**
   - Defines different types of work (Audit, Tax Filing, etc.)
   - Created and managed by directors and senior managers
   - Used as templates for work requests

5. **activity_master**
   - Defines specific activities associated with each work type
   - Contains estimated duration and sequence information
   - Used to create standardized workflows

6. **reference_data_master**
   - Stores reference materials and information
   - Categorized for easy search and retrieval
   - Managed by directors and senior managers

7. **task_status_master**
   - Defines all possible status values for tasks
   - Used to track progress of tasks through the workflow

8. **priority_master**
   - Defines priority levels for tasks
   - Used for task prioritization and sorting

9. **work_request_tx**
   - Records initial work requests from partners
   - Links requests to clients and work types
   - Tracks assignment to directors

10. **task_tx**
    - Contains detailed information about specific tasks
    - Links tasks to work requests and clients
    - Tracks planned and actual dates, status, and assignment

11. **task_assignment_tx**
    - Records the assignment of tasks to users
    - Tracks who assigned the task and to whom
    - Contains priority and planning information

12. **status_update_tx**
    - Records all status updates for tasks
    - Tracks progress percentage and hours spent
    - Contains update comments from users

13. **attachment_tx**
    - Stores information about file attachments
    - Links attachments to work requests or tasks
    - Contains file metadata and upload information

14. **notification_tx**
    - Stores system notifications for users
    - Links notifications to related entities
    - Tracks read/unread status

15. **user_activity_log_tx**
    - Logs user activity in the system
    - Used for audit and security purposes
    - Records activity type, description, and IP address

## Relationship Diagram

```
[role_master] ◄────┐
      ▲            │
      │            │
      │            │
[user_master] ─────┼───► [user_activity_log_tx]
      ▲            │
      │            │
      ├────────────┼───► [notification_tx]
      │            │
      │            │
[client_master] ◄──┘
      ▲
      │
      │
[work_request_tx] ◄───┐
      ▲                │
      │                │
      │                │
[task_tx] ◄────────────┼────► [attachment_tx]
      ▲                │
      │                │
      │                │
[task_assignment_tx] ◄─┘
      ▲
      │
      │
[status_update_tx]

[work_type_master] ──► [activity_master]

[priority_master] ───┬──► [work_request_tx]
                    │
                    ├──► [task_tx]
                    │
                    └──► [task_assignment_tx]

[task_status_master] ─┬──► [work_request_tx]
                      │
                      ├──► [task_tx]
                      │
                      ├──► [task_assignment_tx]
                      │
                      └──► [status_update_tx]
```

This database schema supports all the requirements specified in the WorkManagement application documents, providing a comprehensive structure for managing workflow in an accounting firm context.
