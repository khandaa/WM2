/**
 * Work Management Database CRUD Operations - Job Related Tables
 * Created: 2025-07-25
 */

const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// =============================
// TBL_MASTER_JOBS TABLE ROUTES
// =============================

// GET all jobs
router.get('/jobs', (req, res) => {
  const db = req.app.locals.db;
  const sql = `SELECT j.*, c.client_name, comp.company_name, jc.job_description as category_description
               FROM tbl_master_jobs j
               LEFT JOIN tbl_master_clients c ON j.client_id = c.client_id
               LEFT JOIN tbl_master_companies comp ON j.company_id = comp.company_id
               LEFT JOIN tbl_master_job_category jc ON j.job_category_id = jc.job_category_id
               ORDER BY j.job_id DESC`;
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, data: rows });
  });
});

// GET job by ID
router.get('/jobs/:id', (req, res) => {
  const db = req.app.locals.db;
  const sql = `SELECT j.*, c.client_name, comp.company_name, jc.job_description as category_description
               FROM tbl_master_jobs j
               LEFT JOIN tbl_master_clients c ON j.client_id = c.client_id
               LEFT JOIN tbl_master_companies comp ON j.company_id = comp.company_id
               LEFT JOIN tbl_master_job_category jc ON j.job_category_id = jc.job_category_id
               WHERE j.job_id = ?`;
  
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json({ success: true, data: row });
  });
});

