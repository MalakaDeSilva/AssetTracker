#!/bin/bash

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Check if app is built
if [ ! -d "dist" ]; then
  echo "Building the app..."
  npm run build
fi

package='cross-env'
if [ `npm list | grep -c $package` -eq 0 ]; then
  echo "Preparing environment..."
  npm install --save-dev cross-env
fi

# Start Application
echo "Starting the app..."
npx kill-port 3000
npm run d-start && read -p "Press enter to exit..."