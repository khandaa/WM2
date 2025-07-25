-- seedData.sql - Sample data for WorkManagement.db
-- Created: 2025-07-25

-- Enable foreign key constraints
PRAGMA foreign_keys = ON;

-- Begin transaction for better performance and data integrity
BEGIN TRANSACTION;

-- =======================================
-- 1. INSERT INTO MASTER TABLES FIRST
-- =======================================

-- Insert roles
INSERT INTO tbl_master_roles (role_id, role_name, role_description, role_type, role_isactive) VALUES 
(1, 'Administrator', 'System Administrator with all privileges', 'ADMIN', 1),
(2, 'Manager', 'Department Manager', 'MANAGER', 1),
(3, 'Team Lead', 'Team Leader', 'MANAGER', 1),
(4, 'Senior Associate', 'Senior level employee', 'EMPLOYEE', 1),
(5, 'Associate', 'Regular employee', 'EMPLOYEE', 1),
(6, 'Junior Associate', 'Entry level employee', 'EMPLOYEE', 1),
(7, 'Intern', 'Temporary intern', 'EMPLOYEE', 1),
(8, 'Finance', 'Finance department member', 'EMPLOYEE', 1),
(9, 'HR', 'Human Resources member', 'EMPLOYEE', 1),
(10, 'Client Manager', 'Client Relations Manager', 'MANAGER', 1),
(11, 'Sales', 'Sales Representative', 'EMPLOYEE', 1),
(12, 'Support', 'Technical Support', 'EMPLOYEE', 1),
(13, 'Consultant', 'External Consultant', 'EMPLOYEE', 0),
(14, 'Auditor', 'Compliance Auditor', 'EMPLOYEE', 1),
(15, 'Director', 'Department Director', 'MANAGER', 1),
(16, 'CEO', 'Chief Executive Officer', 'ADMIN', 1),
(17, 'CFO', 'Chief Financial Officer', 'ADMIN', 1),
(18, 'CTO', 'Chief Technology Officer', 'ADMIN', 1),
(19, 'COO', 'Chief Operations Officer', 'ADMIN', 1),
(20, 'Client', 'Client Role', 'CLIENT', 1);

-- Insert document types
INSERT INTO tbl_master_document_types (document_id, document_type, document_desc, document_category) VALUES
(1, 'ID Proof', 'Government issued ID card', 'EMPLOYEE'),
(2, 'Address Proof', 'Residence address verification', 'EMPLOYEE'),
(3, 'Educational Certificate', 'Academic qualifications', 'EMPLOYEE'),
(4, 'Resume', 'Professional resume/CV', 'EMPLOYEE'),
(5, 'Tax Document', 'Tax related document', 'FINANCIAL'),
(6, 'Invoice', 'Client invoice', 'FINANCIAL'),
(7, 'Receipt', 'Payment receipt', 'FINANCIAL'),
(8, 'Contract', 'Legal agreement', 'LEGAL'),
(9, 'Project Proposal', 'Client proposal document', 'PROJECT'),
(10, 'Project Report', 'Project status report', 'PROJECT'),
(11, 'Client Brief', 'Client requirements brief', 'CLIENT'),
(12, 'Technical Specification', 'Technical details document', 'PROJECT'),
(13, 'User Manual', 'End user documentation', 'PROJECT'),
(14, 'Training Material', 'Training resources', 'EMPLOYEE'),
(15, 'Performance Review', 'Employee evaluation', 'EMPLOYEE'),
(16, 'Medical Certificate', 'Health related document', 'EMPLOYEE'),
(17, 'Leave Application', 'Time-off request', 'EMPLOYEE'),
(18, 'Expense Report', 'Reimbursement request', 'FINANCIAL'),
(19, 'Client Feedback', 'Client satisfaction survey', 'CLIENT'),
(20, 'Meeting Minutes', 'Notes from meetings', 'PROJECT');

-- Insert job categories
INSERT INTO tbl_master_job_category (job_category_id, job_description, parent_job_category_id) VALUES
(1, 'Tax Filing', NULL),
(2, 'Audit', NULL),
(3, 'Financial Advisory', NULL),
(4, 'Legal Services', NULL),
(5, 'Consulting', NULL),
(6, 'Personal Tax', 1),
(7, 'Corporate Tax', 1),
(8, 'Internal Audit', 2),
(9, 'External Audit', 2),
(10, 'Compliance Audit', 2),
(11, 'Wealth Management', 3),
(12, 'Investment Advisory', 3),
(13, 'Risk Advisory', 3),
(14, 'Contract Law', 4),
(15, 'Corporate Law', 4),
(16, 'Strategy Consulting', 5),
(17, 'IT Consulting', 5),
(18, 'HR Consulting', 5),
(19, 'Operations Consulting', 5),
(20, 'Tax Planning', 1);

-- Insert companies
INSERT INTO tbl_master_companies (company_id, company_name, company_website, company_tax_identifier_name, company_tax_identifier_value) VALUES
(1, 'Tech Innovations Inc', 'www.techinnovations.com', 'EIN', '12-3456789'),
(2, 'Global Finance Ltd', 'www.globalfinance.com', 'EIN', '23-4567890'),
(3, 'Sunrise Retail', 'www.sunriseretail.com', 'EIN', '34-5678901'),
(4, 'Horizon Healthcare', 'www.horizonhealth.org', 'EIN', '45-6789012'),
(5, 'Emerald Properties', 'www.emeraldprop.com', 'EIN', '56-7890123'),
(6, 'Blue Ocean Logistics', 'www.blueoceanlog.com', 'EIN', '67-8901234'),
(7, 'Silver Cloud Software', 'www.silvercloud.io', 'EIN', '78-9012345'),
(8, 'Golden Star Hospitality', 'www.goldenstarhospitality.com', 'EIN', '89-0123456'),
(9, 'Quantum Analytics', 'www.quantumanalytics.ai', 'EIN', '90-1234567'),
(10, 'Vertex Manufacturing', 'www.vertexmfg.com', 'EIN', '01-2345678'),
(11, 'Crescent Investments', 'www.crescentinvest.com', 'EIN', '12-3456788'),
(12, 'Pinnacle Education', 'www.pinnacle-edu.org', 'EIN', '23-4567899'),
(13, 'Diamond Luxury Goods', 'www.diamondluxury.com', 'EIN', '34-5678900'),
(14, 'Omega Engineering', 'www.omega-eng.com', 'EIN', '45-6789011'),
(15, 'Phoenix Energy', 'www.phoenix-energy.com', 'EIN', '56-7890122'),
(16, 'Atlas Construction', 'www.atlasconstruction.com', 'EIN', '67-8901233'),
(17, 'Polaris Media Group', 'www.polarismedia.com', 'EIN', '78-9012344'),
(18, 'Echo Telecommunications', 'www.echotel.com', 'EIN', '89-0123455'),
(19, 'Fusion Biotech', 'www.fusionbiotech.com', 'EIN', '90-1234566'),
(20, 'Neptune Shipping', 'www.neptuneshipping.com', 'EIN', '01-2345677');

