/**
 * Feature Toggles Seed Script
 * Created: 2025-07-26
 * 
 * This script initializes all CRUD operation feature toggles in the database.
 * It creates feature toggles for each CRUD operation (GET, POST, PUT, DELETE) 
 * for all resources in the system.
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Database initialization
const dbPath = path.join(__dirname, 'workManagement.db');

// Connect to database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    process.exit(1);
  }
  console.log('Connected to the SQLite database');
});

// Ensure feature_toggles table exists
const createTableSQL = `
CREATE TABLE IF NOT EXISTS feature_toggles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  feature_name TEXT NOT NULL UNIQUE,
  description TEXT,
  is_enabled INTEGER DEFAULT 1,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);
`;

db.run(createTableSQL, async (err) => {
  if (err) {
    console.error('Error creating feature_toggles table:', err.message);
    db.close();
    process.exit(1);
  }
  
  console.log('Feature toggles table exists');
  
  // Define the CRUD resources from the crud-index.js file
  const crudResources = [
    // Master Data
    'users', 'roles', 'permissions', 'employees', 'teams', 
    'departments', 'clients', 'companies', 'jobs', 
    'job-categories', 'document-types',
    
    // Transaction Data
    'user-roles', 'role-permissions', 'activity-logs', 
    'job-assignments', 'job-status-reports', 'job-comments',
    'client-companies', 'client-contacts',
    
    // Document Management
    'employee-documents', 'job-documents',
    
    // Financial
    'job-billing'
  ];
  
  // Define the CRUD operations
  const operations = ['read', 'create', 'update', 'delete'];
  
  // Check if toggle exists and insert if not
  const checkAndInsertToggle = (name, description) => {
    return new Promise((resolve, reject) => {
      db.get('SELECT id FROM feature_toggles WHERE feature_name = ?', [name], (err, row) => {
        if (err) {
          reject(err);
          return;
        }
        
        if (row) {
          console.log(`Toggle '${name}' already exists, skipping...`);
          resolve();
          return;
        }
        
        db.run(
          'INSERT INTO feature_toggles (feature_name, description, is_enabled) VALUES (?, ?, 1)',
          [name, description],
          function(err) {
            if (err) {
              reject(err);
              return;
            }
            console.log(`Created toggle '${name}'`);
            resolve();
          }
        );
      });
    });
  };
  
  // Insert all feature toggles
  const togglePromises = [];
  
  for (const resource of crudResources) {
    for (const operation of operations) {
      const toggleName = `crud_${operation}_${resource.replace(/-/g, '_')}`;
      const description = `Controls access to ${operation.toUpperCase()} operations on ${resource}`;
      togglePromises.push(checkAndInsertToggle(toggleName, description));
    }
  }
  
  try {
    await Promise.all(togglePromises);
    console.log('All feature toggles have been created');
    
    // Add specific feature toggles requested
    const specificToggles = [
      // Feature toggle management permissions
      { name: 'feature_toggle_view', description: 'Allows viewing feature toggle settings' },
      { name: 'feature_toggle_edit', description: 'Allows editing feature toggle settings' },
      { name: 'feature_toggle_create', description: 'Allows creating new feature toggles' },
      { name: 'feature_toggle_delete', description: 'Allows deleting existing feature toggles' },
      
      // Permission management permissions
      { name: 'permission_create', description: 'Allows creating new permissions' },
      { name: 'permission_delete', description: 'Allows deleting existing permissions' }
    ];
    
    const specificTogglePromises = specificToggles.map(toggle => 
      checkAndInsertToggle(toggle.name, toggle.description)
    );
    
    await Promise.all(specificTogglePromises);
    console.log('Specific feature toggles added');
    
    db.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding feature toggles:', error);
    db.close();
    process.exit(1);
  }
});
