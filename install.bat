@echo off
echo 🚀 Installing NewsHub - News Website
echo =====================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ Node.js and npm are installed

REM Install root dependencies
echo 📦 Installing root dependencies...
call npm install

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd backend
call npm install --legacy-peer-deps
cd ..

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd frontend
call npm install --legacy-peer-deps
cd ..

REM Create environment file for backend
echo 🔧 Setting up environment configuration...
if not exist "backend\.env" (
    copy "backend\env.example" "backend\.env"
    echo ✅ Created backend\.env file
    echo ⚠️  Please update backend\.env with your MongoDB connection string and JWT secret
) else (
    echo ✅ backend\.env already exists
)

echo.
echo 🎉 Installation completed!
echo.
echo Next steps:
echo 1. Update backend\.env with your MongoDB connection string
echo 2. Start MongoDB service
echo 3. Run 'npm run dev' to start both frontend and backend
echo.
echo Access the application:
echo - Frontend: http://localhost:4200
echo - Backend API: http://localhost:3000
echo - Admin Panel: http://localhost:4200/admin
echo - API Documentation: http://localhost:3000/api
pause 