-- Insert clients
INSERT INTO tbl_master_clients (client_id, client_name, group_name, client_status, client_owner_name, client_owner_email, client_owner_mobile, created_by, create_date, last_updated_by, last_update_date) VALUES
(1, 'Johnson Family', 'Personal Clients', 'Active', 'Robert Johnson', 'robert@email.com', '555-1001', 'admin', '2025-01-01', 'admin', '2025-01-01'),
(2, 'Tech Innovations Inc', 'Corporate Clients', 'Active', 'Sarah Chen', 'sarah@techinnovations.com', '555-1002', 'admin', '2025-01-02', 'admin', '2025-01-02'),
(3, 'Smith & Partners', 'Law Firms', 'Active', 'James Smith', 'james@smithpartners.com', '555-1003', 'admin', '2025-01-03', 'admin', '2025-01-03'),
(4, 'Garcia Holdings', 'Investment Groups', 'Active', 'Elena Garcia', 'elena@garciaholdings.com', '555-1004', 'admin', '2025-01-04', 'admin', '2025-01-04'),
(5, 'Peterson Family', 'Personal Clients', 'Active', 'Michael Peterson', 'michael@email.com', '555-1005', 'admin', '2025-01-05', 'admin', '2025-01-05'),
(6, 'Horizon Healthcare', 'Healthcare', 'Active', 'David Wong', 'david@horizonhealth.org', '555-1006', 'admin', '2025-01-06', 'admin', '2025-01-06'),
(7, 'Williams Trust', 'Trusts', 'Inactive', 'Emma Williams', 'emma@email.com', '555-1007', 'admin', '2025-01-07', 'admin', '2025-01-07'),
(8, 'Blue Ocean Logistics', 'Logistics', 'Active', 'Thomas Lee', 'thomas@blueoceanlog.com', '555-1008', 'admin', '2025-01-08', 'admin', '2025-01-08'),
(9, 'Silver Cloud Software', 'Technology', 'Active', 'Olivia Rodriguez', 'olivia@silvercloud.io', '555-1009', 'admin', '2025-01-09', 'admin', '2025-01-09'),
(10, 'Taylor Family', 'Personal Clients', 'Active', 'Noah Taylor', 'noah@email.com', '555-1010', 'admin', '2025-01-10', 'admin', '2025-01-10'),
(11, 'Quantum Analytics', 'Consulting', 'Active', 'Sophia Kim', 'sophia@quantumanalytics.ai', '555-1011', 'admin', '2025-01-11', 'admin', '2025-01-11'),
(12, 'Martinez Group', 'Investment Groups', 'Active', 'Liam Martinez', 'liam@martinezgroup.com', '555-1012', 'admin', '2025-01-12', 'admin', '2025-01-12'),
(13, 'Vertex Manufacturing', 'Manufacturing', 'Active', 'Ava Thompson', 'ava@vertexmfg.com', '555-1013', 'admin', '2025-01-13', 'admin', '2025-01-13'),
(14, 'Brown Foundation', 'Non-Profit', 'Active', 'Ethan Brown', 'ethan@brownfoundation.org', '555-1014', 'admin', '2025-01-14', 'admin', '2025-01-14'),
(15, 'Wilson Estate', 'Estates', 'Active', 'Isabella Wilson', 'isabella@email.com', '555-1015', 'admin', '2025-01-15', 'admin', '2025-01-15'),
(16, 'Clark Investments', 'Financial', 'Active', 'Lucas Clark', 'lucas@clarkinvestments.com', '555-1016', 'admin', '2025-01-16', 'admin', '2025-01-16'),
(17, 'Young Family', 'Personal Clients', 'Active', 'Mia Young', 'mia@email.com', '555-1017', 'admin', '2025-01-17', 'admin', '2025-01-17'),
(18, 'Pinnacle Education', 'Education', 'Active', 'Mason Hall', 'mason@pinnacle-edu.org', '555-1018', 'admin', '2025-01-18', 'admin', '2025-01-18'),
(19, 'Adams Trust', 'Trusts', 'Active', 'Harper Adams', 'harper@email.com', '555-1019', 'admin', '2025-01-19', 'admin', '2025-01-19'),
(20, 'Diamond Luxury Goods', 'Retail', 'Active', 'Evelyn Scott', 'evelyn@diamondluxury.com', '555-1020', 'admin', '2025-01-20', 'admin', '2025-01-20');

