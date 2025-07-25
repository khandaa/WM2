/**
 * Work Management Database CRUD Operations - Miscellaneous Tables
 * Created: 2025-07-25
 */

const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// =============================
// TBL_MASTER_DOCUMENT_TYPES TABLE ROUTES
// =============================

// GET all document types
router.get('/document-types', (req, res) => {
  const db = req.app.locals.db;
  const sql = `SELECT * FROM tbl_master_document_types ORDER BY document_id DESC`;
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, data: rows });
  });
});

// GET document type by ID
router.get('/document-types/:id', (req, res) => {
  const db = req.app.locals.db;
  const sql = `SELECT * FROM tbl_master_document_types WHERE document_id = ?`;
  
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Document type not found' });
    }
    res.json({ success: true, data: row });
  });
});

// POST create new document type
router.post('/document-types', [
  body('document_type').notEmpty().withMessage('Document type is required'),
  body('document_desc').optional(),
  body('document_category').optional()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const db = req.app.locals.db;
  const { document_type, document_desc, document_category } = req.body;
  
  const sql = `INSERT INTO tbl_master_document_types (document_type, document_desc, document_category) 
               VALUES (?, ?, ?)`;
  
  db.run(sql, [document_type, document_desc, document_category], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ 
      success: true, 
      message: 'Document type created successfully', 
      data: { document_id: this.lastID }
    });
  });
});

// PUT update document type
router.put('/document-types/:id', [
  body('document_type').optional().notEmpty().withMessage('Document type cannot be empty')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const db = req.app.locals.db;
  const { document_type, document_desc, document_category } = req.body;
  
  const sql = `UPDATE tbl_master_document_types SET 
               document_type = COALESCE(?, document_type),
               document_desc = COALESCE(?, document_desc),
               document_category = COALESCE(?, document_category)
               WHERE document_id = ?`;
  
  db.run(sql, [document_type, document_desc, document_category, req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Document type not found' });
    }
    res.json({ success: true, message: 'Document type updated successfully' });
  });
});

// DELETE document type
router.delete('/document-types/:id', (req, res) => {
  const db = req.app.locals.db;
  const sql = `DELETE FROM tbl_master_document_types WHERE document_id = ?`;
  
  db.run(sql, [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Document type not found' });
    }
    res.json({ success: true, message: 'Document type deleted successfully' });
  });
});

// =============================
// TBL_EMPLOYEE_DOCUMENTS TABLE ROUTES
// =============================

// GET all employee documents
router.get('/employee-documents', (req, res) => {
  const db = req.app.locals.db;
  const sql = `SELECT ed.*, e.employee_name
               FROM tbl_employee_documents ed
               LEFT JOIN tbl_master_employees e ON ed.employee_id = e.employee_id
               ORDER BY ed.employee_document_id DESC`;
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, data: rows });
  });
});

// GET employee document by ID
router.get('/employee-documents/:id', (req, res) => {
  const db = req.app.locals.db;
  const sql = `SELECT ed.*, e.employee_name
               FROM tbl_employee_documents ed
               LEFT JOIN tbl_master_employees e ON ed.employee_id = e.employee_id
               WHERE ed.employee_document_id = ?`;
  
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Employee document not found' });
    }
    res.json({ success: true, data: row });
  });
});

// POST create new employee document
router.post('/employee-documents', [
  body('employee_id').isInt().withMessage('Employee ID is required and must be an integer'),
  body('employee_document_name').notEmpty().withMessage('Document name is required'),
  body('employee_document_location').notEmpty().withMessage('Document location is required')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const db = req.app.locals.db;
  const { employee_id, employee_document_name, employee_document_location } = req.body;
  
  const sql = `INSERT INTO tbl_employee_documents (employee_id, employee_document_name, employee_document_location) 
               VALUES (?, ?, ?)`;
  
  db.run(sql, [employee_id, employee_document_name, employee_document_location], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ 
      success: true, 
      message: 'Employee document created successfully', 
      data: { employee_document_id: this.lastID }
    });
  });
});

