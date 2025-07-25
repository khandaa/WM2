#!/bin/bash
# Install dependencies script for WM2 application

echo "Installing main dependencies..."
npm install

echo "Installing backend dependencies..."
cd backend
npm install express express-validator jsonwebtoken bcryptjs dotenv sqlite3
cd ..

echo "Installing module dependencies..."
# List all module directories
MODULE_DIRS=(
  "modules/authentication/backend"
  "modules/user_management/backend"
  "modules/role_management/backend"
  "modules/permission_management/backend"
  "modules/logging/backend"
  "modules/database/backend"
  "modules/payment/backend"
)

# Install dependencies in each module directory
for dir in "${MODULE_DIRS[@]}"; do
  if [ -d "$dir" ]; then
    echo "Installing dependencies in $dir"
    cd "$dir"
    npm install express express-validator jsonwebtoken bcryptjs dotenv
    cd - > /dev/null
  fi
done

echo "Installing middleware dependencies..."
cd middleware
npm install jsonwebtoken
cd ..

echo "All dependencies installed successfully!"
