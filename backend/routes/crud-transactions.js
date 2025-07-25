/**
 * Work Management Database CRUD Operations - Transaction Tables
 * Created: 2025-07-25
 */

const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// =============================
// USER_ROLES_TX TABLE ROUTES
// =============================

// GET all user roles
router.get('/user-roles', (req, res) => {
  const db = req.app.locals.db;
  const sql = `SELECT ur.*, u.email as user_email, r.name as role_name
               FROM user_roles_tx ur
               LEFT JOIN users_master u ON ur.user_id = u.user_id
               LEFT JOIN roles_master r ON ur.role_id = r.role_id
               ORDER BY ur.created_at DESC`;
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, data: rows });
  });
});

// GET user role by ID
router.get('/user-roles/:id', (req, res) => {
  const db = req.app.locals.db;
  const sql = `SELECT ur.*, u.email as user_email, r.name as role_name
               FROM user_roles_tx ur
               LEFT JOIN users_master u ON ur.user_id = u.user_id
               LEFT JOIN roles_master r ON ur.role_id = r.role_id
               WHERE ur.user_role_id = ?`;
  
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'User role not found' });
    }
    res.json({ success: true, data: row });
  });
});

// POST create new user role
router.post('/user-roles', [
  body('user_id').isInt().withMessage('User ID is required and must be an integer'),
  body('role_id').isInt().withMessage('Role ID is required and must be an integer')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const db = req.app.locals.db;
  const { user_id, role_id } = req.body;
  
  const sql = `INSERT INTO user_roles_tx (user_id, role_id) VALUES (?, ?)`;
  
  db.run(sql, [user_id, role_id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ 
      success: true, 
      message: 'User role created successfully', 
      data: { user_role_id: this.lastID }
    });
  });
});

// DELETE user role
router.delete('/user-roles/:id', (req, res) => {
  const db = req.app.locals.db;
  const sql = `DELETE FROM user_roles_tx WHERE user_role_id = ?`;
  
  db.run(sql, [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'User role not found' });
    }
    res.json({ success: true, message: 'User role deleted successfully' });
  });
});

// =============================
// ROLE_PERMISSIONS_TX TABLE ROUTES
// =============================

// GET all role permissions
router.get('/role-permissions', (req, res) => {
  const db = req.app.locals.db;
  const sql = `SELECT rp.*, r.name as role_name, p.name as permission_name
               FROM role_permissions_tx rp
               LEFT JOIN roles_master r ON rp.role_id = r.role_id
               LEFT JOIN permissions_master p ON rp.permission_id = p.permission_id
               ORDER BY rp.created_at DESC`;
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, data: rows });
  });
});

// GET role permission by ID
router.get('/role-permissions/:id', (req, res) => {
  const db = req.app.locals.db;
  const sql = `SELECT rp.*, r.name as role_name, p.name as permission_name
               FROM role_permissions_tx rp
               LEFT JOIN roles_master r ON rp.role_id = r.role_id
               LEFT JOIN permissions_master p ON rp.permission_id = p.permission_id
               WHERE rp.role_permission_id = ?`;
  
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Role permission not found' });
    }
    res.json({ success: true, data: row });
  });
});

// POST create new role permission
router.post('/role-permissions', [
  body('role_id').isInt().withMessage('Role ID is required and must be an integer'),
  body('permission_id').isInt().withMessage('Permission ID is required and must be an integer')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const db = req.app.locals.db;
  const { role_id, permission_id } = req.body;
  
  const sql = `INSERT INTO role_permissions_tx (role_id, permission_id) VALUES (?, ?)`;
  
  db.run(sql, [role_id, permission_id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ 
      success: true, 
      message: 'Role permission created successfully', 
      data: { role_permission_id: this.lastID }
    });
  });
});

// DELETE role permission
router.delete('/role-permissions/:id', (req, res) => {
  const db = req.app.locals.db;
  const sql = `DELETE FROM role_permissions_tx WHERE role_permission_id = ?`;
  
  db.run(sql, [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Role permission not found' });
    }
    res.json({ success: true, message: 'Role permission deleted successfully' });
  });
});

// =============================
// ACTIVITY_LOGS_TX TABLE ROUTES
// =============================