// PUT update employee document
router.put('/employee-documents/:id', [
  body('employee_id').optional().isInt().withMessage('Employee ID must be an integer'),
  body('employee_document_name').optional().notEmpty().withMessage('Document name cannot be empty'),
  body('employee_document_location').optional().notEmpty().withMessage('Document location cannot be empty')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const db = req.app.locals.db;
  const { employee_id, employee_document_name, employee_document_location } = req.body;
  
  const sql = `UPDATE tbl_employee_documents SET 
               employee_id = COALESCE(?, employee_id),
               employee_document_name = COALESCE(?, employee_document_name),
               employee_document_location = COALESCE(?, employee_document_location)
               WHERE employee_document_id = ?`;
  
  db.run(sql, [employee_id, employee_document_name, employee_document_location, req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Employee document not found' });
    }
    res.json({ success: true, message: 'Employee document updated successfully' });
  });
});

// DELETE employee document
router.delete('/employee-documents/:id', (req, res) => {
  const db = req.app.locals.db;
  const sql = `DELETE FROM tbl_employee_documents WHERE employee_document_id = ?`;
  
  db.run(sql, [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Employee document not found' });
    }
    res.json({ success: true, message: 'Employee document deleted successfully' });
  });
});

// =============================
// TBL_JOB_DOCUMENTS TABLE ROUTES
// =============================

// GET all job documents
router.get('/job-documents', (req, res) => {
  const db = req.app.locals.db;
  const sql = `SELECT jd.*, j.job_name, dt.document_type
               FROM tbl_job_documents jd
               LEFT JOIN tbl_master_jobs j ON jd.job_id = j.job_id
               LEFT JOIN tbl_master_document_types dt ON jd.document_type_id = dt.document_id
               ORDER BY jd.job_document_id DESC`;
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, data: rows });
  });
});

// GET job document by ID
router.get('/job-documents/:id', (req, res) => {
  const db = req.app.locals.db;
  const sql = `SELECT jd.*, j.job_name, dt.document_type
               FROM tbl_job_documents jd
               LEFT JOIN tbl_master_jobs j ON jd.job_id = j.job_id
               LEFT JOIN tbl_master_document_types dt ON jd.document_type_id = dt.document_id
               WHERE jd.job_document_id = ?`;
  
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Job document not found' });
    }
    res.json({ success: true, data: row });
  });
});

// POST create new job document
router.post('/job-documents', [
  body('job_id').notEmpty().withMessage('Job ID is required'),
  body('document_type_id').isInt().withMessage('Document type ID is required and must be an integer'),
  body('document_name').notEmpty().withMessage('Document name is required'),
  body('document_location').notEmpty().withMessage('Document location is required')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const db = req.app.locals.db;
  const { job_id, document_type_id, document_name, document_location, document_description } = req.body;
  
  const sql = `INSERT INTO tbl_job_documents (job_id, document_type_id, document_name, document_location, document_description) 
               VALUES (?, ?, ?, ?, ?)`;
  
  db.run(sql, [job_id, document_type_id, document_name, document_location, document_description], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ 
      success: true, 
      message: 'Job document created successfully', 
      data: { job_document_id: this.lastID }
    });
  });
});

// PUT update job document
router.put('/job-documents/:id', [
  body('job_id').optional().notEmpty().withMessage('Job ID cannot be empty'),
  body('document_type_id').optional().isInt().withMessage('Document type ID must be an integer'),
  body('document_name').optional().notEmpty().withMessage('Document name cannot be empty'),
  body('document_location').optional().notEmpty().withMessage('Document location cannot be empty')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const db = req.app.locals.db;
  const { job_id, document_type_id, document_name, document_location, document_description } = req.body;
  
  const sql = `UPDATE tbl_job_documents SET 
               job_id = COALESCE(?, job_id),
               document_type_id = COALESCE(?, document_type_id),
               document_name = COALESCE(?, document_name),
               document_location = COALESCE(?, document_location),
               document_description = COALESCE(?, document_description)
               WHERE job_document_id = ?`;
  
  db.run(sql, [job_id, document_type_id, document_name, document_location, document_description, req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Job document not found' });
    }
    res.json({ success: true, message: 'Job document updated successfully' });
  });
});

