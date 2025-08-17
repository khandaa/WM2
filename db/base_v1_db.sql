-- EmployDEX Base Platform - Database Initialization Script
-- Created: 2025-06-26

-- Enable foreign keys
PRAGMA foreign_keys = ON;
-- Drop existing tables if they exist
DROP TABLE IF EXISTS base_master_users;
DROP TABLE IF EXISTS base_master_roles;
DROP TABLE IF EXISTS base_master_permissions;
DROP TABLE IF EXISTS base_role_user_link;
DROP TABLE IF EXISTS base_role_permission_link;
DROP TABLE IF EXISTS base_activity_logs;
DROP TABLE IF EXISTS base_payment_qr;
DROP TABLE IF EXISTS base_payment_transactions;
DROP TABLE IF EXISTS base_feature_toggle;



-- Create users table (master data)
CREATE TABLE IF NOT EXISTS base_master_users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_email TEXT UNIQUE NOT NULL,
    mobile_number TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    is_active BOOLEAN DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create roles table (master data)
CREATE TABLE IF NOT EXISTS base_master_roles (
    role_id INTEGER PRIMARY KEY AUTOINCREMENT,
    role_name TEXT UNIQUE NOT NULL,
    role_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create permissions table (master data)
CREATE TABLE IF NOT EXISTS base_master_permissions (
    permission_id INTEGER PRIMARY KEY AUTOINCREMENT,
    permission_name TEXT UNIQUE NOT NULL,
    permission_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create user_roles junction table (transaction data)
CREATE TABLE IF NOT EXISTS base_role_user_link (
    user_role_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    role_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES base_master_users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES base_master_roles(role_id) ON DELETE CASCADE
);

-- Create role_permissions junction table (transaction data)
CREATE TABLE IF NOT EXISTS base_role_permission_link (
    role_permission_id INTEGER PRIMARY KEY AUTOINCREMENT,
    role_id INTEGER NOT NULL,
    permission_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(role_id, permission_id),
    FOREIGN KEY (role_id) REFERENCES base_master_roles(role_id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES base_master_permissions(permission_id) ON DELETE CASCADE
);

-- Create activity_logs table (transaction data)
CREATE TABLE IF NOT EXISTS base_activity_logs (
    activity_log_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    user_action TEXT NOT NULL,
    activity_details TEXT,
    user_ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES base_master_users(user_id) ON DELETE SET NULL
);


-- Create updated QR codes table
CREATE TABLE IF NOT EXISTS base_payment_qr (
    payment_qr_code_id INTEGER PRIMARY KEY AUTOINCREMENT,
    payment_qr_name VARCHAR(100) NOT NULL,
    payment_description TEXT,
    payment_type VARCHAR(50) NOT NULL, -- e.g., 'UPI', 'BANK', 'WALLET'
    payment_qr_image_location VARCHAR(255),   -- File system path to the QR code image
    isActive BOOLEAN DEFAULT 0, -- Only one QR code can be active at a time
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on payment type for faster lookups
CREATE INDEX IF NOT EXISTS idx_payment_type ON base_payment_qr(payment_type);


CREATE TABLE base_payment_transactions (
    payment_transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
    transaction_ref VARCHAR(100) NOT NULL UNIQUE, -- Unique reference number for the transaction
    user_id INTEGER, -- User who initiated the transaction
    verified BOOLEAN DEFAULT 0,
    payment_amount number,
    payment_currency text, 
    payment_source text, 
    transaction_status text,
    payment_external_reference text,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
)

-- Create index on transaction reference for faster lookups
CREATE INDEX IF NOT EXISTS idx_transaction_reference ON base_payment_transactions(transaction_reference);

-- Create index on transaction date for reporting
CREATE INDEX IF NOT EXISTS idx_transaction_date ON base_payment_transactions(transaction_date);

-- Create index on payment_status for filtering
CREATE INDEX IF NOT EXISTS idx_transaction_status ON base_payment_transactions(payment_status);


-- Migration: Add base_feature_toggle table
CREATE TABLE IF NOT EXISTS base_feature_toggle (
    feature_toggle_id INTEGER PRIMARY KEY AUTOINCREMENT,
    feature_name TEXT UNIQUE NOT NULL,
    is_enabled INTEGER NOT NULL DEFAULT 0,
    feature_description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);


