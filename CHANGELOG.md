# Changelog

All notable changes to this project will be documented in this file.

## [0.1.2] - 2025-07-26

### Added
- Added specific feature toggles:
  - permission_create
  - permission_delete
  - feature_toggle_create
  - feature_toggle_delete
- Added API endpoints for creating and deleting feature toggles
- Updated frontend API service with new feature toggle methods

## [0.1.1] - 2025-07-26

### Added
- Integrated feature toggle system for all CRUD routes
- Added middleware for feature toggle checking
- Created database seed script for feature toggles
- Granted admin access to all features by default
- Added dynamic feature toggle checking based on HTTP method and resource

## [0.1.0] - 2025-07-26

### Added
- Initial project setup
- Created SQLite database schema in wm_db.sql
- Added seed data for initial database population
- Created WorkManagement.db from schema
- Added installation script for dependencies
- Fixed backend dependency issues
- Updated database file references in backend
