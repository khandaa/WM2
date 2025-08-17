

-- Insert default roles
INSERT INTO base_master_roles (name, description) VALUES 
    ('Admin', 'Administrator with full system access'),
    ('User', 'Standard user with limited access');

-- Insert default permissions
INSERT INTO base_master_permissions (name, description) VALUES
    ('user_view', 'Can view user details'),
    ('user_create', 'Can create users'),
    ('user_edit', 'Can edit user details'),
    ('user_delete', 'Can delete users'),
    ('role_view', 'Can view roles'),
    ('role_create', 'Can create roles'),
    ('role_edit', 'Can edit roles'),
    ('role_delete', 'Can delete roles'),
    ('permission_view', 'Can view permissions'),
    ('permission_create', 'Can view permissions'),
    ('permission_edit', 'Can view permissions'),
    ('permission_delete', 'Can view permissions'),
   ('feature_toggle_view', 'View feature toggles'),
   ('feature_toggle_manage', 'Create, edit, or delete feature toggles')
    ('permission_assign', 'Can assign permissions to roles');

-- Assign all permissions to Admin role
INSERT INTO base_role_permission_link (role_id, permission_id)
SELECT 
    (SELECT role_id FROM base_master_roles WHERE name = 'Admin'), 
    permission_id 
FROM base_master_permissions;

-- Assign basic permissions to User role
INSERT INTO base_role_permission_link (role_id, permission_id)
SELECT 
    (SELECT role_id FROM base_master_roles WHERE name = 'User'), 
    permission_id 
FROM base_master_permissions 
WHERE name IN ('user_view');

-- Insert default admin user with password Admin@123 (admin/admin as per requirements)
INSERT INTO base_master_users (mobile_number, email, password_hash, first_name, last_name) 
VALUES ('9999999999', 'admin@employdex.com', '$2a$10$HCJ5Yd0YR1P4TGPJOyyAWe6jVXnjYQLTP8EuoNRPnT4l4XzUKCNbS', 'Admin', 'User');
-- Note: password_hash is for 'admin' using bcrypt

-- Assign Admin role to the admin user
INSERT INTO base_role_user_link (user_id, role_id)
VALUES (
    (SELECT user_id FROM base_master_users WHERE email = 'admin@employdex.com'),
    (SELECT role_id FROM base_master_roles WHERE name = 'Admin')
);


-- Add payment feature to feature_toggles table
-- This allows the payment integration to be toggled on/off
INSERT OR IGNORE INTO feature_toggles (feature_name, description, is_enabled, feature)
VALUES ('payment_integration', 'Enable payment integration with QR code support', 0, 'payment');

-- Sample data for payment_qr_codes
INSERT OR IGNORE INTO payment_qr_codes (payment_name, payment_description, qr_code_image, qr_code_path, payment_type, is_active, created_by)
VALUES 
('Default UPI QR', 'Default UPI payment QR code', X'00112233', '/uploads/qr/default_upi.png', 'UPI', 1, 1),
('Corporate Account QR', 'Corporate bank account QR code', X'44556677', '/uploads/qr/corporate.png', 'BANK', 0, 1);

-- Sample data for payment_transactions
INSERT OR IGNORE INTO payment_transactions (transaction_reference, amount, currency, payment_status, qr_code_id, user_id, transaction_notes)
VALUES 
('TXN123456789', 1000.00, 'INR', 'COMPLETED', 1, 2, 'Test transaction'),
('TXN987654321', 1500.50, 'INR', 'PENDING', 1, 3, 'Awaiting confirmation'),
('TXN567890123', 750.25, 'INR', 'FAILED', 2, 4, 'Payment gateway error');

