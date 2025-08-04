# MongoDB Setup Guide

## Option 1: MongoDB Atlas (Recommended - Free Cloud Database)

1. **Sign up for MongoDB Atlas**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a free account
   - Create a new cluster (free tier)

2. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string

3. **Update Environment File**
   - Copy `backend/env.example` to `backend/.env`
   - Replace the `MONGODB_URI` with your Atlas connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/newshub?retryWrites=true&w=majority
   ```

## Option 2: Local MongoDB Installation

### Windows
1. Download MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Install with default settings
3. Start MongoDB service:
   ```cmd
   net start MongoDB
   ```

### macOS (with Homebrew)
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```

### Linux (Ubuntu)
```bash
sudo apt update
sudo apt install mongodb
sudo systemctl start mongod
sudo systemctl enable mongod
```

## Verify Connection
After setting up MongoDB, restart the backend:
```bash
npm run dev:backend
```

You should see: `✅ MongoDB connected successfully`

## Troubleshooting
- If you see connection errors, make sure MongoDB is running
- For Atlas: Check your IP whitelist and credentials
- For local: Ensure the MongoDB service is started 