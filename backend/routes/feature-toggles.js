/**
 * Feature Toggles API Routes
 * Created: 2025-07-11
 */

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { authenticateToken } = require('../../middleware/auth');
const { checkPermissions } = require('../../middleware/rbac');
const { dbMethods } = require('../../modules/database/backend');

/**
 * @route GET /api/feature-toggles
 * @description Get all feature toggles
 * @access Private - Requires feature_toggle_view permission or Admin role
 */
router.get('/', [
  authenticateToken,
  (req, res, next) => {
    // Allow access if user has feature_toggle_view permission OR is Admin
    const userRoles = req.user.roles || [];
    const userPermissions = req.user.permissions || [];
    
    // Check if user is admin (case insensitive)
    const isAdmin = userRoles.some(role => 
      role.toLowerCase() === 'admin' || role === 'Admin'
    );
    
    if (userPermissions.includes('feature_toggle_view') || isAdmin) {
      next();
    } else {
      return res.status(403).json({ 
        error: 'Access denied: insufficient permissions',
        required: ['feature_toggle_view or Admin role']
      });
    }
  }
], async (req, res) => {
  try {
    const db = req.app.locals.db;
    const eventBus = req.app.locals.eventBus;
    
    const featureToggles = await dbMethods.all(db, 
      'SELECT * FROM feature_toggles ORDER BY feature_name', 
      []
    );
    
    // Log activity
    eventBus.emit('log:activity', {
      user_id: req.user.user_id,
      action: 'FEATURE_TOGGLE_LIST_VIEW',
      details: 'Viewed all feature toggles',
      ip_address: req.ip,
      user_agent: req.headers['user-agent']
    });
    
    return res.json(featureToggles);
  } catch (error) {
    console.error('Error fetching feature toggles:', error);
    return res.status(500).json({ error: 'Failed to fetch feature toggles' });
  }
});

/**
 * @route GET /api/feature-toggles/:name
 * @description Get a specific feature toggle by name
 * @access Private - Requires feature_toggle_view permission or Admin role
 */
router.get('/:name', [
  authenticateToken,
  (req, res, next) => {
    // Allow access if user has feature_toggle_view permission OR is Admin
    const userRoles = req.user.roles || [];
    const userPermissions = req.user.permissions || [];
    
    // Check if user is admin (case insensitive)
    const isAdmin = userRoles.some(role => 
      role.toLowerCase() === 'admin' || role === 'Admin'
    );
    
    if (userPermissions.includes('feature_toggle_view') || isAdmin) {
      next();
    } else {
      return res.status(403).json({ 
        error: 'Access denied: insufficient permissions',
        required: ['feature_toggle_view or Admin role']
      });
    }
  }
], async (req, res) => {
  try {
    const toggleName = req.params.name;
    const db = req.app.locals.db;
    
    const featureToggle = await dbMethods.get(db, 
      'SELECT * FROM feature_toggles WHERE feature_name = ?', 
      [toggleName]
    );
    
    if (!featureToggle) {
      return res.status(404).json({ error: 'Feature toggle not found' });
    }
    
    return res.json(featureToggle);
  } catch (error) {
    console.error(`Error fetching feature toggle ${req.params.name}:`, error);
    return res.status(500).json({ error: 'Failed to fetch feature toggle' });
  }
});

/**
 * @route POST /api/feature-toggles
 * @description Create a new feature toggle
 * @access Private - Requires feature_toggle_create permission or Admin role
 */
router.post('/', [
  authenticateToken,
  (req, res, next) => {
    // Allow access if user has feature_toggle_create permission OR is Admin
    const userRoles = req.user.roles || [];
    const userPermissions = req.user.permissions || [];
    
    // Check if user is admin (case insensitive)
    const isAdmin = userRoles.some(role => 
      role.toLowerCase() === 'admin' || role === 'Admin'
    );
    
    if (userPermissions.includes('feature_toggle_create') || isAdmin) {
      next();
    } else {
      return res.status(403).json({ 
        error: 'Access denied: insufficient permissions',
        required: ['feature_toggle_create or Admin role']
      });
    }
  },
  body('feature_name').notEmpty().withMessage('Feature toggle name is required')
    .matches(/^[a-z0-9_]+$/).withMessage('Feature name must contain only lowercase letters, numbers, and underscores'),
  body('description').notEmpty().withMessage('Description is required'),
  body('is_enabled').isBoolean().withMessage('is_enabled must be a boolean')
], async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { feature_name, description, is_enabled } = req.body;
    const db = req.app.locals.db;
    const eventBus = req.app.locals.eventBus;
    
    // Check if feature toggle already exists
    const existingToggle = await dbMethods.get(db, 
      'SELECT * FROM feature_toggles WHERE feature_name = ?', 
      [feature_name]
    );
    
    if (existingToggle) {
      return res.status(409).json({ error: 'Feature toggle already exists' });
    }
    
    // Convert boolean to integer for SQLite
    const isEnabledValue = is_enabled ? 1 : 0;
    
    // Create feature toggle
    await dbMethods.run(db, 
      'INSERT INTO feature_toggles (feature_name, description, is_enabled) VALUES (?, ?, ?)', 
      [feature_name, description, isEnabledValue]
    );
    
    // Log activity
    eventBus.emit('log:activity', {
      user_id: req.user.user_id,
      action: 'FEATURE_TOGGLE_CREATED',
      details: `Created feature toggle '${feature_name}' with status ${is_enabled ? 'enabled' : 'disabled'}`,
      ip_address: req.ip,
      user_agent: req.headers['user-agent']
    });
    
    // Get the newly created feature toggle
    const newToggle = await dbMethods.get(db, 
      'SELECT * FROM feature_toggles WHERE feature_name = ?', 
      [feature_name]
    );
    
    return res.status(201).json(newToggle);
  } catch (error) {
    console.error('Error creating feature toggle:', error);
    return res.status(500).json({ error: 'Failed to create feature toggle' });
  }
});