// POST create new job
router.post('/jobs', [
  body('job_name').notEmpty().withMessage('Job name is required'),
  body('job_category_id').optional().isInt().withMessage('Job category ID must be an integer'),
  body('client_id').optional().isInt().withMessage('Client ID must be an integer'),
  body('company_id').optional().isInt().withMessage('Company ID must be an integer'),
  body('created_by').optional().isInt().withMessage('Created by must be an integer')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const db = req.app.locals.db;
  const {
    job_name, job_division_id, job_category_id, job_description, job_no,
    physical_file_no, job_status, assesment_year, job_received_date,
    job_planned_start_date, job_planned_end_date, job_regulatory_end_date,
    job_actual_start_date, job_actual_end_date, client_id, company_id,
    created_by, job_priority, job_client_priority, job_overall_priority,
    receipt_date
  } = req.body;
  
  const sql = `INSERT INTO tbl_master_jobs (
    job_name, job_division_id, job_category_id, job_description, job_no,
    physical_file_no, job_status, assesment_year, job_received_date,
    job_planned_start_date, job_planned_end_date, job_regulatory_end_date,
    job_actual_start_date, job_actual_end_date, client_id, company_id,
    created_by, job_priority, job_client_priority, job_overall_priority,
    receipt_date
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
  db.run(sql, [
    job_name, job_division_id, job_category_id, job_description, job_no,
    physical_file_no, job_status, assesment_year, job_received_date,
    job_planned_start_date, job_planned_end_date, job_regulatory_end_date,
    job_actual_start_date, job_actual_end_date, client_id, company_id,
    created_by, job_priority, job_client_priority, job_overall_priority,
    receipt_date
  ], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ 
      success: true, 
      message: 'Job created successfully', 
      data: { job_id: this.lastID }
    });
  });
});

// PUT update job
router.put('/jobs/:id', [
  body('job_name').optional().notEmpty().withMessage('Job name cannot be empty'),
  body('job_category_id').optional().isInt().withMessage('Job category ID must be an integer'),
  body('client_id').optional().isInt().withMessage('Client ID must be an integer'),
  body('company_id').optional().isInt().withMessage('Company ID must be an integer')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const db = req.app.locals.db;
  const {
    job_name, job_division_id, job_category_id, job_description, job_no,
    physical_file_no, job_status, assesment_year, job_received_date,
    job_planned_start_date, job_planned_end_date, job_regulatory_end_date,
    job_actual_start_date, job_actual_end_date, client_id, company_id,
    created_by, job_priority, job_client_priority, job_overall_priority,
    receipt_date
  } = req.body;
  
  const sql = `UPDATE tbl_master_jobs SET 
               job_name = COALESCE(?, job_name),
               job_division_id = COALESCE(?, job_division_id),
               job_category_id = COALESCE(?, job_category_id),
               job_description = COALESCE(?, job_description),
               job_no = COALESCE(?, job_no),
               physical_file_no = COALESCE(?, physical_file_no),
               job_status = COALESCE(?, job_status),
               assesment_year = COALESCE(?, assesment_year),
               job_received_date = COALESCE(?, job_received_date),
               job_planned_start_date = COALESCE(?, job_planned_start_date),
               job_planned_end_date = COALESCE(?, job_planned_end_date),
               job_regulatory_end_date = COALESCE(?, job_regulatory_end_date),
               job_actual_start_date = COALESCE(?, job_actual_start_date),
               job_actual_end_date = COALESCE(?, job_actual_end_date),
               client_id = COALESCE(?, client_id),
               company_id = COALESCE(?, company_id),
               created_by = COALESCE(?, created_by),
               job_priority = COALESCE(?, job_priority),
               job_client_priority = COALESCE(?, job_client_priority),
               job_overall_priority = COALESCE(?, job_overall_priority),
               receipt_date = COALESCE(?, receipt_date)
               WHERE job_id = ?`;
  
  db.run(sql, [
    job_name, job_division_id, job_category_id, job_description, job_no,
    physical_file_no, job_status, assesment_year, job_received_date,
    job_planned_start_date, job_planned_end_date, job_regulatory_end_date,
    job_actual_start_date, job_actual_end_date, client_id, company_id,
    created_by, job_priority, job_client_priority, job_overall_priority,
    receipt_date, req.params.id
  ], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json({ success: true, message: 'Job updated successfully' });
  });
});

// DELETE job
router.delete('/jobs/:id', (req, res) => {
  const db = req.app.locals.db;
  const sql = `DELETE FROM tbl_master_jobs WHERE job_id = ?`;
  
  db.run(sql, [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json({ success: true, message: 'Job deleted successfully' });
  });
});

// =============================
// TBL_MASTER_JOB_CATEGORY TABLE ROUTES
// =============================

// GET all job categories
router.get('/job-categories', (req, res) => {
  const db = req.app.locals.db;
  const sql = `SELECT jc.*, parent.job_description as parent_category_description
               FROM tbl_master_job_category jc
               LEFT JOIN tbl_master_job_category parent ON jc.parent_job_category_id = parent.job_category_id
               ORDER BY jc.job_category_id DESC`;
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, data: rows });
  });
});

// GET job category by ID
router.get('/job-categories/:id', (req, res) => {
  const db = req.app.locals.db;
  const sql = `SELECT jc.*, parent.job_description as parent_category_description
               FROM tbl_master_job_category jc
               LEFT JOIN tbl_master_job_category parent ON jc.parent_job_category_id = parent.job_category_id
               WHERE jc.job_category_id = ?`;
  
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Job category not found' });
    }
    res.json({ success: true, data: row });
  });
});

// POST create new job category
router.post('/job-categories', [
  body('job_description').notEmpty().withMessage('Job description is required'),
  body('parent_job_category_id').optional().isInt().withMessage('Parent job category ID must be an integer')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const db = req.app.locals.db;
  const { job_description, parent_job_category_id } = req.body;
  
  const sql = `INSERT INTO tbl_master_job_category (job_description, parent_job_category_id) VALUES (?, ?)`;
  
  db.run(sql, [job_description, parent_job_category_id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ 
      success: true, 
      message: 'Job category created successfully', 
      data: { job_category_id: this.lastID }
    });
  });
});

// PUT update job category
router.put('/job-categories/:id', [
  body('job_description').optional().notEmpty().withMessage('Job description cannot be empty'),
  body('parent_job_category_id').optional().isInt().withMessage('Parent job category ID must be an integer')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const db = req.app.locals.db;
  const { job_description, parent_job_category_id } = req.body;
  
  const sql = `UPDATE tbl_master_job_category SET 
               job_description = COALESCE(?, job_description),
               parent_job_category_id = COALESCE(?, parent_job_category_id)
               WHERE job_category_id = ?`;
  
  db.run(sql, [job_description, parent_job_category_id, req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Job category not found' });
    }
    res.json({ success: true, message: 'Job category updated successfully' });
  });
});

// DELETE job category
router.delete('/job-categories/:id', (req, res) => {
  const db = req.app.locals.db;
  const sql = `DELETE FROM tbl_master_job_category WHERE job_category_id = ?`;
  
  db.run(sql, [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Job category not found' });
    }
    res.json({ success: true, message: 'Job category deleted successfully' });
  });
});

// =============================
// TBL_JOB_ASSIGNMENT TABLE ROUTES
// =============================

// GET all job assignments
router.get('/job-assignments', (req, res) => {
  const db = req.app.locals.db;
  const sql = `SELECT ja.*, j.job_name, e.employee_name as assignee_name, 
               mgr.employee_name as assigned_by_name
               FROM tbl_job_assignment ja
               LEFT JOIN tbl_master_jobs j ON ja.job_id = j.job_id
               LEFT JOIN tbl_master_employees e ON ja.assignee_employee_id = e.employee_id
               LEFT JOIN tbl_master_employees mgr ON ja.job_assigned_by = mgr.employee_id
               ORDER BY ja.job_assignment_id DESC`;
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, data: rows });
  });
});

// GET job assignment by ID
router.get('/job-assignments/:id', (req, res) => {
  const db = req.app.locals.db;
  const sql = `SELECT ja.*, j.job_name, e.employee_name as assignee_name, 
               mgr.employee_name as assigned_by_name
               FROM tbl_job_assignment ja
               LEFT JOIN tbl_master_jobs j ON ja.job_id = j.job_id
               LEFT JOIN tbl_master_employees e ON ja.assignee_employee_id = e.employee_id
               LEFT JOIN tbl_master_employees mgr ON ja.job_assigned_by = mgr.employee_id
               WHERE ja.job_assignment_id = ?`;
  
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Job assignment not found' });
    }
    res.json({ success: true, data: row });
  });
});

// POST create new job assignment
router.post('/job-assignments', [
  body('job_id').notEmpty().withMessage('Job ID is required'),
  body('assignee_employee_id').notEmpty().withMessage('Assignee employee ID is required'),
  body('job_assigned_by').optional().isInt().withMessage('Job assigned by must be an integer')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const db = req.app.locals.db;
  const {
    job_id, assignee_employee_id, job_assign_date, job_assigned_by,
    job_planned_start_date, job_planned_end_date, job_actual_start_date,
    job_actual_end_date, status = 'Assigned'
  } = req.body;
  
  const sql = `INSERT INTO tbl_job_assignment (
    job_id, assignee_employee_id, job_assign_date, job_assigned_by,
    job_planned_start_date, job_planned_end_date, job_actual_start_date,
    job_actual_end_date, status
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
  db.run(sql, [
    job_id, assignee_employee_id, job_assign_date, job_assigned_by,
    job_planned_start_date, job_planned_end_date, job_actual_start_date,
    job_actual_end_date, status
  ], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ 
      success: true, 
      message: 'Job assignment created successfully', 
      data: { job_assignment_id: this.lastID }
    });
  });
});