-- Insert employees
INSERT INTO tbl_master_employees (employee_id, org_employee_id, employee_name, employee_gender, employee_qualification, date_of_joining, employee_city_of_residence, employee_city_of_work, employee_referred_by, date_of_birth, emergency_contact_no, emergency_contact_name, emergency_person_relation, employee_photo, role_id) VALUES
(1, 'EMP001', 'John Smith', 'Male', 'MBA Finance', '2024-01-01', 'New York', 'New York', NULL, '1985-05-15', '555-9001', 'Mary Smith', 'Spouse', 'photos/emp001.jpg', 16),
(2, 'EMP002', 'Emily Johnson', 'Female', 'CPA', '2024-01-05', 'Chicago', 'Chicago', NULL, '1988-07-21', '555-9002', 'Daniel Johnson', 'Spouse', 'photos/emp002.jpg', 2),
(3, 'EMP003', 'Michael Chen', 'Male', 'PhD Economics', '2024-01-10', 'San Francisco', 'San Francisco', 1, '1980-03-12', '555-9003', 'Linda Chen', 'Spouse', 'photos/emp003.jpg', 17),
(4, 'EMP004', 'Jessica Lee', 'Female', 'MSc Accounting', '2024-01-15', 'Boston', 'Boston', 2, '1992-11-30', '555-9004', 'Robert Lee', 'Father', 'photos/emp004.jpg', 3),
(5, 'EMP005', 'David Garcia', 'Male', 'BBA Finance', '2024-01-20', 'Miami', 'Miami', NULL, '1990-09-25', '555-9005', 'Sofia Garcia', 'Sister', 'photos/emp005.jpg', 4),
(6, 'EMP006', 'Sarah Wilson', 'Female', 'JD Law', '2024-01-25', 'Seattle', 'Seattle', 3, '1982-04-17', '555-9006', 'Thomas Wilson', 'Spouse', 'photos/emp006.jpg', 4),
(7, 'EMP007', 'Kevin Brown', 'Male', 'MBA Marketing', '2024-02-01', 'Denver', 'Denver', NULL, '1991-12-05', '555-9007', 'Jennifer Brown', 'Mother', 'photos/emp007.jpg', 5),
(8, 'EMP008', 'Amanda Miller', 'Female', 'BSc Computer Science', '2024-02-05', 'Austin', 'Austin', 5, '1993-08-14', '555-9008', 'James Miller', 'Brother', 'photos/emp008.jpg', 5),
(9, 'EMP009', 'Ryan Taylor', 'Male', 'MSc Finance', '2024-02-10', 'Portland', 'Portland', NULL, '1984-06-23', '555-9009', 'Emma Taylor', 'Spouse', 'photos/emp009.jpg', 10),
(10, 'EMP010', 'Olivia Martinez', 'Female', 'CFA Level 3', '2024-02-15', 'San Diego', 'San Diego', 4, '1989-10-09', '555-9010', 'Carlos Martinez', 'Father', 'photos/emp010.jpg', 11),
(11, 'EMP011', 'William Anderson', 'Male', 'MBA Business', '2024-02-20', 'Philadelphia', 'Philadelphia', NULL, '1983-02-28', '555-9011', 'Elizabeth Anderson', 'Spouse', 'photos/emp011.jpg', 2),
(12, 'EMP012', 'Sophia Thomas', 'Female', 'MSc HR Management', '2024-02-25', 'Houston', 'Houston', 6, '1990-07-15', '555-9012', 'Joseph Thomas', 'Brother', 'photos/emp012.jpg', 9),
(13, 'EMP013', 'Daniel White', 'Male', 'MSc Data Science', '2024-03-01', 'Atlanta', 'Atlanta', NULL, '1987-04-03', '555-9013', 'Natalie White', 'Spouse', 'photos/emp013.jpg', 3),
(14, 'EMP014', 'Isabella Clark', 'Female', 'BBA Marketing', '2024-03-05', 'Dallas', 'Dallas', 8, '1994-01-22', '555-9014', 'Michael Clark', 'Father', 'photos/emp014.jpg', 6),
(15, 'EMP015', 'Matthew Rodriguez', 'Male', 'BSc Accounting', '2024-03-10', 'Phoenix', 'Phoenix', NULL, '1992-05-11', '555-9015', 'Sofia Rodriguez', 'Mother', 'photos/emp015.jpg', 5),
(16, 'EMP016', 'Emma Wilson', 'Female', 'MSc Finance', '2024-03-15', 'Minneapolis', 'Minneapolis', 10, '1991-09-18', '555-9016', 'Lucas Wilson', 'Spouse', 'photos/emp016.jpg', 14),
(17, 'EMP017', 'Christopher Lee', 'Male', 'PhD Business', '2024-03-20', 'Detroit', 'Detroit', NULL, '1982-11-07', '555-9017', 'Hannah Lee', 'Spouse', 'photos/emp017.jpg', 15),
(18, 'EMP018', 'Ava Thompson', 'Female', 'MSc Taxation', '2024-03-25', 'St. Louis', 'St. Louis', 11, '1986-08-29', '555-9018', 'David Thompson', 'Spouse', 'photos/emp018.jpg', 8),
(19, 'EMP019', 'James Robinson', 'Male', 'MBA Operations', '2024-04-01', 'Kansas City', 'Kansas City', NULL, '1985-03-14', '555-9019', 'Olivia Robinson', 'Spouse', 'photos/emp019.jpg', 3),
(20, 'EMP020', 'Mia Scott', 'Female', 'JD Corporate Law', '2024-04-05', 'New Orleans', 'New Orleans', 15, '1988-12-16', '555-9020', 'William Scott', 'Spouse', 'photos/emp020.jpg', 4);

-- Insert users
INSERT INTO tbl_master_users (user_id, user_name, email_id, mobile_no, user_password, user_role, user_start_date, user_end_date, employee_id, isActive, password_last_update_date) VALUES
(1, 'admin', 'admin@employdex.com', '555-0001', '$2a$10$XpUbHcXyHzgP8nYGRnM7teueT8gLXmYw9iuB9DT.XDjlWjA9QZ3Aq', 'ADMIN', '2024-01-01', NULL, '1', 1, '2025-01-01'),
(2, 'emily.johnson', 'emily.johnson@employdex.com', '555-0002', '$2a$10$XgPxEakZ8eFqTbsNLu3.Wu8sMlsF9M2nAGGf8hoJ1aLsM7slUMmmi', 'MANAGER', '2024-01-05', NULL, '2', 1, '2025-01-05'),
(3, 'michael.chen', 'michael.chen@employdex.com', '555-0003', '$2a$10$VhExXqYo6Coy8xYv0vQEHeqolMJm/g1U7bwFO58z51F.wMgGGmE3C', 'ADMIN', '2024-01-10', NULL, '3', 1, '2025-01-10'),
(4, 'jessica.lee', 'jessica.lee@employdex.com', '555-0004', '$2a$10$sY1NSv7gQ7NLcQJPuf/lQufNACzEmYDyCQMrCIKVw69MI5YAr0fHK', 'MANAGER', '2024-01-15', NULL, '4', 1, '2025-01-15'),
(5, 'david.garcia', 'david.garcia@employdex.com', '555-0005', '$2a$10$dn42FLfE.Svydcy9TeAykewA93zNZf/6M76.71dh26jEwKXKMz.Ki', 'MANAGER', '2024-01-20', NULL, '5', 1, '2025-01-20'),
(6, 'sarah.wilson', 'sarah.wilson@employdex.com', '555-0006', '$2a$10$lX2K7VJ3CF0kbfeZvE3f9.s0CGxWn6pIJssAxLRmSWl.QcdVJJLJW', 'EMPLOYEE', '2024-01-25', NULL, '6', 1, '2025-01-25'),
(7, 'kevin.brown', 'kevin.brown@employdex.com', '555-0007', '$2a$10$rVq0UXeifv2ugBuRNm0DmelKFWIXUfyTSxjcJH57kK/BMu0sgjPyu', 'EMPLOYEE', '2024-02-01', NULL, '7', 1, '2025-02-01'),
(8, 'amanda.miller', 'amanda.miller@employdex.com', '555-0008', '$2a$10$aVuKDE7WgjY.UpCTuzDKDeTCN7pnTcZXX1H11Y9mSYQkMXujFtM3.', 'EMPLOYEE', '2024-02-05', NULL, '8', 1, '2025-02-05'),
(9, 'ryan.taylor', 'ryan.taylor@employdex.com', '555-0009', '$2a$10$PiQtYzfynKE1Jq1zLKf5uOwUX9kSL6Wv.PzehOMLPXHYAVbmQYVTC', 'MANAGER', '2024-02-10', NULL, '9', 1, '2025-02-10'),
(10, 'olivia.martinez', 'olivia.martinez@employdex.com', '555-0010', '$2a$10$K2lG7dKDQkrn40RpM3JwF.HvZ8nMm0.myUzHlLxsNF5F0VdX1l.X.', 'EMPLOYEE', '2024-02-15', NULL, '10', 1, '2025-02-15'),
(11, 'william.anderson', 'william.anderson@employdex.com', '555-0011', '$2a$10$JtEk/U6nt9gswfXsQc3mHeOpvufb52ZQF9NXmUPclDvVGCumrrp8W', 'MANAGER', '2024-02-20', NULL, '11', 1, '2025-02-20'),
(12, 'sophia.thomas', 'sophia.thomas@employdex.com', '555-0012', '$2a$10$BjjtDdjKfTfKK5kZzzG60uXP6jggnmr1liFwRZ5YXxrNvZR2gvuse', 'EMPLOYEE', '2024-02-25', NULL, '12', 1, '2025-02-25'),
(13, 'daniel.white', 'daniel.white@employdex.com', '555-0013', '$2a$10$ljSgjTYfIwp2IKPKEDkJ4.GDgZ/FK3cgTHnvknzFx6nMz1XkwReLG', 'MANAGER', '2024-03-01', NULL, '13', 1, '2025-03-01'),
(14, 'isabella.clark', 'isabella.clark@employdex.com', '555-0014', '$2a$10$ESScPAdOsXVE1JX.vcnouOmWOOiDe3Klpji3pHHvyvM0eK/FgRDV2', 'EMPLOYEE', '2024-03-05', NULL, '14', 1, '2025-03-05'),
(15, 'matthew.rodriguez', 'matthew.rodriguez@employdex.com', '555-0015', '$2a$10$aYHtTPhh4wwDfKQOdZmXcu0Ix5JoyzR7WxPDZEbD6wMj0bM/YkvJ6', 'EMPLOYEE', '2024-03-10', NULL, '15', 1, '2025-03-10'),
(16, 'emma.wilson', 'emma.wilson@employdex.com', '555-0016', '$2a$10$Y.KrT6TLDVqoK1LHTuGy9ezgTTp5CcisuaIv5ZbRc3ZPvfQQmAuBu', 'EMPLOYEE', '2024-03-15', NULL, '16', 1, '2025-03-15'),
(17, 'christopher.lee', 'christopher.lee@employdex.com', '555-0017', '$2a$10$2wbz7G1F9jfb9JKljy2yXOj6KVn9MdwewmmFnb3UaXBYl/fOtDnCi', 'MANAGER', '2024-03-20', NULL, '17', 1, '2025-03-20'),
(18, 'ava.thompson', 'ava.thompson@employdex.com', '555-0018', '$2a$10$v9YKRWD9nmfW4U0PRH/meeRBmvZZEv3PI4rKyVx83JXbJ0ZcEO4oW', 'EMPLOYEE', '2024-03-25', NULL, '18', 1, '2025-03-25'),
(19, 'james.robinson', 'james.robinson@employdex.com', '555-0019', '$2a$10$ZQWdMJ3ezotaXe9vUSZKBuktES5QcNK2N3zTEiDldhK6kGjDkq0rC', 'MANAGER', '2024-04-01', NULL, '19', 1, '2025-04-01'),
(20, 'mia.scott', 'mia.scott@employdex.com', '555-0020', '$2a$10$3VDcvRBn1eL6uTL0jn5BFeDDf1CL1G/XjkQP7lDt7z3yBJazUgNM6', 'EMPLOYEE', '2024-04-05', NULL, '20', 1, '2025-04-05');

