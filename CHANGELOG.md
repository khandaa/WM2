# Changelog

All notable changes to this project will be documented in this file.

## [0.1.4] - 2025-08-17

### Fixed
- Corrected syntax errors and inconsistencies in `db/wm_db.sql`.

## [0.1.3] - 2025-08-06

### Added
- Added ZeptoMailer PHP class for sending emails via the ZeptoMail API
- Implemented parameterized email sending with support for customizable sender, recipient, subject, and body content
- Created EZeptoMailer Yii 1.1 extension with enhanced features:
  - Template-based email support
  - Configurable default sender information
  - Built-in logging and error handling
  - Integration with Yii's component system

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
