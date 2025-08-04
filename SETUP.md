# NewsHub Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm (v8 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Installation

#### Option 1: Automated Installation (Recommended)
```bash
# On Windows
install.bat

# On macOS/Linux
chmod +x install.sh
./install.sh
```

#### Option 2: Manual Installation
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### Environment Setup

1. **Copy environment file**:
   ```bash
   cp backend/env.example backend/.env
   ```

2. **Update backend/.env** with your configuration:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/newshub
   
   # JWT
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRES_IN=7d
   
   # Server
   PORT=3000
   NODE_ENV=development
   
   # CORS
   CORS_ORIGIN=http://localhost:4200
   ```

### Running the Application

#### Development Mode
```bash
# Start both frontend and backend
npm run dev

# Or start individually
npm run dev:frontend  # Frontend only
npm run dev:backend   # Backend only
```

#### Production Build
```bash
npm run build
```

## 📁 Project Structure

```
NewsHub/
├── backend/                 # NestJS API
│   ├── src/
│   │   ├── auth/           # Authentication
│   │   ├── users/          # User management
│   │   ├── articles/       # Article management
│   │   ├── categories/     # Category management
│   │   └── main.ts         # Application entry point
│   ├── package.json
│   └── env.example
├── frontend/               # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/ # Reusable components
│   │   │   ├── pages/      # Page components
│   │   │   └── services/   # API services
│   │   ├── main.ts
│   │   └── styles.scss
│   ├── package.json
│   └── angular.json
├── package.json            # Root package.json
├── README.md
└── SETUP.md
```

## 🌐 Access Points

- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:3000
- **Admin Panel**: http://localhost:4200/admin
- **API Documentation**: http://localhost:3000/api

## 🔧 Features

### Frontend (Angular)
- ✅ Modern, responsive UI with Tailwind CSS
- ✅ Angular Material components
- ✅ Public news portal
- ✅ Admin panel with dashboard
- ✅ Article management
- ✅ Category management
- ✅ User management
- ✅ SEO-friendly routing

### Backend (NestJS)
- ✅ RESTful API with Swagger documentation
- ✅ JWT authentication
- ✅ MongoDB integration with Mongoose
- ✅ User management with roles
- ✅ Article CRUD operations
- ✅ Category management
- ✅ Input validation
- ✅ Error handling

### Database (MongoDB)
- ✅ User schema with roles
- ✅ Article schema with relationships
- ✅ Category schema
- ✅ Timestamps and soft deletes

## 🛠️ Development

### Adding New Features

1. **Backend**: Add new modules in `backend/src/`
2. **Frontend**: Add new components in `frontend/src/app/`
3. **Database**: Update schemas as needed

### API Endpoints

#### Authentication
- `POST /auth/login` - User login

#### Articles
- `GET /articles` - Get all articles
- `GET /articles/featured` - Get featured articles
- `GET /articles/:id` - Get article by ID
- `GET /articles/slug/:slug` - Get article by slug
- `POST /articles` - Create article
- `PATCH /articles/:id` - Update article
- `DELETE /articles/:id` - Delete article

#### Categories
- `GET /categories` - Get all categories
- `GET /categories/:id` - Get category by ID
- `GET /categories/slug/:slug` - Get category by slug
- `POST /categories` - Create category
- `PATCH /categories/:id` - Update category
- `DELETE /categories/:id` - Delete category

#### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create user
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

## 🚀 Deployment

### Backend Deployment
1. Set `NODE_ENV=production` in environment
2. Run `npm run build` in backend directory
3. Deploy `dist/` folder to your server
4. Set up MongoDB connection

### Frontend Deployment
1. Run `npm run build` in frontend directory
2. Deploy `dist/newshub/` folder to your web server
3. Configure API base URL for production

## 🔒 Security

- JWT token authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- Environment variable protection

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env`

2. **Port Already in Use**
   - Change port in `.env` file
   - Kill existing processes

3. **Angular Build Errors**
   - Clear node_modules and reinstall
   - Check Angular version compatibility

4. **CORS Errors**
   - Verify CORS_ORIGIN in backend `.env`
   - Check frontend API base URL

## 📞 Support

For issues and questions:
1. Check the troubleshooting section
2. Review API documentation at `/api`
3. Check console logs for errors
4. Verify environment configuration 