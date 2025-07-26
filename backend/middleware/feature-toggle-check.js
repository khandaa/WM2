/**
 * Feature Toggle Check Middleware
 * Created: 2025-07-26
 * 
 * This middleware checks if a feature toggle is enabled before processing a request.
 * If the feature is disabled, the request is rejected with a 403 status.
 * Admin users always have access to all features regardless of toggle status.
 */

const { dbMethods } = require('../../modules/database/backend');

/**
 * Check if a feature is enabled
 * 
 * @param {string} featureName - The name of the feature to check
 * @returns {Function} Express middleware function
 */
const checkFeatureEnabled = (featureName) => {
  return async (req, res, next) => {
    try {
      // Admin users always have access to all features
      const userRoles = req.user?.roles || [];
      if (userRoles.includes('Admin') || userRoles.includes('admin')) {
        return next();
      }

      const db = req.app.locals.db;
      
      // Check if the feature toggle exists and is enabled
      const feature = await dbMethods.get(db, 
        'SELECT * FROM feature_toggles WHERE feature_name = ?', 
        [featureName]
      );
      
      if (feature && feature.is_enabled) {
        return next(); // Feature is enabled, proceed
      }
      
      // Feature is disabled or doesn't exist
      return res.status(403).json({ 
        error: 'Feature disabled',
        message: `The '${featureName}' feature is currently disabled`,
        feature: featureName
      });
      
    } catch (error) {
      console.error(`Error checking feature toggle '${featureName}':`, error);
      // If we can't check, allow access but log the error
      return next();
    }
  };
};

module.exports = {
  checkFeatureEnabled
};