-- Insert user roles
INSERT INTO tbl_user_roles (user_role_id, user_id, role_id, role_start_date, role_end_date) VALUES
(1, 1, 1, '2024-01-01', NULL),
(2, 2, 2, '2024-01-05', NULL),
(3, 3, 18, '2024-01-10', NULL),
(4, 4, 3, '2024-01-15', NULL),
(5, 5, 2, '2024-01-20', NULL),
(6, 6, 4, '2024-01-25', NULL),
(7, 7, 5, '2024-02-01', NULL),
(8, 8, 5, '2024-02-05', NULL),
(9, 9, 10, '2024-02-10', NULL),
(10, 10, 11, '2024-02-15', NULL),
(11, 11, 2, '2024-02-20', NULL),
(12, 12, 9, '2024-02-25', NULL),
(13, 13, 3, '2024-03-01', NULL),
(14, 14, 6, '2024-03-05', NULL),
(15, 15, 5, '2024-03-10', NULL),
(16, 16, 14, '2024-03-15', NULL),
(17, 17, 15, '2024-03-20', NULL),
(18, 18, 8, '2024-03-25', NULL),
(19, 19, 3, '2024-04-01', NULL),
(20, 20, 4, '2024-04-05', NULL);

-- Insert user activities
INSERT INTO tbl_user_activities (activity_id, activity_name, activity_description, activity_date_time, created_by, ip_address, device_type, browser_name) VALUES
(1, 'Login', 'User logged in successfully', '2025-07-01 08:30:00', 'admin', '192.168.1.1', 'Desktop', 'Chrome'),
(2, 'Create Job', 'Created new job #JOB001', '2025-07-01 09:15:00', 'admin', '192.168.1.1', 'Desktop', 'Chrome'),
(3, 'Assign Job', 'Assigned job #JOB001 to Emily Johnson', '2025-07-01 09:20:00', 'admin', '192.168.1.1', 'Desktop', 'Chrome'),
(4, 'Login', 'User logged in successfully', '2025-07-01 08:45:00', 'emily.johnson', '192.168.1.2', 'Desktop', 'Firefox'),
(5, 'Update Job', 'Updated status of job #JOB001 to In Progress', '2025-07-01 10:30:00', 'emily.johnson', '192.168.1.2', 'Desktop', 'Firefox'),
(6, 'Login', 'User logged in successfully', '2025-07-01 09:00:00', 'michael.chen', '192.168.1.3', 'Mobile', 'Safari'),
(7, 'Create Client', 'Created new client: Tech Solutions Ltd', '2025-07-01 09:45:00', 'michael.chen', '192.168.1.3', 'Mobile', 'Safari'),
(8, 'Logout', 'User logged out', '2025-07-01 17:30:00', 'admin', '192.168.1.1', 'Desktop', 'Chrome'),
(9, 'Login', 'User logged in successfully', '2025-07-02 08:15:00', 'admin', '192.168.1.1', 'Desktop', 'Chrome'),
(10, 'Create Job', 'Created new job #JOB002', '2025-07-02 09:00:00', 'admin', '192.168.1.1', 'Desktop', 'Chrome'),
(11, 'Assign Job', 'Assigned job #JOB002 to Jessica Lee', '2025-07-02 09:05:00', 'admin', '192.168.1.1', 'Desktop', 'Chrome'),
(12, 'Login', 'User logged in successfully', '2025-07-02 08:30:00', 'jessica.lee', '192.168.1.4', 'Laptop', 'Edge'),
(13, 'Update Job', 'Updated status of job #JOB002 to In Progress', '2025-07-02 10:00:00', 'jessica.lee', '192.168.1.4', 'Laptop', 'Edge'),
(14, 'Upload Document', 'Uploaded document to job #JOB001', '2025-07-02 11:30:00', 'emily.johnson', '192.168.1.2', 'Desktop', 'Firefox'),
(15, 'Create Comment', 'Added comment to job #JOB001', '2025-07-02 14:15:00', 'emily.johnson', '192.168.1.2', 'Desktop', 'Firefox'),
(16, 'Login', 'User logged in successfully', '2025-07-03 08:45:00', 'david.garcia', '192.168.1.5', 'Desktop', 'Chrome'),
(17, 'Create Job', 'Created new job #JOB003', '2025-07-03 09:30:00', 'david.garcia', '192.168.1.5', 'Desktop', 'Chrome'),
(18, 'Assign Job', 'Assigned job #JOB003 to Kevin Brown', '2025-07-03 09:35:00', 'david.garcia', '192.168.1.5', 'Desktop', 'Chrome'),
(19, 'Login', 'User logged in successfully', '2025-07-03 09:00:00', 'kevin.brown', '192.168.1.6', 'Mobile', 'Chrome'),
(20, 'Update Job', 'Updated status of job #JOB003 to In Progress', '2025-07-03 10:45:00', 'kevin.brown', '192.168.1.6', 'Mobile', 'Chrome');

