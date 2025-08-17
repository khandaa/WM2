-- WM Database Schema and Initial Data
-- This SQL file creates all database tables and populates them with initial data

-- Enable foreign key constraints
PRAGMA foreign_keys = ON;

-- Drop existing tables if they exist
-- user and roles will be managed in base_v2
-- for every employee created, there will be a corresponding entry in master users table
DROP TABLE IF EXISTS tbl_master_companies;
DROP TABLE IF EXISTS tbl_master_employees;
DROP TABLE IF EXISTS tbl_master_teams;
DROP TABLE IF EXISTS tbl_master_departments;
DROP TABLE IF EXISTS tbl_master_clients;
DROP TABLE IF EXISTS tbl_master_jobs;
DROP TABLE IF EXISTS tbl_master_job_category;
DROP TABLE IF EXISTS tbl_master_job_status;
DROP TABLE IF EXISTS tbl_master_document_types;

DROP TABLE IF EXISTS tbl_employee_details;
DROP TABLE IF EXISTS tbl_employee_documents;
DROP TABLE IF EXISTS tbl_employee_reporting;
DROP TABLE IF EXISTS tbl_employee_cost;

DROP TABLE IF EXISTS tbl_client_companies;
DROP TABLE IF EXISTS tbl_client_contacts;

DROP TABLE IF EXISTS tbl_job_details;
DROP TABLE IF EXISTS tbl_job_employee_assignment;
DROP TABLE IF EXISTS tbl_job_status_report;
DROP TABLE IF EXISTS tbl_job_comments;
DROP TABLE IF EXISTS tbl_job_documents;
DROP TABLE IF EXISTS tbl_job_receipt_info;
DROP TABLE IF EXISTS tbl_job_billing;


CREATE TABLE tbl_master_companies (
    company_id INTEGER PRIMARY KEY,
    company_name TEXT,
    company_primary_contact_name TEXT,
    company_primary_contact_mobile_number text, 
    company_logo text,
    company_url text,
    company_city TEXT,
    company_state TEXT

);