/**
 * @route DELETE /api/feature-toggles/:name
 * @description Delete a feature toggle
 * @access Private - Requires feature_toggle_delete permission or Admin role
 */
router.delete('/:name', [
  authenticateToken,
  (req, res, next) => {
    // Allow access if user has feature_toggle_delete permission OR is Admin
    const userRoles = req.user.roles || [];
    const userPermissions = req.user.permissions || [];
    
    // Check if user is admin (case insensitive)
    const isAdmin = userRoles.some(role => 
      role.toLowerCase() === 'admin' || role === 'Admin'
    );
    
    if (userPermissions.includes('feature_toggle_delete') || isAdmin) {
      next();
    } else {
      return res.status(403).json({ 
        error: 'Access denied: insufficient permissions',
        required: ['feature_toggle_delete or Admin role']
      });
    }
  }
], async (req, res) => {
  try {
    const toggleName = req.params.name;
    const db = req.app.locals.db;
    const eventBus = req.app.locals.eventBus;
    
    // Check if feature toggle exists
    const existingToggle = await dbMethods.get(db, 
      'SELECT * FROM feature_toggles WHERE feature_name = ?', 
      [toggleName]
    );
    
    if (!existingToggle) {
      return res.status(404).json({ error: 'Feature toggle not found' });
    }
    
    // Delete feature toggle
    await dbMethods.run(db, 
      'DELETE FROM feature_toggles WHERE feature_name = ?', 
      [toggleName]
    );
    
    // Log activity
    eventBus.emit('log:activity', {
      user_id: req.user.user_id,
      action: 'FEATURE_TOGGLE_DELETED',
      details: `Deleted feature toggle '${toggleName}'`,
      ip_address: req.ip,
      user_agent: req.headers['user-agent']
    });
    
    return res.json({ success: true, message: `Feature toggle '${toggleName}' deleted` });
  } catch (error) {
    console.error(`Error deleting feature toggle ${req.params.name}:`, error);
    return res.status(500).json({ error: 'Failed to delete feature toggle' });
  }
});

/**
 * @route PATCH /api/feature-toggles/update
 * @description Update a feature toggle status
 * @access Private - Requires feature_toggle_edit permission or Admin role
 */
router.patch('/update', [
  authenticateToken,
  (req, res, next) => {
    // Allow access if user has feature_toggle_edit permission OR is Admin
    const userRoles = req.user.roles || [];
    const userPermissions = req.user.permissions || [];
    
    // Check if user is admin (case insensitive)
    const isAdmin = userRoles.some(role => 
      role.toLowerCase() === 'admin' || role === 'Admin'
    );
    
    if (userPermissions.includes('feature_toggle_edit') || isAdmin) {
      next();
    } else {
      return res.status(403).json({ 
        error: 'Access denied: insufficient permissions',
        required: ['feature_toggle_edit or Admin role']
      });
    }
  },
  body('name').notEmpty().withMessage('Feature toggle name is required'),
  body('is_enabled').isBoolean().withMessage('is_enabled must be a boolean')
], async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { name, is_enabled } = req.body;
    const db = req.app.locals.db;
    const eventBus = req.app.locals.eventBus;
    
    // Check if feature toggle exists
    const existingToggle = await dbMethods.get(db, 
      'SELECT * FROM feature_toggles WHERE feature_name = ?', 
      [name]
    );
    
    if (!existingToggle) {
      return res.status(404).json({ error: 'Feature toggle not found' });
    }
    
    // Convert boolean to integer for SQLite
    const isEnabledValue = is_enabled ? 1 : 0;
    
    // Update feature toggle
    await dbMethods.run(db, 
      'UPDATE feature_toggles SET is_enabled = ? WHERE feature_name = ?', 
      [isEnabledValue, name]
    );
    
    // Log activity
    eventBus.emit('log:activity', {
      user_id: req.user.user_id,
      action: 'FEATURE_TOGGLE_UPDATED',
      details: `Updated feature toggle '${name}' to ${is_enabled ? 'enabled' : 'disabled'}`,
      ip_address: req.ip,
      user_agent: req.headers['user-agent']
    });
    
    // Get updated feature toggle
    const updatedToggle = await dbMethods.get(db, 
      'SELECT * FROM feature_toggles WHERE feature_name = ?', 
      [name]
    );
    
    // Emit event for feature toggle change
    eventBus.emit(`feature-toggle:${name}`, {
      name,
      is_enabled: !!updatedToggle.is_enabled,
      updated_by: req.user.user_id
    });
    
    return res.json(updatedToggle);
  } catch (error) {
    console.error('Error updating feature toggle:', error);
    return res.status(500).json({ error: 'Failed to update feature toggle' });
  }
});

module.exports = router;