-- First insert needed records for companies
INSERT INTO tbl_master_companies (company_id, company_name, company_website, company_tax_identifier_name, company_tax_identifier_value) VALUES
(1, 'Tech Solutions Ltd', 'www.techsolutions.com', 'EIN', '12-3456789'),
(2, 'Globex Corporation', 'www.globexcorp.com', 'EIN', '23-4567890'),
(3, 'Acme Industries', 'www.acmeindustries.com', 'EIN', '34-5678901'),
(4, 'Wayne Enterprises', 'www.wayneenterprises.com', 'EIN', '45-6789012'),
(5, 'Stark Industries', 'www.starkindustries.com', 'EIN', '56-7890123');

-- Insert master jobs
INSERT INTO tbl_master_jobs (job_id, job_name, job_division_id, job_category_id, job_description, job_no, physical_file_no, job_status, assesment_year, job_planned_start_date, job_planned_end_date, job_actual_start_date, job_actual_end_date, client_id, company_id, created_by, job_priority, receipt_date) VALUES
(1, 'Financial Audit 2025', 1, 1, 'Annual financial audit for Tech Solutions Ltd', 1001, 'F1001', 'In Progress', '2025-26', '2025-02-01', '2025-03-15', '2025-02-01', NULL, 1, 1, 1, 'High', '2025-01-15'),
(2, 'Tax Filing FY2024', 1, 2, 'Tax filing and compliance for Globex Corporation', 1002, 'F1002', 'In Progress', '2024-25', '2025-02-15', '2025-04-10', '2025-02-15', NULL, 2, 2, 1, 'Medium', '2025-01-20'),
(3, 'HR Policy Update', 2, 5, 'Comprehensive HR policy update for Acme Industries', 1003, 'F1003', 'In Progress', NULL, '2025-02-10', '2025-03-10', '2025-02-12', NULL, 3, 3, 2, 'Low', '2025-01-25'),
(4, 'Merger Due Diligence', 3, 3, 'Due diligence for merger with Wayne Enterprises', 1004, 'F1004', 'In Progress', NULL, '2025-02-20', '2025-04-30', '2025-02-20', NULL, 4, 4, 2, 'High', '2025-02-01'),
(5, 'Strategic Planning 2025', 4, 4, 'Annual strategic planning for Stark Industries', 1005, 'F1005', 'In Progress', '2025-26', '2025-03-01', '2025-04-15', '2025-03-01', NULL, 5, 5, 3, 'Medium', '2025-02-05'),
(6, 'Quarterly Financial Review', 1, 1, 'Q1 2025 financial review for Umbrella Corp', 1006, 'F1006', 'Planned', '2025-26', '2025-04-01', '2025-04-15', NULL, NULL, 6, 6, 3, 'Medium', '2025-02-10'),
(7, 'Compliance Audit', 2, 6, 'Regulatory compliance audit for OsCorp', 1007, 'F1007', 'In Progress', NULL, '2025-03-10', '2025-04-10', '2025-03-10', NULL, 7, 7, 4, 'High', '2025-02-15'),
(8, 'Software Implementation', 3, 7, 'ERP software implementation for Cyberdyne Systems', 1008, 'F1008', 'In Progress', NULL, '2025-03-15', '2025-06-15', '2025-03-15', NULL, 8, 8, 4, 'High', '2025-02-20'),
(9, 'Risk Assessment', 2, 6, 'Comprehensive risk assessment for Aperture Science', 1009, 'F1009', 'In Progress', NULL, '2025-03-20', '2025-05-20', '2025-03-20', NULL, 9, 9, 5, 'Medium', '2025-02-25'),
(10, 'Budget Planning FY2026', 4, 8, 'Annual budget planning for Black Mesa', 1010, 'F1010', 'Planned', '2025-26', '2025-04-01', '2025-05-31', NULL, NULL, 10, 10, 3, 'Medium', '2025-03-01'),
(11, 'Internal Audit', 2, 1, 'Internal systems audit for Weyland-Yutani', 1011, 'F1011', 'Planned', '2025-26', '2025-04-01', '2025-05-15', NULL, NULL, 11, 11, 2, 'Low', '2025-03-05'),
(12, 'Marketing Strategy', 4, 9, 'Q2 2025 marketing strategy for Massive Dynamic', 1012, 'F1012', 'Planned', '2025-26', '2025-04-05', '2025-05-20', NULL, NULL, 12, 12, 2, 'Medium', '2025-03-10'),
(13, 'Legal Compliance Review', 2, 6, 'Regulatory compliance review for InGen', 1013, 'F1013', 'Planned', '2025-26', '2025-04-10', '2025-05-10', NULL, NULL, 13, 13, 3, 'Medium', '2025-03-15'),
(14, 'Process Optimization', 4, 10, 'Business process optimization for Tyrell Corp', 1014, 'F1014', 'Planned', '2025-26', '2025-04-15', '2025-06-15', NULL, NULL, 14, 14, 3, 'Medium', '2025-03-20'),
(15, 'Executive Coaching', 4, 11, 'Leadership coaching for Buy n Large executives', 1015, 'F1015', 'Planned', '2025-26', '2025-04-20', '2025-07-20', NULL, NULL, 15, 15, 2, 'Low', '2025-03-25'),
(16, 'Supply Chain Analysis', 4, 10, 'Supply chain efficiency analysis for Soylent Corp', 1016, 'F1016', 'Planned', '2025-26', '2025-04-25', '2025-06-25', NULL, NULL, 16, 16, 2, 'Medium', '2025-04-01'),
(17, 'Digital Transformation', 3, 7, 'Digital transformation strategy for Initech', 1017, 'F1017', 'Planned', '2025-26', '2025-05-01', '2025-08-01', NULL, NULL, 17, 17, 3, 'High', '2025-04-05'),
(18, 'Sustainability Audit', 2, 12, 'Environmental sustainability audit for Xanatos Enterprises', 1018, 'F1018', 'Planned', '2025-26', '2025-05-05', '2025-06-20', NULL, NULL, 18, 18, 2, 'Medium', '2025-04-10'),
('JOB019', 'M&A Advisory', 19, 'Merger and acquisition advisory for Rekall', 3, '2025-04-15', '2025-05-10', '2025-07-10', NULL, NULL, 'Planned', 0),
('JOB020', 'Corporate Restructuring', 20, 'Organizational restructuring for Omni Consumer Products', 13, '2025-04-20', '2025-05-15', '2025-08-15', NULL, NULL, 'Planned', 0);