-- every time a new employee is created, an enty should also be made in base_master_users
-- Create tables tbl_master_employees
CREATE TABLE tbl_master_employees (
    employee_id INTEGER PRIMARY KEY,
    company_id integer,
    company_employee_id TEXT,
    employee_name TEXT,
    employee_gender TEXT,
    employee_status text,
    employee_qualification TEXT,
    employee_date_of_joining TEXT,
    employee_city_of_residence text,
    employee_city_of_work text,
    employee_date_of_birth TEXT,
    emergency_contact_no TEXT,
    emergency_contact_name TEXT,
    emergency_person_relation TEXT,
    employee_photo text,
    FOREIGN KEY (company_id) REFERENCES tbl_master_companies(company_id)
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

CREATE TABLE tbl_master_clients (
    client_id integer PRIMARY KEY,
    client_name TEXT,
    client_group_name TEXT,
    client_status TEXT,
    client_owner_name text,
    client_owner_email text,
    client_owner_mobile text,
    created_by text,
    create_date date,
    last_updated_by text,
    last_update_date date
    
);


CREATE TABLE tbl_master_jobs (
    job_id INTEGER PRIMARY KEY,
    job_name TEXT,
    job_category_id INTEGER,
    job_description TEXT,
    job_no INTEGER,
    document_id integer,
    physical_file_no TEXT,
    job_status_id integer,
    job_assesment_year TEXT,
    job_received_date date, 
    job_planned_start_date date,
    job_planned_end_date date,
    job_regulatory_end_date date, 
    job_actual_start_date date,
    job_actual_end_date date,
    client_id INTEGER,
    company_id integer, 
    created_by INTEGER,
    job_create_date date,
    last_update_by integer,
    last_update_date date,
    job_priority integer,
    job_client_priority integer, 
    job_overall_priority integer, 
    job_receipt_date TEXT,
    FOREIGN KEY (job_category_id) REFERENCES tbl_master_job_category(job_category_id),
    FOREIGN KEY (client_id) REFERENCES tbl_master_clients(client_id),
    FOREIGN KEY (company_id) REFERENCES tbl_master_companies(company_id),
    FOREIGN KEY (job_status_id) REFERENCES tbl_master_job_status(job_status_id),
    FOREIGN KEY (document_id) REFERENCES tbl_master_document_types(document_id),
    FOREIGN KEY (created_by) REFERENCES tbl_master_employees(employee_id),
    FOREIGN KEY (last_update_by) REFERENCES tbl_master_employees(employee_id)
);


CREATE TABLE tbl_master_job_category (
    job_category_id INTEGER PRIMARY KEY,
    job_description TEXT,
    job_category_type text,
    parent_job_category_id integer
);

CREATE TABLE tbl_master_job_status (
    job_status_id INTEGER PRIMARY KEY,
    job_status_name TEXT
);


CREATE TABLE tbl_master_document_types (
    document_id INTEGER PRIMARY KEY,
    document_type TEXT,
    document_desc TEXT,
    document_category TEXT,
    document_location text
);



-- Create tables tbl_master_employees
CREATE TABLE tbl_employee_details (
    employee_detail_id integer primary key, 
    employee_id INTEGER,
    employee_team_id integer,
    employee_department_id integer,
    employee_location text,
    FOREIGN KEY (employee_id) REFERENCES tbl_master_employees(employee_id),
    FOREIGN KEY (employee_team_id) REFERENCES tbl_master_teams(team_id),
    FOREIGN KEY (employee_department_id) REFERENCES tbl_master_departments(department_id)
);


CREATE TABLE tbl_employee_documents (
    employee_document_id integer primary key, 
    employee_id INTEGER,
    document_id integer,
    employee_document_name text, 
    employee_document_location text, 
    FOREIGN KEY (employee_id) REFERENCES tbl_master_employees(employee_id)
);

CREATE TABLE tbl_employee_reporting (
    employee_reporting_id integer primary key, 
    employee_id INTEGER,
    employee_manager_id integer, 
    employee_role_id integer,
    role_start_date date, 
    role_end_date date,
    FOREIGN KEY (employee_id) REFERENCES tbl_master_employees(employee_id),
    FOREIGN KEY (employee_manager_id) REFERENCES tbl_master_employees(employee_id),
    FOREIGN KEY (employee_role_id) REFERENCES base_master_roles(role_id)
);

CREATE TABLE tbl_employee_cost (
    employee_cost_id INTEGER PRIMARY KEY,
    employee_id TEXT,
    cost_per_hour REAL,
    billing_per_hour REAL,
    start_datetime TEXT,
    end_datetime TEXT,
    billing_status TEXT,
    client_id integer,
    invoice_no text,
    FOREIGN KEY (employee_id) REFERENCES tbl_master_employees(employee_id),
    FOREIGN KEY (client_id) REFERENCES tbl_master_clients(client_id)
);


CREATE TABLE tbl_client_companies (
    client_company_id INTEGER PRIMARY KEY,
    company_id INTEGER,
    client_id INTEGER,
    create_date date,
    last_update_date date,
    created_by integer,
    last_updated_by integer,
    company_tax_identifier_name TEXT,
    company_tax_identifier_value TEXT,
    FOREIGN KEY (client_id) REFERENCES tbl_master_clients(client_id),
    FOREIGN KEY (company_id) REFERENCES tbl_master_companies(company_id)
);

CREATE TABLE tbl_client_contacts (
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
    assigned_to_employee_id integer,
    assigned_by_employee_id integer,
    job_assign_date TEXT,
    job_planned_start_date TEXT,
    job_planned_end_date TEXT,
    job_actual_start_date TEXT,
    job_actual_end_date TEXT,
    status TEXT DEFAULT 'Assigned',
    FOREIGN KEY (job_id) REFERENCES tbl_master_jobs(job_id),
    FOREIGN KEY (assigned_to_employee_id) REFERENCES tbl_master_employees(employee_id),
    FOREIGN KEY (assigned_by_employee_id) REFERENCES tbl_master_employees(employee_id)
);

CREATE TABLE tbl_job_status_report (
    job_status_report_id INTEGER PRIMARY KEY,
    job_id integer,
    job_status_id integer,
    status_by_employee_id integer,
    status_report_date date,
    status_report_time time,
    status_description TEXT,
    job_percentage_complete text,
    FOREIGN KEY (job_id) REFERENCES tbl_master_jobs(job_id),
    FOREIGN KEY (job_status_id) REFERENCES tbl_master_job_status(job_status_id),
    FOREIGN KEY (status_by_employee_id) REFERENCES tbl_master_employees(employee_id)
);




CREATE TABLE tbl_job_comments (
    job_comment_id INTEGER PRIMARY KEY,
    job_commenter_id integer,
    comment_sequence_id INTEGER,
    comment_text TEXT,
    create_datetime datetime,
    update_datetime datetime,
    FOREIGN KEY (job_commenter_id) REFERENCES tbl_master_employees(employee_id)
);

CREATE TABLE tbl_job_documents (
    job_document_id INTEGER PRIMARY KEY,
    job_id TEXT,
    document_type_id INTEGER,
    document_name TEXT,
    document_location TEXT,
    document_description TEXT,
    FOREIGN KEY (job_id) REFERENCES tbl_master_jobs(job_id),
    FOREIGN KEY (document_type_id) REFERENCES tbl_master_document_types(document_type_id)
);


CREATE TABLE tbl_job_receipt_info (
    job_receipt_id INTEGER PRIMARY KEY,
    job_id integer,
    job_receipt_no TEXT,
    file_reference_no TEXT,
    job_assessment_year TEXT,
    job_category_id integer,
    job_receipt_description TEXT,
    FOREIGN KEY (job_id) REFERENCES tbl_master_jobs(job_id),
    FOREIGN KEY (job_category_id) REFERENCES tbl_master_job_category(job_category_id)
);

CREATE TABLE tbl_job_billing (
    job_billing_id INTEGER PRIMARY KEY,
    job_id TEXT,
    client_id TEXT,
    invoice_id TEXT,
    invoice_status text,
    invoice_raised_by int,
    invoice_raised_date date,
    invoice_reference_number text,
    FOREIGN KEY (job_id) REFERENCES tbl_master_jobs(job_id),
    FOREIGN KEY (client_id) REFERENCES tbl_master_clients(client_id),
    FOREIGN KEY (invoice_raised_by) REFERENCES tbl_master_employees(employee_id)
);

