/**
 * Work Management Database CRUD Operations
 * Main router for all database table operations
 * Created: 2025-07-25
 */

const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Utility function for handling database operations
const handleDbOperation = (req, res, operation, successMessage) => {
  const db = req.app.locals.db;
  
  operation(db, (err, result) => {
    if (err) {
      console.error('Database operation error:', err);
      return res.status(500).json({ 
        error: 'Database operation failed', 
        details: err.message 
      });
    }
    
    res.json({
      success: true,
      message: successMessage,
      data: result
    });
  });
};

// =============================
// USERS_MASTER TABLE ROUTES
// =============================

// GET all users
router.get('/users', (req, res) => {
  const db = req.app.locals.db;
  const sql = `SELECT user_id, mobile_number, email, first_name, last_name, 
               is_active, created_at, updated_at FROM users_master ORDER BY created_at DESC`;
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, data: rows });
  });
});

// GET user by ID
router.get('/users/:id', (req, res) => {
  const db = req.app.locals.db;
  const sql = `SELECT user_id, mobile_number, email, first_name, last_name, 
               is_active, created_at, updated_at FROM users_master WHERE user_id = ?`;
  
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ success: true, data: row });
  });
});

// POST create new user
router.post('/users', [
  body('mobile_number').notEmpty().withMessage('Mobile number is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('first_name').notEmpty().withMessage('First name is required'),
  body('last_name').notEmpty().withMessage('Last name is required')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const db = req.app.locals.db;
  const bcrypt = require('bcryptjs');
  const { mobile_number, password, email, first_name, last_name, is_active = 1 } = req.body;
  
  // Hash password
  const password_hash = bcrypt.hashSync(password, 10);
  
  const sql = `INSERT INTO users_master (mobile_number, password_hash, email, first_name, last_name, is_active)
               VALUES (?, ?, ?, ?, ?, ?)`;
  
  db.run(sql, [mobile_number, password_hash, email, first_name, last_name, is_active], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ 
      success: true, 
      message: 'User created successfully', 
      data: { user_id: this.lastID }
    });
  });
});

// PUT update user
router.put('/users/:id', [
  body('mobile_number').optional().notEmpty().withMessage('Mobile number cannot be empty'),
  body('email').optional().isEmail().withMessage('Valid email is required'),
  body('first_name').optional().notEmpty().withMessage('First name cannot be empty'),
  body('last_name').optional().notEmpty().withMessage('Last name cannot be empty')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const db = req.app.locals.db;
  const { mobile_number, email, first_name, last_name, is_active } = req.body;
  
  const sql = `UPDATE users_master SET 
               mobile_number = COALESCE(?, mobile_number),
               email = COALESCE(?, email),
               first_name = COALESCE(?, first_name),
               last_name = COALESCE(?, last_name),
               is_active = COALESCE(?, is_active),
               updated_at = CURRENT_TIMESTAMP
               WHERE user_id = ?`;
  
  db.run(sql, [mobile_number, email, first_name, last_name, is_active, req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ success: true, message: 'User updated successfully' });
  });
});

// DELETE user
router.delete('/users/:id', (req, res) => {
  const db = req.app.locals.db;
  const sql = `DELETE FROM users_master WHERE user_id = ?`;
  
  db.run(sql, [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ success: true, message: 'User deleted successfully' });
  });
});

// =============================
// ROLES_MASTER TABLE ROUTES
// =============================

// GET all roles
router.get('/roles', (req, res) => {
  const db = req.app.locals.db;
  const sql = `SELECT * FROM roles_master ORDER BY created_at DESC`;
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, data: rows });
  });
});

// GET role by ID
router.get('/roles/:id', (req, res) => {
  const db = req.app.locals.db;
  const sql = `SELECT * FROM roles_master WHERE role_id = ?`;
  
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Role not found' });
    }
    res.json({ success: true, data: row });
  });
});

// POST create new role
router.post('/roles', [
  body('name').notEmpty().withMessage('Role name is required'),
  body('description').optional()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const db = req.app.locals.db;
  const { name, description } = req.body;
  
  const sql = `INSERT INTO roles_master (name, description) VALUES (?, ?)`;
  
  db.run(sql, [name, description], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ 
      success: true, 
      message: 'Role created successfully', 
      data: { role_id: this.lastID }
    });
  });
});

// PUT update role
router.put('/roles/:id', [
  body('name').optional().notEmpty().withMessage('Role name cannot be empty'),
  body('description').optional()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const db = req.app.locals.db;
  const { name, description } = req.body;
  
  const sql = `UPDATE roles_master SET 
               name = COALESCE(?, name),
               description = COALESCE(?, description),
               updated_at = CURRENT_TIMESTAMP
               WHERE role_id = ?`;
  
  db.run(sql, [name, description, req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Role not found' });
    }
    res.json({ success: true, message: 'Role updated successfully' });
  });
});

// DELETE role
router.delete('/roles/:id', (req, res) => {
  const db = req.app.locals.db;
  const sql = `DELETE FROM roles_master WHERE role_id = ?`;
  
  db.run(sql, [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Role not found' });
    }
    res.json({ success: true, message: 'Role deleted successfully' });
  });
});

// =============================
// PERMISSIONS_MASTER TABLE ROUTES
// =============================

// GET all permissions
router.get('/permissions', (req, res) => {
  const db = req.app.locals.db;
  const sql = `SELECT * FROM permissions_master ORDER BY created_at DESC`;
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, data: rows });
  });
});

// GET permission by ID
router.get('/permissions/:id', (req, res) => {
  const db = req.app.locals.db;
  const sql = `SELECT * FROM permissions_master WHERE permission_id = ?`;
  
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Permission not found' });
    }
    res.json({ success: true, data: row });
  });
});

// POST create new permission
router.post('/permissions', [
  body('name').notEmpty().withMessage('Permission name is required'),
  body('description').optional()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const db = req.app.locals.db;
  const { name, description } = req.body;
  
  const sql = `INSERT INTO permissions_master (name, description) VALUES (?, ?)`;
  
  db.run(sql, [name, description], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ 
      success: true, 
      message: 'Permission created successfully', 
      data: { permission_id: this.lastID }
    });
  });
});

// PUT update permission
router.put('/permissions/:id', [
  body('name').optional().notEmpty().withMessage('Permission name cannot be empty'),
  body('description').optional()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const db = req.app.locals.db;
  const { name, description } = req.body;
  
  const sql = `UPDATE permissions_master SET 
               name = COALESCE(?, name),
               description = COALESCE(?, description),
               updated_at = CURRENT_TIMESTAMP
               WHERE permission_id = ?`;
  
  db.run(sql, [name, description, req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Permission not found' });
    }
    res.json({ success: true, message: 'Permission updated successfully' });
  });
});

// DELETE permission
router.delete('/permissions/:id', (req, res) => {
  const db = req.app.locals.db;
  const sql = `DELETE FROM permissions_master WHERE permission_id = ?`;
  
  db.run(sql, [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Permission not found' });
    }
    res.json({ success: true, message: 'Permission deleted successfully' });
  });
});

module.exports = router;