-- Insert job assignments
INSERT INTO tbl_job_assignment (job_assignment_id, job_id, assignee_employee_id, job_assign_date, job_assigned_by, job_planned_start_date, job_planned_end_date, job_actual_start_date, job_actual_end_date, status) VALUES
(1, 1, '2', '2025-02-01', 1, '2025-02-01', '2025-03-15', '2025-02-01', NULL, 'Assigned'),
(2, 1, '6', '2025-02-01', 1, '2025-02-01', '2025-03-15', '2025-02-01', NULL, 'Assigned'),
(3, 1, '8', '2025-02-01', 2, '2025-02-01', '2025-03-15', '2025-02-01', NULL, 'Assigned'),
(4, 2, '4', '2025-02-15', 1, '2025-02-15', '2025-04-10', '2025-02-15', NULL, 'Assigned'),
(5, 2, '10', '2025-02-15', 1, '2025-02-15', '2025-04-10', '2025-02-15', NULL, 'Assigned'),
(6, 2, '12', '2025-02-15', 1, '2025-02-15', '2025-04-10', '2025-02-15', NULL, 'Assigned'),
(7, 3, '5', '2025-02-12', 2, '2025-02-12', '2025-03-10', '2025-02-12', NULL, 'Assigned'),
(8, 3, '14', '2025-02-12', 2, '2025-02-12', '2025-03-10', '2025-02-12', NULL, 'Assigned'),
(9, 3, '18', '2025-02-12', 2, '2025-02-12', '2025-03-10', '2025-02-12', NULL, 'Assigned'),
(10, 4, '9', '2025-02-20', 3, '2025-02-20', '2025-04-30', '2025-02-20', NULL, 'Assigned'),
(11, 4, '15', '2025-02-20', 3, '2025-02-20', '2025-04-30', '2025-02-20', NULL, 'Assigned'),
(12, 5, '3', '2025-03-01', 3, '2025-03-01', '2025-04-15', '2025-03-01', NULL, 'Assigned'),
(13, 5, '19', '2025-03-01', 3, '2025-03-01', '2025-04-15', '2025-03-01', NULL, 'Assigned'),
(14, 7, '13', '2025-03-10', 4, '2025-03-10', '2025-04-10', '2025-03-10', NULL, 'Assigned'),
(15, 7, '3', '2025-03-10', 4, '2025-03-10', '2025-04-10', '2025-03-10', NULL, 'Assigned'),
(16, 7, '19', '2025-03-10', 4, '2025-03-10', '2025-04-10', '2025-03-10', NULL, 'Assigned'),
(17, 8, '17', '2025-03-15', 4, '2025-03-15', '2025-06-15', '2025-03-15', NULL, 'Assigned'),
(18, 8, '1', '2025-03-15', 4, '2025-03-15', '2025-06-15', '2025-03-15', NULL, 'Assigned'),
(19, 9, '4', '2025-03-20', 5, '2025-03-20', '2025-05-20', '2025-03-20', NULL, 'Assigned'),
(20, 10, '7', '2025-04-01', 5, '2025-04-01', '2025-05-31', '2025-04-01', NULL, 'Assigned');

-- Insert job documents
INSERT INTO tbl_job_documents (job_document_id, job_id, document_type_id, document_name, document_location, document_description) VALUES
(1, 1, 1, 'Engagement Letter', 'documents/job001/engagement_letter.pdf', 'Formal engagement letter with client'),
(2, 1, 2, 'Audit Plan', 'documents/job001/audit_plan.pdf', 'Detailed audit plan and methodology'),
(3, 1, 3, 'Financial Statements', 'documents/job001/financial_statements.xlsx', 'Client financial statements for FY2024'),
(4, 1, 6, 'Progress Report 1', 'documents/job001/progress_report_1.pdf', 'First progress report - Feb 15'),
(5, 2, 1, 'Engagement Letter', 'documents/job002/engagement_letter.pdf', 'Formal engagement letter with client'),
(6, 2, 4, 'Tax Filing Strategy', 'documents/job002/tax_strategy.pdf', 'Tax filing strategy document'),
(7, 2, 5, 'Previous Returns', 'documents/job002/previous_returns.pdf', 'Previous year tax returns'),
(8, 2, 6, 'Progress Report 1', 'documents/job002/progress_report_1.pdf', 'First progress report - Feb 28'),
(9, 3, 1, 'Engagement Letter', 'documents/job003/engagement_letter.pdf', 'Formal engagement letter with client'),
(10, 3, 7, 'Current HR Policies', 'documents/job003/current_policies.pdf', 'Current HR policies document'),
(11, 3, 8, 'Gap Analysis Report', 'documents/job003/gap_analysis.pdf', 'HR policy gap analysis report'),
(12, 3, 6, 'Progress Report 1', 'documents/job003/progress_report_1.pdf', 'First progress report - Feb 20'),
(13, 4, 1, 'Engagement Letter', 'documents/job004/engagement_letter.pdf', 'Formal engagement letter with client'),
(14, 4, 9, 'Due Diligence Plan', 'documents/job004/due_diligence_plan.pdf', 'Merger due diligence plan'),
(15, 4, 10, 'Financial Analysis', 'documents/job004/financial_analysis.xlsx', 'Target company financial analysis'),
(16, 4, 6, 'Progress Report 1', 'documents/job004/progress_report_1.pdf', 'First progress report - March 1'),
(17, 5, 1, 'Engagement Letter', 'documents/job005/engagement_letter.pdf', 'Formal engagement letter with client'),
(18, 5, 11, 'Market Analysis', 'documents/job005/market_analysis.pdf', 'Comprehensive market analysis report'),
(19, 5, 12, 'SWOT Analysis', 'documents/job005/swot_analysis.pdf', 'SWOT analysis document'),
(20, 5, 6, 'Progress Report 1', 'documents/job005/progress_report_1.pdf', 'First progress report - March 15');

