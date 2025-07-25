-- WM Database Schema and Initial Data
-- This SQL file creates all database tables and populates them with initial data

-- Enable foreign key constraints
PRAGMA foreign_keys = ON;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS tbl_master_users;
DROP TABLE IF EXISTS tbl_master_employees;
DROP TABLE IF EXISTS tbl_master_teams;
DROP TABLE IF EXISTS tbl_master_departments;
DROP TABLE IF EXISTS tbl_master_roles;
DROP TABLE IF EXISTS tbl_master_clients;
DROP TABLE IF EXISTS tbl_master_companies;
DROP TABLE IF EXISTS tbl_master_jobs;
DROP TABLE IF EXISTS tbl_master_job_category;
DROP TABLE IF EXISTS tbl_master_document_types;

DROP TABLE IF EXISTS tbl_user_activities;
DROP TABLE IF EXISTS tbl_user_roles;
DROP TABLE IF EXISTS tbl_employee_details;
DROP TABLE IF EXISTS tbl_employee_documents;
DROP TABLE IF EXISTS tbl_employee_reporting;
DROP TABLE IF EXISTS tbl_employee_cost;

DROP TABLE IF EXISTS tbl_client_companies;
DROP TABLE IF EXISTS tbl_client_contactpersons;

DROP TABLE IF EXISTS tbl_job_assignment;
DROP TABLE IF EXISTS tbl_job_status_report;
DROP TABLE IF EXISTS tbl_job_comments;
DROP TABLE IF EXISTS tbl_job_documents;
DROP TABLE IF EXISTS tbl_job_receipt_info;
DROP TABLE IF EXISTS tbl_job_billing;