// PUT update job assignment
router.put('/job-assignments/:id', [
  body('job_id').optional().notEmpty().withMessage('Job ID cannot be empty'),
  body('assignee_employee_id').optional().notEmpty().withMessage('Assignee employee ID cannot be empty'),
  body('job_assigned_by').optional().isInt().withMessage('Job assigned by must be an integer')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const db = req.app.locals.db;
  const {
    job_id, assignee_employee_id, job_assign_date, job_assigned_by,
    job_planned_start_date, job_planned_end_date, job_actual_start_date,
    job_actual_end_date, status
  } = req.body;
  
  const sql = `UPDATE tbl_job_assignment SET 
               job_id = COALESCE(?, job_id),
               assignee_employee_id = COALESCE(?, assignee_employee_id),
               job_assign_date = COALESCE(?, job_assign_date),
               job_assigned_by = COALESCE(?, job_assigned_by),
               job_planned_start_date = COALESCE(?, job_planned_start_date),
               job_planned_end_date = COALESCE(?, job_planned_end_date),
               job_actual_start_date = COALESCE(?, job_actual_start_date),
               job_actual_end_date = COALESCE(?, job_actual_end_date),
               status = COALESCE(?, status)
               WHERE job_assignment_id = ?`;
  
  db.run(sql, [
    job_id, assignee_employee_id, job_assign_date, job_assigned_by,
    job_planned_start_date, job_planned_end_date, job_actual_start_date,
    job_actual_end_date, status, req.params.id
  ], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Job assignment not found' });
    }
    res.json({ success: true, message: 'Job assignment updated successfully' });
  });
});

// DELETE job assignment
router.delete('/job-assignments/:id', (req, res) => {
  const db = req.app.locals.db;
  const sql = `DELETE FROM tbl_job_assignment WHERE job_assignment_id = ?`;
  
  db.run(sql, [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Job assignment not found' });
    }
    res.json({ success: true, message: 'Job assignment deleted successfully' });
  });
});

module.exports = router;