-- Insert employee documents
INSERT INTO tbl_employee_documents (employee_document_id, employee_id, employee_document_name, employee_document_location) VALUES
(1, 1, 'Employment Contract', 'employees/emp001/contract.pdf'),
(2, 1, 'Resume', 'employees/emp001/resume.pdf'),
(3, 2, 13, 'Employment Contract', 'employees/emp002/contract.pdf', 'Employment contract and terms', NULL),
(4, 2, 15, 'CPA License', 'employees/emp002/cpa_license.pdf', 'Certified Public Accountant License', '2026-06-30'),
(5, 3, 13, 'Employment Contract', 'employees/emp003/contract.pdf', 'Employment contract and terms', NULL),
(6, 3, 14, 'Resume', 'employees/emp003/resume.pdf', 'Current resume', NULL),
(7, 4, 13, 'Employment Contract', 'employees/emp004/contract.pdf', 'Employment contract and terms', NULL),
(8, 4, 16, 'MBA Certificate', 'employees/emp004/mba_certificate.pdf', 'Master of Business Administration', NULL),
(9, 5, 13, 'Employment Contract', 'employees/emp005/contract.pdf', 'Employment contract and terms', NULL),
(10, 5, 15, 'PMP Certificate', 'employees/emp005/pmp_certificate.pdf', 'Project Management Professional Certificate', '2025-12-31'),
(11, 6, 13, 'Employment Contract', 'employees/emp006/contract.pdf', 'Employment contract and terms', NULL),
(12, 6, 14, 'Resume', 'employees/emp006/resume.pdf', 'Current resume', NULL),
(13, 7, 13, 'Employment Contract', 'employees/emp007/contract.pdf', 'Employment contract and terms', NULL),
(14, 7, 17, 'MBA Finance Certificate', 'employees/emp007/mba_finance.pdf', 'MBA with Finance specialization', NULL),
(15, 8, 13, 'Employment Contract', 'employees/emp008/contract.pdf', 'Employment contract and terms', NULL),
(16, 8, 14, 'Resume', 'employees/emp008/resume.pdf', 'Current resume', NULL),
(17, 9, 13, 'Employment Contract', 'employees/emp009/contract.pdf', 'Employment contract and terms', NULL),
(18, 9, 15, 'Six Sigma Certificate', 'employees/emp009/six_sigma.pdf', 'Six Sigma Black Belt Certification', '2026-03-15'),
(19, 10, 13, 'Employment Contract', 'employees/emp010/contract.pdf', 'Employment contract and terms', NULL),
(20, 10, 14, 'Resume', 'employees/emp010/resume.pdf', 'Current resume', NULL);

-- Insert job billing records
INSERT INTO tbl_job_billing (job_billing_id, job_id, client_id, invoice_id, invoice_status, invoice_raised_by, invoice_raised_date, invoice_reference_number) VALUES
(1, 1, '1', 'INV-2025-001', 'Paid', '1', '2025-02-15', 'REF-001'),
(2, 1, '1', 'INV-2025-008', 'Pending', '1', '2025-03-01', 'REF-008'),
(3, 2, '2', 'INV-2025-002', 'Paid', '1', '2025-02-20', 'REF-002'),
(4, 2, '2', 'INV-2025-009', 'Pending', '1', '2025-03-15', 'REF-009'),
(5, 3, '3', 'INV-2025-003', 'Paid', '2', '2025-02-15', 'REF-003'),
(6, 3, '3', 'INV-2025-010', 'Paid', '2', '2025-03-05', 'REF-010'),
(7, 4, '4', 'INV-2025-004', 'Paid', '2', '2025-02-25', 'REF-004'),
(8, 4, '4', 'INV-2025-011', 'Pending', '2', '2025-03-20', 'REF-011'),
(9, 5, '5', 'INV-2025-005', 'Paid', '3', '2025-03-05', 'REF-005'),
(10, 5, '5', 'INV-2025-012', 'Pending', '3', '2025-04-01', 'REF-012'),
(11, 6, '6', 'INV-2025-006', 'Paid', '3', '2025-03-10', 'REF-006'),
(12, 7, '7', 'INV-2025-007', 'Paid', '4', '2025-02-25', 'REF-007'),
(13, 8, '8', 'INV-2025-013', 'Paid', '4', '2025-03-15', 'REF-013'),
(14, 8, '8', 'INV-2025-014', 'Pending', '4', '2025-04-15', 'REF-014'),
(15, 9, '9', 'INV-2025-015', 'Pending', '5', '2025-03-25', 'REF-015'),
(16, 1, '1', 'INV-2025-016', 'Pending', '1', '2025-03-15', 'REF-016'),
(17, 'JOB002', '2025-04-01', 3500.00, 'Additional services - Tax Filing FY2024', 'Pending', NULL, 'INV-2025-017'),
(18, 'JOB003', '2025-03-20', 2500.00, 'Policy review services - HR Policy Update', 'Pending', NULL, 'INV-2025-018'),
(19, 'JOB004', '2025-04-05', 5000.00, 'Legal services - Merger Due Diligence', 'Pending', NULL, 'INV-2025-019'),
(20, 'JOB005', '2025-04-10', 4500.00, 'Additional consulting - Strategic Planning 2025', 'Pending', NULL, 'INV-2025-020');

-- Insert employee cost records
INSERT INTO tbl_employee_cost (employee_cost_id, employee_id, cost_per_hour, billing_per_hour, start_datetime, end_datetime, billing_status) VALUES
(1, '2', 100.00, 200.00, '2025-02-01 00:00:00', '2025-03-15 23:59:59', 'Active'),
(2, '6', 75.00, 150.00, '2025-02-01 00:00:00', '2025-03-15 23:59:59', 'Active'),
(3, '8', 60.00, 125.00, '2025-02-01 00:00:00', '2025-03-15 23:59:59', 'Active'),
(4, '4', 100.00, 200.00, '2025-02-15 00:00:00', '2025-04-10 23:59:59', 'Active'),
(5, '10', 85.00, 175.00, '2025-02-15 00:00:00', '2025-04-10 23:59:59', 'Active'),
(6, '12', 75.00, 150.00, '2025-02-15 00:00:00', '2025-04-10 23:59:59', 'Active'),
(7, '5', 100.00, 200.00, '2025-02-12 00:00:00', '2025-03-10 23:59:59', 'Active'),
(8, '14', 85.00, 175.00, '2025-02-12 00:00:00', '2025-03-10 23:59:59', 'Active'),
(9, '18', 90.00, 180.00, '2025-02-12 00:00:00', '2025-03-10 23:59:59', 'Active'),
(10, '9', 110.00, 225.00, '2025-02-20 00:00:00', '2025-04-30 23:59:59', 'Active'),
(11, '15', 95.00, 190.00, '2025-02-20 00:00:00', '2025-04-30 23:59:59', 'Active'),
(12, '16', 85.00, 175.00, '2025-02-20 00:00:00', '2025-04-30 23:59:59', 'Active'),
(13, '11', 100.00, 200.00, '2025-03-01 00:00:00', '2025-04-15 23:59:59', 'Active'),
(14, '7', 90.00, 185.00, '2025-03-01 00:00:00', '2025-04-15 23:59:59', 'Active'),
(15, '20', 70.00, 140.00, '2025-03-01 00:00:00', '2025-04-15 23:59:59', 'Active'),
(16, '13', 110.00, 225.00, '2025-03-10 00:00:00', '2025-04-10 23:59:59', 'Active'),
(17, '3', 100.00, 200.00, '2025-03-10 00:00:00', '2025-04-10 23:59:59', 'Active'),
(18, '19', 90.00, 180.00, '2025-03-10 00:00:00', '2025-04-10 23:59:59', 'Active'),
(19, 'JOB008', 17, 200.00, '2025-03-15', '2025-06-15'),
(20, 'JOB008', 1, 225.00, '2025-03-15', '2025-06-15');

