/**
 * Work Management Database CRUD Operations - Client and Company Related Tables
 * Created: 2025-07-25
 */

const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// =============================
// TBL_MASTER_CLIENTS TABLE ROUTES
// =============================

// GET all clients
router.get('/clients', (req, res) => {
  const db = req.app.locals.db;
  const sql = `SELECT * FROM tbl_master_clients ORDER BY client_id DESC`;
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, data: rows });
  });
});

// GET client by ID
router.get('/clients/:id', (req, res) => {
  const db = req.app.locals.db;
  const sql = `SELECT * FROM tbl_master_clients WHERE client_id = ?`;
  
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.json({ success: true, data: row });
  });
});

// POST create new client
router.post('/clients', [
  body('client_name').notEmpty().withMessage('Client name is required'),
  body('group_name').optional(),
  body('client_status').optional(),
  body('client_owner_name').optional(),
  body('client_owner_email').optional().isEmail().withMessage('Valid email required'),
  body('client_owner_mobile').optional(),
  body('created_by').optional()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const db = req.app.locals.db;
  const {
    client_name, group_name, client_status, client_owner_name,
    client_owner_email, client_owner_mobile, created_by
  } = req.body;
  
  const currentDate = new Date().toISOString().split('T')[0];
  
  const sql = `INSERT INTO tbl_master_clients (
    client_name, group_name, client_status, client_owner_name,
    client_owner_email, client_owner_mobile, created_by,
    create_date, last_updated_by, last_update_date
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
  db.run(sql, [
    client_name, group_name, client_status, client_owner_name,
    client_owner_email, client_owner_mobile, created_by,
    currentDate, created_by, currentDate
  ], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ 
      success: true, 
      message: 'Client created successfully', 
      data: { client_id: this.lastID }
    });
  });
});

// PUT update client
router.put('/clients/:id', [
  body('client_name').optional().notEmpty().withMessage('Client name cannot be empty'),
  body('client_owner_email').optional().isEmail().withMessage('Valid email required')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const db = req.app.locals.db;
  const {
    client_name, group_name, client_status, client_owner_name,
    client_owner_email, client_owner_mobile, last_updated_by
  } = req.body;
  
  const currentDate = new Date().toISOString().split('T')[0];
  
  const sql = `UPDATE tbl_master_clients SET 
               client_name = COALESCE(?, client_name),
               group_name = COALESCE(?, group_name),
               client_status = COALESCE(?, client_status),
               client_owner_name = COALESCE(?, client_owner_name),
               client_owner_email = COALESCE(?, client_owner_email),
               client_owner_mobile = COALESCE(?, client_owner_mobile),
               last_updated_by = COALESCE(?, last_updated_by),
               last_update_date = ?
               WHERE client_id = ?`;
  
  db.run(sql, [
    client_name, group_name, client_status, client_owner_name,
    client_owner_email, client_owner_mobile, last_updated_by,
    currentDate, req.params.id
  ], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.json({ success: true, message: 'Client updated successfully' });
  });
});

// DELETE client
router.delete('/clients/:id', (req, res) => {
  const db = req.app.locals.db;
  const sql = `DELETE FROM tbl_master_clients WHERE client_id = ?`;
  
  db.run(sql, [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.json({ success: true, message: 'Client deleted successfully' });
  });
});

// =============================
// TBL_MASTER_COMPANIES TABLE ROUTES
// =============================

// GET all companies
router.get('/companies', (req, res) => {
  const db = req.app.locals.db;
  const sql = `SELECT * FROM tbl_master_companies ORDER BY company_id DESC`;
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, data: rows });
  });
});

// GET company by ID
router.get('/companies/:id', (req, res) => {
  const db = req.app.locals.db;
  const sql = `SELECT * FROM tbl_master_companies WHERE company_id = ?`;
  
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Company not found' });
    }
    res.json({ success: true, data: row });
  });
});

// POST create new company
router.post('/companies', [
  body('company_name').notEmpty().withMessage('Company name is required'),
  body('company_website').optional().isURL().withMessage('Valid website URL required'),
  body('company_tax_identifier_name').optional(),
  body('company_tax_identifier_value').optional()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const db = req.app.locals.db;
  const {
    company_name, company_website, company_tax_identifier_name,
    company_tax_identifier_value
  } = req.body;
  
  const sql = `INSERT INTO tbl_master_companies (
    company_name, company_website, company_tax_identifier_name,
    company_tax_identifier_value
  ) VALUES (?, ?, ?, ?)`;
  
  db.run(sql, [
    company_name, company_website, company_tax_identifier_name,
    company_tax_identifier_value
  ], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ 
      success: true, 
      message: 'Company created successfully', 
      data: { company_id: this.lastID }
    });
  });
});

// PUT update company
router.put('/companies/:id', [
  body('company_name').optional().notEmpty().withMessage('Company name cannot be empty'),
  body('company_website').optional().isURL().withMessage('Valid website URL required')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const db = req.app.locals.db;
  const {
    company_name, company_website, company_tax_identifier_name,
    company_tax_identifier_value
  } = req.body;
  
  const sql = `UPDATE tbl_master_companies SET 
               company_name = COALESCE(?, company_name),
               company_website = COALESCE(?, company_website),
               company_tax_identifier_name = COALESCE(?, company_tax_identifier_name),
               company_tax_identifier_value = COALESCE(?, company_tax_identifier_value)
               WHERE company_id = ?`;
  
  db.run(sql, [
    company_name, company_website, company_tax_identifier_name,
    company_tax_identifier_value, req.params.id
  ], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Company not found' });
    }
    res.json({ success: true, message: 'Company updated successfully' });
  });
});

// DELETE company
router.delete('/companies/:id', (req, res) => {
  const db = req.app.locals.db;
  const sql = `DELETE FROM tbl_master_companies WHERE company_id = ?`;
  
  db.run(sql, [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Company not found' });
    }
    res.json({ success: true, message: 'Company deleted successfully' });
  });
});

// =============================
// TBL_CLIENT_COMPANIES TABLE ROUTES
// =============================

// GET all client-company relationships
router.get('/client-companies', (req, res) => {
  const db = req.app.locals.db;
  const sql = `SELECT cc.*, c.client_name, comp.company_name
               FROM tbl_client_companies cc
               LEFT JOIN tbl_master_clients c ON cc.client_id = c.client_id
               LEFT JOIN tbl_master_companies comp ON cc.company_id = comp.company_id
               ORDER BY cc.client_company_id DESC`;
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, data: rows });
  });
});

// GET client-company relationship by ID
router.get('/client-companies/:id', (req, res) => {
  const db = req.app.locals.db;
  const sql = `SELECT cc.*, c.client_name, comp.company_name
               FROM tbl_client_companies cc
               LEFT JOIN tbl_master_clients c ON cc.client_id = c.client_id
               LEFT JOIN tbl_master_companies comp ON cc.company_id = comp.company_id
               WHERE cc.client_company_id = ?`;
  
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Client-company relationship not found' });
    }
    res.json({ success: true, data: row });
  });
});

// POST create new client-company relationship
router.post('/client-companies', [
  body('company_id').isInt().withMessage('Company ID is required and must be an integer'),
  body('client_id').isInt().withMessage('Client ID is required and must be an integer')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const db = req.app.locals.db;
  const { company_id, client_id } = req.body;
  
  const sql = `INSERT INTO tbl_client_companies (company_id, client_id) VALUES (?, ?)`;
  
  db.run(sql, [company_id, client_id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ 
      success: true, 
      message: 'Client-company relationship created successfully', 
      data: { client_company_id: this.lastID }
    });
  });
});

// DELETE client-company relationship
router.delete('/client-companies/:id', (req, res) => {
  const db = req.app.locals.db;
  const sql = `DELETE FROM tbl_client_companies WHERE client_company_id = ?`;
  
  db.run(sql, [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Client-company relationship not found' });
    }
    res.json({ success: true, message: 'Client-company relationship deleted successfully' });
  });
});

// =============================
// TBL_CLIENT_CONTACTPERSONS TABLE ROUTES
// =============================

// GET all client contact persons
router.get('/client-contacts', (req, res) => {
  const db = req.app.locals.db;
  const sql = `SELECT cp.*, c.client_name, comp.company_name
               FROM tbl_client_contactpersons cp
               LEFT JOIN tbl_master_clients c ON cp.client_id = c.client_id
               LEFT JOIN tbl_master_companies comp ON cp.company_id = comp.company_id
               ORDER BY cp.contactperson_id DESC`;
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, data: rows });
  });
});

// GET client contact person by ID
router.get('/client-contacts/:id', (req, res) => {
  const db = req.app.locals.db;
  const sql = `SELECT cp.*, c.client_name, comp.company_name
               FROM tbl_client_contactpersons cp
               LEFT JOIN tbl_master_clients c ON cp.client_id = c.client_id
               LEFT JOIN tbl_master_companies comp ON cp.company_id = comp.company_id
               WHERE cp.contactperson_id = ?`;
  
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Client contact person not found' });
    }
    res.json({ success: true, data: row });
  });
});

// POST create new client contact person
router.post('/client-contacts', [
  body('client_id').isInt().withMessage('Client ID is required and must be an integer'),
  body('company_id').optional().isInt().withMessage('Company ID must be an integer'),
  body('contactperson_name').notEmpty().withMessage('Contact person name is required'),
  body('contactperson_email').optional().isEmail().withMessage('Valid email required'),
  body('contactperson_mobile_no').optional()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const db = req.app.locals.db;
  const {
    client_id, company_id, contactperson_name, contactperson_email,
    contactperson_mobile_no, isActive = 1
  } = req.body;
  
  const sql = `INSERT INTO tbl_client_contactpersons (
    client_id, company_id, contactperson_name, contactperson_email,
    contactperson_mobile_no, isActive
  ) VALUES (?, ?, ?, ?, ?, ?)`;
  
  db.run(sql, [
    client_id, company_id, contactperson_name, contactperson_email,
    contactperson_mobile_no, isActive
  ], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ 
      success: true, 
      message: 'Client contact person created successfully', 
      data: { contactperson_id: this.lastID }
    });
  });
});

// PUT update client contact person
router.put('/client-contacts/:id', [
  body('contactperson_name').optional().notEmpty().withMessage('Contact person name cannot be empty'),
  body('contactperson_email').optional().isEmail().withMessage('Valid email required'),
  body('client_id').optional().isInt().withMessage('Client ID must be an integer'),
  body('company_id').optional().isInt().withMessage('Company ID must be an integer')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const db = req.app.locals.db;
  const {
    client_id, company_id, contactperson_name, contactperson_email,
    contactperson_mobile_no, isActive
  } = req.body;
  
  const sql = `UPDATE tbl_client_contactpersons SET 
               client_id = COALESCE(?, client_id),
               company_id = COALESCE(?, company_id),
               contactperson_name = COALESCE(?, contactperson_name),
               contactperson_email = COALESCE(?, contactperson_email),
               contactperson_mobile_no = COALESCE(?, contactperson_mobile_no),
               isActive = COALESCE(?, isActive)
               WHERE contactperson_id = ?`;
  
  db.run(sql, [
    client_id, company_id, contactperson_name, contactperson_email,
    contactperson_mobile_no, isActive, req.params.id
  ], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Client contact person not found' });
    }
    res.json({ success: true, message: 'Client contact person updated successfully' });
  });
});

// DELETE client contact person
router.delete('/client-contacts/:id', (req, res) => {
  const db = req.app.locals.db;
  const sql = `DELETE FROM tbl_client_contactpersons WHERE contactperson_id = ?`;
  
  db.run(sql, [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Client contact person not found' });
    }
    res.json({ success: true, message: 'Client contact person deleted successfully' });
  });
});

module.exports = router;