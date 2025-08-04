#!/bin/bash

echo "🚀 Installing NewsHub - News Website"
echo "====================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install --legacy-peer-deps
cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install --legacy-peer-deps
cd ..

# Create environment file for backend
echo "🔧 Setting up environment configuration..."
if [ ! -f backend/.env ]; then
    cp backend/env.example backend/.env
    echo "✅ Created backend/.env file"
    echo "⚠️  Please update backend/.env with your MongoDB connection string and JWT secret"
else
    echo "✅ backend/.env already exists"
fi

echo ""
echo "🎉 Installation completed!"
echo ""
echo "Next steps:"
echo "1. Update backend/.env with your MongoDB connection string"
echo "2. Start MongoDB service"
echo "3. Run 'npm run dev' to start both frontend and backend"
echo ""
echo "Access the application:"
echo "- Frontend: http://localhost:4200"
echo "- Backend API: http://localhost:3000"
echo "- Admin Panel: http://localhost:4200/admin"
echo "- API Documentation: http://localhost:3000/api" 