// DELETE job document
router.delete('/job-documents/:id', (req, res) => {
  const db = req.app.locals.db;
  const sql = `DELETE FROM tbl_job_documents WHERE job_document_id = ?`;
  
  db.run(sql, [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Job document not found' });
    }
    res.json({ success: true, message: 'Job document deleted successfully' });
  });
});

// =============================
// TBL_JOB_BILLING TABLE ROUTES
// =============================

// GET all job billing records
router.get('/job-billing', (req, res) => {
  const db = req.app.locals.db;
  const sql = `SELECT jb.*, j.job_name, c.client_name
               FROM tbl_job_billing jb
               LEFT JOIN tbl_master_jobs j ON jb.job_id = j.job_id
               LEFT JOIN tbl_master_clients c ON jb.client_id = c.client_id
               ORDER BY jb.job_billing_id DESC`;
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, data: rows });
  });
});

// GET job billing record by ID
router.get('/job-billing/:id', (req, res) => {
  const db = req.app.locals.db;
  const sql = `SELECT jb.*, j.job_name, c.client_name
               FROM tbl_job_billing jb
               LEFT JOIN tbl_master_jobs j ON jb.job_id = j.job_id
               LEFT JOIN tbl_master_clients c ON jb.client_id = c.client_id
               WHERE jb.job_billing_id = ?`;
  
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Job billing record not found' });
    }
    res.json({ success: true, data: row });
  });
});

// POST create new job billing record
router.post('/job-billing', [
  body('job_id').notEmpty().withMessage('Job ID is required'),
  body('client_id').notEmpty().withMessage('Client ID is required'),
  body('invoice_id').notEmpty().withMessage('Invoice ID is required')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const db = req.app.locals.db;
  const {
    job_id, client_id, invoice_id, invoice_status, invoice_raised_by,
    invoice_raised_date, invoice_reference_number
  } = req.body;
  
  const sql = `INSERT INTO tbl_job_billing (
    job_id, client_id, invoice_id, invoice_status, invoice_raised_by,
    invoice_raised_date, invoice_reference_number
  ) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  
  db.run(sql, [
    job_id, client_id, invoice_id, invoice_status, invoice_raised_by,
    invoice_raised_date, invoice_reference_number
  ], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ 
      success: true, 
      message: 'Job billing record created successfully', 
      data: { job_billing_id: this.lastID }
    });
  });
});

// PUT update job billing record
router.put('/job-billing/:id', [
  body('job_id').optional().notEmpty().withMessage('Job ID cannot be empty'),
  body('client_id').optional().notEmpty().withMessage('Client ID cannot be empty'),
  body('invoice_id').optional().notEmpty().withMessage('Invoice ID cannot be empty')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const db = req.app.locals.db;
  const {
    job_id, client_id, invoice_id, invoice_status, invoice_raised_by,
    invoice_raised_date, invoice_reference_number
  } = req.body;
  
  const sql = `UPDATE tbl_job_billing SET 
               job_id = COALESCE(?, job_id),
               client_id = COALESCE(?, client_id),
               invoice_id = COALESCE(?, invoice_id),
               invoice_status = COALESCE(?, invoice_status),
               invoice_raised_by = COALESCE(?, invoice_raised_by),
               invoice_raised_date = COALESCE(?, invoice_raised_date),
               invoice_reference_number = COALESCE(?, invoice_reference_number)
               WHERE job_billing_id = ?`;
  
  db.run(sql, [
    job_id, client_id, invoice_id, invoice_status, invoice_raised_by,
    invoice_raised_date, invoice_reference_number, req.params.id
  ], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Job billing record not found' });
    }
    res.json({ success: true, message: 'Job billing record updated successfully' });
  });
});

// DELETE job billing record
router.delete('/job-billing/:id', (req, res) => {
  const db = req.app.locals.db;
  const sql = `DELETE FROM tbl_job_billing WHERE job_billing_id = ?`;
  
  db.run(sql, [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Job billing record not found' });
    }
    res.json({ success: true, message: 'Job billing record deleted successfully' });
  });
});

module.exports = router;