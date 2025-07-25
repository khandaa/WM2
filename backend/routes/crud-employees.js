/**
 * Work Management Database CRUD Operations - Employee Related Tables
 * Created: 2025-07-25
 */

const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// =============================
// TBL_MASTER_EMPLOYEES TABLE ROUTES
// =============================

// GET all employees
router.get('/employees', (req, res) => {
  const db = req.app.locals.db;
  const sql = `SELECT e.*, t.team_name, d.department_name, r.role_name 
               FROM tbl_master_employees e
               LEFT JOIN tbl_master_teams t ON e.team_id = t.team_id
               LEFT JOIN tbl_master_departments d ON e.department_id = d.department_id
               LEFT JOIN tbl_master_roles r ON e.role_id = r.role_id
               ORDER BY e.employee_id DESC`;
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, data: rows });
  });
});

// GET employee by ID
router.get('/employees/:id', (req, res) => {
  const db = req.app.locals.db;
  const sql = `SELECT e.*, t.team_name, d.department_name, r.role_name 
               FROM tbl_master_employees e
               LEFT JOIN tbl_master_teams t ON e.team_id = t.team_id
               LEFT JOIN tbl_master_departments d ON e.department_id = d.department_id
               LEFT JOIN tbl_master_roles r ON e.role_id = r.role_id
               WHERE e.employee_id = ?`;
  
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json({ success: true, data: row });
  });
});