// GET all activity logs
router.get('/activity-logs', (req, res) => {
  const db = req.app.locals.db;
  const sql = `SELECT al.*, u.email as user_email
               FROM activity_logs_tx al
               LEFT JOIN users_master u ON al.user_id = u.user_id
               ORDER BY al.created_at DESC`;
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, data: rows });
  });
});

// GET activity log by ID
router.get('/activity-logs/:id', (req, res) => {
  const db = req.app.locals.db;
  const sql = `SELECT al.*, u.email as user_email
               FROM activity_logs_tx al
               LEFT JOIN users_master u ON al.user_id = u.user_id
               WHERE al.activity_log_id = ?`;
  
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Activity log not found' });
    }
    res.json({ success: true, data: row });
  });
});

// POST create new activity log
router.post('/activity-logs', [
  body('action').notEmpty().withMessage('Action is required'),
  body('user_id').optional().isInt().withMessage('User ID must be an integer')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const db = req.app.locals.db;
  const { user_id, action, details, ip_address, user_agent } = req.body;
  
  const sql = `INSERT INTO activity_logs_tx (user_id, action, details, ip_address, user_agent) 
               VALUES (?, ?, ?, ?, ?)`;
  
  db.run(sql, [user_id, action, details, ip_address, user_agent], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ 
      success: true, 
      message: 'Activity log created successfully', 
      data: { activity_log_id: this.lastID }
    });
  });
});

// DELETE activity log
router.delete('/activity-logs/:id', (req, res) => {
  const db = req.app.locals.db;
  const sql = `DELETE FROM activity_logs_tx WHERE activity_log_id = ?`;
  
  db.run(sql, [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Activity log not found' });
    }
    res.json({ success: true, message: 'Activity log deleted successfully' });
  });
});

// =============================
// TBL_JOB_STATUS_REPORT TABLE ROUTES
// =============================

// GET all job status reports
router.get('/job-status-reports', (req, res) => {
  const db = req.app.locals.db;
  const sql = `SELECT jsr.*, j.job_name, e.employee_name as assignee_name
               FROM tbl_job_status_report jsr
               LEFT JOIN tbl_master_jobs j ON jsr.job_id = j.job_id
               LEFT JOIN tbl_master_employees e ON jsr.assignee_employee_id = e.employee_id
               ORDER BY jsr.job_status_id DESC`;
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, data: rows });
  });
});

// GET job status report by ID
router.get('/job-status-reports/:id', (req, res) => {
  const db = req.app.locals.db;
  const sql = `SELECT jsr.*, j.job_name, e.employee_name as assignee_name
               FROM tbl_job_status_report jsr
               LEFT JOIN tbl_master_jobs j ON jsr.job_id = j.job_id
               LEFT JOIN tbl_master_employees e ON jsr.assignee_employee_id = e.employee_id
               WHERE jsr.job_status_id = ?`;
  
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Job status report not found' });
    }
    res.json({ success: true, data: row });
  });
});

// POST create new job status report
router.post('/job-status-reports', [
  body('job_id').notEmpty().withMessage('Job ID is required'),
  body('assignee_employee_id').notEmpty().withMessage('Assignee employee ID is required'),
  body('job_overall_status').optional()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const db = req.app.locals.db;
  const {
    job_id, assignee_employee_id, report_datetime, status_description,
    job_overall_status, job_percentage_complete
  } = req.body;
  
  const sql = `INSERT INTO tbl_job_status_report (
    job_id, assignee_employee_id, report_datetime, status_description,
    job_overall_status, job_percentage_complete
  ) VALUES (?, ?, ?, ?, ?, ?)`;
  
  db.run(sql, [
    job_id, assignee_employee_id, report_datetime, status_description,
    job_overall_status, job_percentage_complete
  ], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ 
      success: true, 
      message: 'Job status report created successfully', 
      data: { job_status_id: this.lastID }
    });
  });
});