-- Create users table (master data)
CREATE TABLE IF NOT EXISTS users_master (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    mobile_number TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    is_active BOOLEAN DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create roles table (master data)
CREATE TABLE IF NOT EXISTS roles_master (
    role_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create permissions table (master data)
CREATE TABLE IF NOT EXISTS permissions_master (
    permission_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create user_roles junction table (transaction data)
CREATE TABLE IF NOT EXISTS user_roles_tx (
    user_role_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    role_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users_master(user_id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles_master(role_id) ON DELETE CASCADE
);

-- Create role_permissions junction table (transaction data)
CREATE TABLE IF NOT EXISTS role_permissions_tx (
    role_permission_id INTEGER PRIMARY KEY AUTOINCREMENT,
    role_id INTEGER NOT NULL,
    permission_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(role_id, permission_id),
    FOREIGN KEY (role_id) REFERENCES roles_master(role_id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions_master(permission_id) ON DELETE CASCADE
);

-- Create activity_logs table (transaction data)
CREATE TABLE IF NOT EXISTS activity_logs_tx (
    activity_log_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    action TEXT NOT NULL,
    details TEXT,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users_master(user_id) ON DELETE SET NULL
);



-- Create updated QR codes table
CREATE TABLE IF NOT EXISTS payment_qr_codes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    payment_type VARCHAR(50) NOT NULL, -- e.g., 'UPI', 'BANK', 'WALLET'
    image_url VARCHAR(255),   -- File system path to the QR code image
    active BOOLEAN DEFAULT 0, -- Only one QR code can be active at a time
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on payment type for faster lookups
CREATE INDEX IF NOT EXISTS idx_payment_type ON payment_qr_codes(payment_type);


CREATE TABLE payment_transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    qr_code_id INTEGER,
    transaction_ref VARCHAR(100) NOT NULL UNIQUE, -- Unique reference number for the transaction
    user_id INTEGER, -- User who initiated the transaction
    verified BOOLEAN DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT NULL,
    FOREIGN KEY (qr_code_id) REFERENCES payment_qr_codes(id)
);

-- Create index on transaction reference for faster lookups
CREATE INDEX IF NOT EXISTS idx_transaction_ref ON payment_transactions(transaction_ref);


-- Migration: Add feature_toggles table
CREATE TABLE IF NOT EXISTS feature_toggles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    feature_name TEXT UNIQUE NOT NULL,
    is_enabled INTEGER NOT NULL DEFAULT 0,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);




-- -- Create tables tbl_master_users
-- CREATE TABLE tbl_master_users (
--     user_id INTEGER PRIMARY KEY,
--     user_name TEXT,
--     email_id TEXT,
--     mobile_no text, 
--     user_password TEXT,
--     user_role TEXT,
--     user_start_date TEXT,
--     user_end_date TEXT,
--     employee_id TEXT,
--     isActive boolean,
--     password_last_update_date date,
--     FOREIGN KEY (employee_id) REFERENCES tbl_master_employees(employee_id)
-- );


-- Create tables tbl_master_employees
CREATE TABLE tbl_master_employees (
    employee_id INTEGER PRIMARY KEY,
    org_employee_id TEXT,
    employee_name TEXT,
    team_id integer, 
    department_id integer,
    employee_gender TEXT,
    employee_qualification TEXT,
    date_of_joining TEXT,
    employee_city_of_residence text,
    employee_city_of_work text,
    employee_referred_by integer,
    date_of_birth TEXT,
    emergency_contact_no TEXT,
    emergency_contact_name TEXT,
    emergency_person_relation TEXT,
    employee_photo text,
    role_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES tbl_master_roles(role_id),
    FOREIGN KEY (team_id) REFERENCES tbl_master_teams(team_id),
    FOREIGN KEY (department_id) REFERENCES tbl_master_departments(department_id)
);


-- Create tables tbl_master_employees
CREATE TABLE tbl_master_teams (
    team_id INTEGER PRIMARY KEY,
    team_name TEXT,
    team_owner integer,
    FOREIGN KEY (team_owner) REFERENCES tbl_master_employees(employee_id)
);


-- Create tables tbl_master_employees
CREATE TABLE tbl_master_departments (
    department_id INTEGER PRIMARY KEY,
    department_name TEXT,
    department_owner integer,
    FOREIGN KEY (department_owner) REFERENCES tbl_master_employees(employee_id)
);
-- -- Create tables
-- CREATE TABLE tbl_master_roles (
--     role_id INTEGER PRIMARY KEY AUTOINCREMENT,
--     role_name TEXT NOT NULL,
--     role_description TEXT,
--     role_type TEXT,
--     role_isactive boolean
-- );

CREATE TABLE tbl_master_clients (
    client_id integer PRIMARY KEY,
    client_name TEXT,
    group_name TEXT,
    client_status TEXT,
    client_owner_name text,
    client_owner_email text,
    client_owner_mobile text,
    created_by text,
    create_date date,
    last_updated_by text,
    last_update_date date
    
);

CREATE TABLE tbl_master_companies (
    company_id INTEGER PRIMARY KEY,
    company_name TEXT,
    company_website TEXT,
    company_tax_identifier_name TEXT,
    company_tax_identifier_value TEXT
);


CREATE TABLE tbl_master_jobs (
    job_id INTEGER PRIMARY KEY,
    job_name TEXT,
    job_division_id INTEGER,
    job_category_id INTEGER,
    job_description TEXT,
    job_no INTEGER,
    physical_file_no TEXT,
    job_status TEXT,
    assesment_year TEXT,
    job_received_date date, 
    job_planned_start_date date,
    job_planned_end_date date,
    job_regulatory_end_date date, 
    job_actual_start_date date,
    job_actual_end_date date,
    client_id INTEGER,
    company_id integer, 
    created_by INTEGER,
    job_priority integer ,
    job_client_priority integer, 
    job_overall_priority integer, 
    receipt_date TEXT,
    FOREIGN KEY (job_category_id) REFERENCES tbl_master_job_category(job_category_id),
    FOREIGN KEY (client_id) REFERENCES tbl_master_clients(client_id),
    FOREIGN KEY (company_id) REFERENCES tbl_master_clients(company_id)
);


CREATE TABLE tbl_master_job_category (
    job_category_id INTEGER PRIMARY KEY,
    job_description TEXT,
    parent_job_category_id integer
);

CREATE TABLE tbl_master_document_types (
    document_id INTEGER PRIMARY KEY,
    document_type TEXT,
    document_desc TEXT,
    document_category TEXT
);


-- CREATE TABLE tbl_user_activities (
--     activity_id INTEGER PRIMARY KEY,
--     activity_name TEXT,
--     activity_description text,
--     activity_date_time datetime,
--     created_by TEXT,
--     ip_address text, 
--     device_type text, 
--     browser_name text
-- );

CREATE TABLE tbl_user_roles (
    user_role_id INTEGER PRIMARY KEY,
    user_id integer,
    role_id integer,
    role_start_date date,
    role_end_date date,
    FOREIGN KEY (user_id) REFERENCES tbl_master_users(user_id),
    FOREIGN KEY (role_id) REFERENCES tbl_master_roles(role_id)
);

-- Create tables tbl_master_employees
CREATE TABLE tbl_employee_details (
    employee_detail_id integer primary key, 
    employee_id INTEGER,
    employee_document_id integer,
    employee_document_name text, 
    employee_document_location text, 
    FOREIGN KEY (employee_id) REFERENCES tbl_master_employees(employee_id)
);


CREATE TABLE tbl_employee_documents (
    employee_document_id integer primary key, 
    employee_id INTEGER,
    employee_document_name text, 
    employee_document_location text, 
    FOREIGN KEY (employee_id) REFERENCES tbl_master_employees(employee_id)
);

CREATE TABLE tbl_employee_reporting (
    employee_reporting_id integer primary key, 
    employee_id INTEGER,
    manager_id int, 
    reporting_start_date date, 
    reporting_end_date date,
    FOREIGN KEY (employee_id) REFERENCES tbl_master_employees(employee_id),
    FOREIGN KEY (manager_id) REFERENCES tbl_master_employees(employee_id)
);

CREATE TABLE tbl_employee_cost (
    employee_cost_id INTEGER PRIMARY KEY,
    employee_id TEXT,
    cost_per_hour REAL,
    billing_per_hour REAL,
    start_datetime TEXT,
    end_datetime TEXT,
    billing_status TEXT,
    FOREIGN KEY (employee_id) REFERENCES tbl_master_employees(employee_id)
);


CREATE TABLE tbl_client_companies (
    client_company_id INTEGER PRIMARY KEY,
    company_id INTEGER,
    client_id INTEGER,
    FOREIGN KEY (client_id) REFERENCES tbl_master_clients(client_id),
    FOREIGN KEY (company_id) REFERENCES tbl_master_companies(company_id)
);

CREATE TABLE tbl_client_contactpersons (
    contactperson_id INTEGER PRIMARY KEY,
    client_id integer,
    company_id integer,
    contactperson_name TEXT,
    contactperson_email TEXT,
    contactperson_mobile_no TEXT,
    isActive boolean,
    FOREIGN KEY (client_id) REFERENCES tbl_master_clients(client_id),
    FOREIGN KEY (company_id) REFERENCES tbl_master_companies(company_id)
);


CREATE TABLE tbl_job_assignment (
    job_assignment_id INTEGER PRIMARY KEY,
    job_id TEXT,
    assignee_employee_id TEXT,
    job_assign_date TEXT,
    job_assigned_by int,
    job_planned_start_date TEXT,
    job_planned_end_date TEXT,
    job_actual_start_date TEXT,
    job_actual_end_date TEXT,
    status TEXT DEFAULT 'Assigned',
    FOREIGN KEY (job_id) REFERENCES tbl_master_jobs(job_id),
    FOREIGN KEY (assignee_employee_id) REFERENCES tbl_master_employees(employee_id),
    FOREIGN KEY (job_assigned_by) REFERENCES tbl_master_employees(employee_id)
);

CREATE TABLE tbl_job_status_report (
    job_status_id INTEGER PRIMARY KEY,
    job_id TEXT,
    assignee_employee_id TEXT,
    report_datetime TEXT,
    status_description TEXT,
    job_overall_status TEXT,
    job_percentage_complete text,
    FOREIGN KEY (job_id) REFERENCES tbl_master_jobs(job_id),
    FOREIGN KEY (assignee_employee_id) REFERENCES tbl_master_employees(employee_id)
);




CREATE TABLE tbl_job_comments (
    job_comment_id INTEGER PRIMARY KEY,
    commenter_id integer,
    comment_sequence_id INTEGER,
    comment_text TEXT,
    create_datetime datetime,
    update_datetime datetime,
    job_status INTEGER,
    FOREIGN KEY (commenter_id) REFERENCES tbl_master_employees(employee_id)
);

CREATE TABLE tbl_job_documents (
    job_document_id INTEGER PRIMARY KEY,
    job_id TEXT,
    document_type_id INTEGER,
    document_name TEXT,
    document_location TEXT,
    document_description TEXT,
    FOREIGN KEY (job_id) REFERENCES tbl_master_jobs(job_id),
    FOREIGN KEY (document_type_id) REFERENCES tbl_master_document_types(document_id)
);


CREATE TABLE tbl_job_receipt_info (
    job_receipt_id INTEGER PRIMARY KEY,
    job_id integer,
    receipt_no TEXT,
    file_reference_no TEXT,
    assessment_year TEXT,
    job_category_id integer,
    job_receipt_description TEXT,
    FOREIGN KEY (job_id) REFERENCES tbl_master_jobs(job_id)
);

CREATE TABLE tbl_job_billing (
    job_billing_id INTEGER PRIMARY KEY,
    job_id TEXT,
    client_id TEXT,
    invoice_id TEXT,
    invoice_status text,
    invoice_raised_by text,
    invoice_raised_date date,
    invoice_reference_number text,
    FOREIGN KEY (job_id) REFERENCES tbl_master_jobs(job_id),
    FOREIGN KEY (client_id) REFERENCES tbl_master_clients(client_id)
);