-- Insert job comments
INSERT INTO tbl_job_comments (job_comment_id, commenter_id, comment_sequence_id, comment_text, create_datetime, update_datetime, job_status) VALUES
(1, 2, 1, 'Initial planning and client meetings completed', '2025-02-05 10:00:00', '2025-02-05 10:00:00', 1),
(2, 6, 2, 'Document gathering and preliminary review in progress', '2025-02-08 14:30:00', '2025-02-08 14:30:00', 1),
(3, 8, 3, 'Assistance with document organization work in progress', '2025-02-10 11:45:00', '2025-02-10 11:45:00', 1),
(4, 2, 4, 'Detailed financial statement analysis underway', '2025-02-25 13:20:00', '2025-02-25 13:20:00', 2),
(5, 6, 5, 'Testing of financial controls completed', '2025-02-28 09:45:00', '2025-02-28 09:45:00', 1),
(6, 8, 6, 'Supporting documentation verification in progress', '2025-03-01 11:30:00', '2025-03-01 11:30:00', 1),
(7, 4, 1, 'Initial tax planning meeting completed', '2025-02-18 10:15:00', '2025-02-18 10:15:00', 2),
(8, 10, 2, 'Tax documentation review in progress', '2025-02-19 14:20:00', '2025-02-19 14:20:00', 2),
(9, 12, 3, 'Financial data compilation in progress', '2025-02-20 10:30:00', '2025-02-20 10:30:00', 2),
(10, 4, 4, 'Tax strategy development underway', '2025-03-10 15:45:00', '2025-03-10 15:45:00', 2),
(11, 10, 5, 'Detailed tax calculations in progress', '2025-03-12 11:15:00', '2025-03-12 11:15:00', 2),
(12, 5, 6, 'Policy gap analysis complete', '2025-02-22 14:20:00', '2025-02-22 14:20:00', 3),
(13, 14, 7, 'Stakeholder interviews in progress', '2025-02-28 09:15:00', '2025-02-28 09:15:00', 3),
(14, 18, 8, 'Legal framework review completed', '2025-03-05 16:30:00', '2025-03-05 16:30:00', 3),
(15, 11, 9, 'Market research completed', '2025-03-15 14:20:00', '2025-03-15 14:20:00', 5),
(16, 13, 10, 'Initial compliance review completed', '2025-03-25 10:30:00', '2025-03-25 10:30:00', 7),
(17, 17, 11, 'Software requirements gathering completed', '2025-03-30 13:45:00', '2025-03-30 13:45:00', 8),
(18, 6, 18, 5, 900.00, '2025-03-05', 'Legal review of draft policies'),
(19, 7, 9, 16, 3600.00, '2025-02-22', 'Initial due diligence planning'),
(20, 7, 15, 18, 2700.00, '2025-02-24', 'Financial records compilation');

-- Insert client_companies relationships
INSERT INTO tbl_client_companies (client_company_id, company_id, client_id) VALUES
(1, 1, 2),
(2, 2, 3),
(3, 3, 4),
(4, 4, 6),
(5, 5, 5);

-- Insert client contact persons
INSERT INTO tbl_client_contactpersons (contactperson_id, client_id, company_id, contactperson_name, contactperson_email, contactperson_mobile_no, isActive) VALUES
(1, 2, 1, 'Sarah Chen', 'sarah@techinnovations.com', '555-1002', 1),
(2, 3, 2, 'James Smith', 'james@smithpartners.com', '555-1003', 1),
(3, 4, 3, 'Elena Garcia', 'elena@garciaholdings.com', '555-1004', 1),
(4, 6, 4, 'David Wong', 'david@horizonhealth.org', '555-1006', 1),
(5, 5, 5, 'Michael Peterson', 'michael@email.com', '555-1005', 1);

-- Insert job receipt info
INSERT INTO tbl_job_receipt_info (job_receipt_id, job_id, receipt_no, file_reference_no, assessment_year, job_category_id, job_receipt_description) VALUES
(1, 1, 'REC001', 'FR001', '2025-26', 1, 'Financial audit receipt'),
(2, 2, 'REC002', 'FR002', '2024-25', 2, 'Tax filing receipt'),
(3, 3, 'REC003', 'FR003', NULL, 5, 'HR policy update receipt'),
(4, 4, 'REC004', 'FR004', NULL, 3, 'Due diligence receipt'),
(5, 5, 'REC005', 'FR005', '2025-26', 4, 'Strategic planning receipt');

-- Insert employee reporting structure
INSERT INTO tbl_employee_reporting (employee_reporting_id, employee_id, manager_id, reporting_start_date, reporting_end_date) VALUES
(1, 2, 1, '2024-01-05', NULL),
(2, 3, 1, '2024-01-10', NULL),
(3, 4, 2, '2024-01-15', NULL),
(4, 5, 2, '2024-01-20', NULL),
(5, 6, 4, '2024-01-25', NULL);

-- Insert employee details
INSERT INTO tbl_employee_details (employee_detail_id, employee_id, employee_document_id, employee_document_name, employee_document_location) VALUES
(1, 1, 1, 'Personal Information', 'employees/emp001/personal_info.pdf'),
(2, 2, 3, 'Personal Information', 'employees/emp002/personal_info.pdf'),
(3, 3, 5, 'Personal Information', 'employees/emp003/personal_info.pdf'),
(4, 4, 7, 'Personal Information', 'employees/emp004/personal_info.pdf'),
(5, 5, 9, 'Personal Information', 'employees/emp005/personal_info.pdf');

-- Final completion message
SELECT 'Database seed data generation completed successfully.' AS message;