// PUT update job status report
router.put('/job-status-reports/:id', [
  body('job_id').optional().notEmpty().withMessage('Job ID cannot be empty'),
  body('assignee_employee_id').optional().notEmpty().withMessage('Assignee employee ID cannot be empty')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const db = req.app.locals.db;
  const {
    job_id, assignee_employee_id, report_datetime, status_description,
    job_overall_status, job_percentage_complete
  } = req.body;
  
  const sql = `UPDATE tbl_job_status_report SET 
               job_id = COALESCE(?, job_id),
               assignee_employee_id = COALESCE(?, assignee_employee_id),
               report_datetime = COALESCE(?, report_datetime),
               status_description = COALESCE(?, status_description),
               job_overall_status = COALESCE(?, job_overall_status),
               job_percentage_complete = COALESCE(?, job_percentage_complete)
               WHERE job_status_id = ?`;
  
  db.run(sql, [
    job_id, assignee_employee_id, report_datetime, status_description,
    job_overall_status, job_percentage_complete, req.params.id
  ], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Job status report not found' });
    }
    res.json({ success: true, message: 'Job status report updated successfully' });
  });
});

// DELETE job status report
router.delete('/job-status-reports/:id', (req, res) => {
  const db = req.app.locals.db;
  const sql = `DELETE FROM tbl_job_status_report WHERE job_status_id = ?`;
  
  db.run(sql, [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Job status report not found' });
    }
    res.json({ success: true, message: 'Job status report deleted successfully' });
  });
});

// =============================
// TBL_JOB_COMMENTS TABLE ROUTES
// =============================

// GET all job comments
router.get('/job-comments', (req, res) => {
  const db = req.app.locals.db;
  const sql = `SELECT jc.*, e.employee_name as commenter_name
               FROM tbl_job_comments jc
               LEFT JOIN tbl_master_employees e ON jc.commenter_id = e.employee_id
               ORDER BY jc.create_datetime DESC`;
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, data: rows });
  });
});

// GET job comment by ID
router.get('/job-comments/:id', (req, res) => {
  const db = req.app.locals.db;
  const sql = `SELECT jc.*, e.employee_name as commenter_name
               FROM tbl_job_comments jc
               LEFT JOIN tbl_master_employees e ON jc.commenter_id = e.employee_id
               WHERE jc.job_comment_id = ?`;
  
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Job comment not found' });
    }
    res.json({ success: true, data: row });
  });
});

// POST create new job comment
router.post('/job-comments', [
  body('commenter_id').isInt().withMessage('Commenter ID is required and must be an integer'),
  body('comment_text').notEmpty().withMessage('Comment text is required')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const db = req.app.locals.db;
  const {
    commenter_id, comment_sequence_id, comment_text, job_status
  } = req.body;
  
  const currentDateTime = new Date().toISOString();
  
  const sql = `INSERT INTO tbl_job_comments (
    commenter_id, comment_sequence_id, comment_text, create_datetime, 
    update_datetime, job_status
  ) VALUES (?, ?, ?, ?, ?, ?)`;
  
  db.run(sql, [
    commenter_id, comment_sequence_id, comment_text, currentDateTime,
    currentDateTime, job_status
  ], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ 
      success: true, 
      message: 'Job comment created successfully', 
      data: { job_comment_id: this.lastID }
    });
  });
});

// PUT update job comment
router.put('/job-comments/:id', [
  body('comment_text').optional().notEmpty().withMessage('Comment text cannot be empty'),
  body('commenter_id').optional().isInt().withMessage('Commenter ID must be an integer')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const db = req.app.locals.db;
  const {
    commenter_id, comment_sequence_id, comment_text, job_status
  } = req.body;
  
  const currentDateTime = new Date().toISOString();
  
  const sql = `UPDATE tbl_job_comments SET 
               commenter_id = COALESCE(?, commenter_id),
               comment_sequence_id = COALESCE(?, comment_sequence_id),
               comment_text = COALESCE(?, comment_text),
               update_datetime = ?,
               job_status = COALESCE(?, job_status)
               WHERE job_comment_id = ?`;
  
  db.run(sql, [
    commenter_id, comment_sequence_id, comment_text, currentDateTime,
    job_status, req.params.id
  ], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Job comment not found' });
    }
    res.json({ success: true, message: 'Job comment updated successfully' });
  });
});

// DELETE job comment
router.delete('/job-comments/:id', (req, res) => {
  const db = req.app.locals.db;
  const sql = `DELETE FROM tbl_job_comments WHERE job_comment_id = ?`;
  
  db.run(sql, [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Job comment not found' });
    }
    res.json({ success: true, message: 'Job comment deleted successfully' });
  });
});

module.exports = router;