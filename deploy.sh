#!/bin/bash

###############################################################################
# Deployment Script for jiilanporto
# This script automates the deployment process on VPS
###############################################################################

set -e  # Exit on error

echo "🚀 Starting deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}→ $1${NC}"
}

# Check if running on correct directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

# Pull latest changes
print_info "Pulling latest changes from GitHub..."
git pull origin main
print_success "Code updated"

# Install dependencies
print_info "Installing dependencies..."
npm ci --production=false
print_success "Dependencies installed"

# Generate Prisma Client
print_info "Generating Prisma Client..."
npx prisma generate
print_success "Prisma Client generated"

# Run database migrations
print_info "Running database migrations..."
npx prisma migrate deploy
print_success "Migrations completed"

# Build the application
print_info "Building Next.js application..."
npm run build
print_success "Build completed"

# Restart PM2 process
print_info "Restarting application..."
if pm2 show jiilanporto > /dev/null 2>&1; then
    pm2 restart jiilanporto
    print_success "Application restarted"
else
    pm2 start ecosystem.config.js
    pm2 save
    print_success "Application started"
fi

# Show status
print_info "Application status:"
pm2 status jiilanporto

print_success "🎉 Deployment completed successfully!"
print_info "Your app should be running on: https://jiilan.thecodesorcerer.com"