// POST create new employee
router.post('/employees', [
  body('org_employee_id').notEmpty().withMessage('Organization employee ID is required'),
  body('employee_name').notEmpty().withMessage('Employee name is required'),
  body('employee_gender').optional(),
  body('employee_qualification').optional(),
  body('date_of_joining').optional(),
  body('team_id').optional().isInt().withMessage('Team ID must be an integer'),
  body('department_id').optional().isInt().withMessage('Department ID must be an integer'),
  body('role_id').optional().isInt().withMessage('Role ID must be an integer')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const db = req.app.locals.db;
  const {
    org_employee_id, employee_name, team_id, department_id, employee_gender,
    employee_qualification, date_of_joining, employee_city_of_residence,
    employee_city_of_work, employee_referred_by, date_of_birth,
    emergency_contact_no, emergency_contact_name, emergency_person_relation,
    employee_photo, role_id
  } = req.body;
  
  const sql = `INSERT INTO tbl_master_employees (
    org_employee_id, employee_name, team_id, department_id, employee_gender,
    employee_qualification, date_of_joining, employee_city_of_residence,
    employee_city_of_work, employee_referred_by, date_of_birth,
    emergency_contact_no, emergency_contact_name, emergency_person_relation,
    employee_photo, role_id
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
  db.run(sql, [
    org_employee_id, employee_name, team_id, department_id, employee_gender,
    employee_qualification, date_of_joining, employee_city_of_residence,
    employee_city_of_work, employee_referred_by, date_of_birth,
    emergency_contact_no, emergency_contact_name, emergency_person_relation,
    employee_photo, role_id
  ], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ 
      success: true, 
      message: 'Employee created successfully', 
      data: { employee_id: this.lastID }
    });
  });
});

// PUT update employee
router.put('/employees/:id', [
  body('org_employee_id').optional().notEmpty().withMessage('Organization employee ID cannot be empty'),
  body('employee_name').optional().notEmpty().withMessage('Employee name cannot be empty'),
  body('team_id').optional().isInt().withMessage('Team ID must be an integer'),
  body('department_id').optional().isInt().withMessage('Department ID must be an integer'),
  body('role_id').optional().isInt().withMessage('Role ID must be an integer')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const db = req.app.locals.db;
  const {
    org_employee_id, employee_name, team_id, department_id, employee_gender,
    employee_qualification, date_of_joining, employee_city_of_residence,
    employee_city_of_work, employee_referred_by, date_of_birth,
    emergency_contact_no, emergency_contact_name, emergency_person_relation,
    employee_photo, role_id
  } = req.body;
  
  const sql = `UPDATE tbl_master_employees SET 
               org_employee_id = COALESCE(?, org_employee_id),
               employee_name = COALESCE(?, employee_name),
               team_id = COALESCE(?, team_id),
               department_id = COALESCE(?, department_id),
               employee_gender = COALESCE(?, employee_gender),
               employee_qualification = COALESCE(?, employee_qualification),
               date_of_joining = COALESCE(?, date_of_joining),
               employee_city_of_residence = COALESCE(?, employee_city_of_residence),
               employee_city_of_work = COALESCE(?, employee_city_of_work),
               employee_referred_by = COALESCE(?, employee_referred_by),
               date_of_birth = COALESCE(?, date_of_birth),
               emergency_contact_no = COALESCE(?, emergency_contact_no),
               emergency_contact_name = COALESCE(?, emergency_contact_name),
               emergency_person_relation = COALESCE(?, emergency_person_relation),
               employee_photo = COALESCE(?, employee_photo),
               role_id = COALESCE(?, role_id)
               WHERE employee_id = ?`;
  
  db.run(sql, [
    org_employee_id, employee_name, team_id, department_id, employee_gender,
    employee_qualification, date_of_joining, employee_city_of_residence,
    employee_city_of_work, employee_referred_by, date_of_birth,
    emergency_contact_no, emergency_contact_name, emergency_person_relation,
    employee_photo, role_id, req.params.id
  ], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json({ success: true, message: 'Employee updated successfully' });
  });
});

// DELETE employee
router.delete('/employees/:id', (req, res) => {
  const db = req.app.locals.db;
  const sql = `DELETE FROM tbl_master_employees WHERE employee_id = ?`;
  
  db.run(sql, [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json({ success: true, message: 'Employee deleted successfully' });
  });
});

// =============================
// TBL_MASTER_TEAMS TABLE ROUTES
// =============================

// GET all teams
router.get('/teams', (req, res) => {
  const db = req.app.locals.db;
  const sql = `SELECT t.*, e.employee_name as team_owner_name 
               FROM tbl_master_teams t
               LEFT JOIN tbl_master_employees e ON t.team_owner = e.employee_id
               ORDER BY t.team_id DESC`;
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, data: rows });
  });
});

// GET team by ID
router.get('/teams/:id', (req, res) => {
  const db = req.app.locals.db;
  const sql = `SELECT t.*, e.employee_name as team_owner_name 
               FROM tbl_master_teams t
               LEFT JOIN tbl_master_employees e ON t.team_owner = e.employee_id
               WHERE t.team_id = ?`;
  
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json({ success: true, data: row });
  });
});

// POST create new team
router.post('/teams', [
  body('team_name').notEmpty().withMessage('Team name is required'),
  body('team_owner').optional().isInt().withMessage('Team owner must be an integer')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const db = req.app.locals.db;
  const { team_name, team_owner } = req.body;
  
  const sql = `INSERT INTO tbl_master_teams (team_name, team_owner) VALUES (?, ?)`;
  
  db.run(sql, [team_name, team_owner], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ 
      success: true, 
      message: 'Team created successfully', 
      data: { team_id: this.lastID }
    });
  });
});

// PUT update team
router.put('/teams/:id', [
  body('team_name').optional().notEmpty().withMessage('Team name cannot be empty'),
  body('team_owner').optional().isInt().withMessage('Team owner must be an integer')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const db = req.app.locals.db;
  const { team_name, team_owner } = req.body;
  
  const sql = `UPDATE tbl_master_teams SET 
               team_name = COALESCE(?, team_name),
               team_owner = COALESCE(?, team_owner)
               WHERE team_id = ?`;
  
  db.run(sql, [team_name, team_owner, req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json({ success: true, message: 'Team updated successfully' });
  });
});

// DELETE team
router.delete('/teams/:id', (req, res) => {
  const db = req.app.locals.db;
  const sql = `DELETE FROM tbl_master_teams WHERE team_id = ?`;
  
  db.run(sql, [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json({ success: true, message: 'Team deleted successfully' });
  });
});

// =============================
// TBL_MASTER_DEPARTMENTS TABLE ROUTES
// =============================

// GET all departments
router.get('/departments', (req, res) => {
  const db = req.app.locals.db;
  const sql = `SELECT d.*, e.employee_name as department_owner_name 
               FROM tbl_master_departments d
               LEFT JOIN tbl_master_employees e ON d.department_owner = e.employee_id
               ORDER BY d.department_id DESC`;
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, data: rows });
  });
});

// GET department by ID
router.get('/departments/:id', (req, res) => {
  const db = req.app.locals.db;
  const sql = `SELECT d.*, e.employee_name as department_owner_name 
               FROM tbl_master_departments d
               LEFT JOIN tbl_master_employees e ON d.department_owner = e.employee_id
               WHERE d.department_id = ?`;
  
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Department not found' });
    }
    res.json({ success: true, data: row });
  });
});

// POST create new department
router.post('/departments', [
  body('department_name').notEmpty().withMessage('Department name is required'),
  body('department_owner').optional().isInt().withMessage('Department owner must be an integer')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const db = req.app.locals.db;
  const { department_name, department_owner } = req.body;
  
  const sql = `INSERT INTO tbl_master_departments (department_name, department_owner) VALUES (?, ?)`;
  
  db.run(sql, [department_name, department_owner], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ 
      success: true, 
      message: 'Department created successfully', 
      data: { department_id: this.lastID }
    });
  });
});

// PUT update department
router.put('/departments/:id', [
  body('department_name').optional().notEmpty().withMessage('Department name cannot be empty'),
  body('department_owner').optional().isInt().withMessage('Department owner must be an integer')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const db = req.app.locals.db;
  const { department_name, department_owner } = req.body;
  
  const sql = `UPDATE tbl_master_departments SET 
               department_name = COALESCE(?, department_name),
               department_owner = COALESCE(?, department_owner)
               WHERE department_id = ?`;
  
  db.run(sql, [department_name, department_owner, req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Department not found' });
    }
    res.json({ success: true, message: 'Department updated successfully' });
  });
});

// DELETE department
router.delete('/departments/:id', (req, res) => {
  const db = req.app.locals.db;
  const sql = `DELETE FROM tbl_master_departments WHERE department_id = ?`;
  
  db.run(sql, [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Department not found' });
    }
    res.json({ success: true, message: 'Department deleted successfully' });
  });
});

module.exports = router;