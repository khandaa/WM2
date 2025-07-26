/**
 * Work Management Database CRUD Operations - Main Router
 * This file combines all CRUD routes into a single router
 * Created: 2025-07-25
 * Updated: 2025-07-26 - Added feature toggle integration
 */

const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../../middleware/auth');
const { checkFeatureEnabled } = require('../middleware/feature-toggle-check');

// Import all CRUD route modules
const crudRoutes = require('./crud');
const crudEmployees = require('./crud-employees');
const crudClients = require('./crud-clients');
const crudJobs = require('./crud-jobs');
const crudTransactions = require('./crud-transactions');
const crudMisc = require('./crud-misc');

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Feature toggle middleware for all routes
// Each route will need to check if the specific operation is enabled
// This will be dynamically checked based on the HTTP method and resource
router.use('/:resource', (req, res, next) => {
  const resource = req.params.resource;
  let operation;
  
  // Map HTTP methods to CRUD operations
  switch (req.method) {
    case 'GET':
      operation = 'read';
      break;
    case 'POST':
      operation = 'create';
      break;
    case 'PUT':
    case 'PATCH':
      operation = 'update';
      break;
    case 'DELETE':
      operation = 'delete';
      break;
    default:
      operation = 'read';
  }
  
  // Format the feature toggle name: crud_operation_resource
  // Replace hyphens with underscores for toggle names
  const featureToggleName = `crud_${operation}_${resource.replace(/-/g, '_')}`;
  
  // Apply the feature toggle check
  return checkFeatureEnabled(featureToggleName)(req, res, next);
});

// Mount all CRUD routes
router.use('/', crudRoutes);
router.use('/', crudEmployees);
router.use('/', crudClients);
router.use('/', crudJobs);
router.use('/', crudTransactions);
router.use('/', crudMisc);

// API Documentation endpoint
router.get('/', (req, res) => {
  res.json({
    message: 'Work Management Database CRUD API',
    version: '1.0.0',
    endpoints: {
      'Master Data': {
        'users': 'GET/POST/PUT/DELETE /api/crud/users',
        'roles': 'GET/POST/PUT/DELETE /api/crud/roles',
        'permissions': 'GET/POST/PUT/DELETE /api/crud/permissions',
        'employees': 'GET/POST/PUT/DELETE /api/crud/employees',
        'teams': 'GET/POST/PUT/DELETE /api/crud/teams',
        'departments': 'GET/POST/PUT/DELETE /api/crud/departments',
        'clients': 'GET/POST/PUT/DELETE /api/crud/clients',
        'companies': 'GET/POST/PUT/DELETE /api/crud/companies',
        'jobs': 'GET/POST/PUT/DELETE /api/crud/jobs',
        'job-categories': 'GET/POST/PUT/DELETE /api/crud/job-categories',
        'document-types': 'GET/POST/PUT/DELETE /api/crud/document-types'
      },
      'Transaction Data': {
        'user-roles': 'GET/POST/DELETE /api/crud/user-roles',
        'role-permissions': 'GET/POST/DELETE /api/crud/role-permissions',
        'activity-logs': 'GET/POST/DELETE /api/crud/activity-logs',
        'job-assignments': 'GET/POST/PUT/DELETE /api/crud/job-assignments',
        'job-status-reports': 'GET/POST/PUT/DELETE /api/crud/job-status-reports',
        'job-comments': 'GET/POST/PUT/DELETE /api/crud/job-comments',
        'client-companies': 'GET/POST/DELETE /api/crud/client-companies',
        'client-contacts': 'GET/POST/PUT/DELETE /api/crud/client-contacts'
      },
      'Document Management': {
        'employee-documents': 'GET/POST/PUT/DELETE /api/crud/employee-documents',
        'job-documents': 'GET/POST/PUT/DELETE /api/crud/job-documents'
      },
      'Financial': {
        'job-billing': 'GET/POST/PUT/DELETE /api/crud/job-billing'
      }
    },
    notes: {
      'Authentication': 'All endpoints require proper authentication',
      'Validation': 'Request data is validated using express-validator',
      'Error Handling': 'Proper HTTP status codes and error messages are returned',
      'Database': 'All operations are performed on SQLite database with foreign key constraints'
    }
  });
});

// Health check endpoint
router.get('/health', (req, res) => {
  const db = req.app.locals.db;
  
  db.get("SELECT 1 as test", [], (err, row) => {
    if (err) {
      return res.status(500).json({
        status: 'unhealthy',
        database: 'disconnected',
        error: err.message
      });
    }
    
    res.json({
      status: 'healthy',
      database: 'connected',
      timestamp: new Date().toISOString()
    });
  });
});

module.exports = router;