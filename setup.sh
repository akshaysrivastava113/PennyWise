#!/bin/bash
# setup.sh

# Create project structure
mkdir -p src/{config,controllers,middlewares,models/interfaces,routes,services,utils} tests/{unit,integration}

# Initialize project
npm init -y

# Install core dependencies
npm install express cors helmet dotenv winston
npm install zod # For validation
npm install express-rate-limit # For rate limiting

# Install TypeScript and types
npm install -D typescript ts-node @types/node @types/express @types/cors
npm install -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install -D jest ts-jest @types/jest supertest
npm install -D nodemon cross-env

# Configure TypeScript
npx tsc --init