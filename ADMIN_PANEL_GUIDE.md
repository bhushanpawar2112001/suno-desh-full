# 🎯 NewsHub Admin Panel - Complete Guide

## 🚀 **How to Access and Use the Admin Panel**

### **1. Login to Admin Panel**
- **URL**: Go to `http://localhost:4200/login`
- **Demo Credentials**:
  - **Email**: `admin@newshub.com`
  - **Password**: `admin123`

### **2. Admin Panel Features**

#### **📊 Dashboard**
- **Real-time Statistics**: View total articles, categories, users, and views
- **Recent Articles**: See latest published articles with quick edit access
- **Category Distribution**: Visual breakdown of articles by category
- **Top Performing Articles**: Articles with highest views and engagement
- **Quick Actions**: Direct links to create articles, categories, and users

#### **📝 Articles Management**
- **View All Articles**: Complete list with pagination
- **Article Statistics**: Published, draft, and total view counts
- **Create New Articles**: Full form with bilingual support (English/Hindi)
- **Edit Articles**: Modify existing articles
- **Delete Articles**: Remove articles with confirmation
- **Article Details**: View images, categories, authors, and metadata

#### **📂 Categories Management**
- **View All Categories**: List with article counts and status
- **Create Categories**: Add new categories with bilingual names
- **Edit Categories**: Modify category details
- **Delete Categories**: Remove categories (with article cleanup)
- **Category Stats**: Active/inactive counts and article distribution

#### **👥 Users Management**
- **View All Users**: Complete user list with roles and status
- **User Statistics**: Total users, active users, admins, and editors
- **Create Users**: Add new users with role assignment
- **Edit Users**: Modify user details and permissions
- **Delete Users**: Remove users from the system
- **User Profiles**: View user activity and login history

### **3. Step-by-Step Usage**

#### **Creating Your First Article**
1. Login to admin panel
2. Click "Articles" in the sidebar
3. Click "Create Article" button
4. Fill in the form:
   - **Title** (English & Hindi)
   - **Content** (English & Hindi)
   - **Excerpt** (English & Hindi)
   - **Category** (select from dropdown)
   - **Featured Image** (URL)
   - **Status** (Draft/Published)
   - **Tags** (optional)
5. Click "Create Article"

#### **Adding a New Category**
1. Go to "Categories" section
2. Click "Add Category"
3. Fill in:
   - **Name** (English & Hindi)
   - **Description** (English & Hindi)
   - **Status** (Active/Inactive)
4. Click "Create Category"

#### **Managing Users**
1. Go to "Users" section
2. Click "Add User"
3. Fill in user details:
   - **Name** (First & Last)
   - **Email**
   - **Password**
   - **Role** (User/Editor/Admin)
   - **Status** (Active/Inactive)
4. Click "Create User"

### **4. Key Features**

#### **🌐 Bilingual Support**
- All content supports both English and Hindi
- Category names and descriptions in both languages
- Article titles, content, and excerpts in both languages

#### **📱 Responsive Design**
- Works on desktop, tablet, and mobile
- Adaptive layout for all screen sizes
- Touch-friendly interface

#### **⚡ Real-time Data**
- Live statistics from backend
- Automatic data refresh
- Real-time updates

#### **🔐 Security**
- Protected admin routes
- User authentication
- Role-based access control

### **5. Troubleshooting**

#### **If Login Doesn't Work**
- Ensure backend is running (`npm run start:dev` in backend folder)
- Check if frontend is running (`npm start` in frontend folder)
- Verify credentials: `admin@newshub.com` / `admin123`

#### **If Data Doesn't Load**
- Check browser console for errors
- Verify backend API is accessible
- Ensure MongoDB connection is working

#### **If Forms Don't Submit**
- Check all required fields are filled
- Verify network connection
- Check browser console for API errors

### **6. API Endpoints Used**

The admin panel uses these backend endpoints:
- `GET /articles` - Get all articles
- `POST /articles` - Create new article
- `PUT /articles/:id` - Update article
- `DELETE /articles/:id` - Delete article
- `GET /categories` - Get all categories
- `POST /categories` - Create new category
- `PUT /categories/:id` - Update category
- `DELETE /categories/:id` - Delete category
- `GET /users` - Get all users
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### **7. Quick Start Checklist**

- [ ] Backend server running (`cd backend && npm run start:dev`)
- [ ] Frontend server running (`cd frontend && npm start`)
- [ ] MongoDB connected and seeded with data
- [ ] Login with demo credentials
- [ ] Test creating an article
- [ ] Test creating a category
- [ ] Test creating a user
- [ ] Verify data appears on main website

### **8. Support**

If you encounter any issues:
1. Check the browser console for errors
2. Verify all servers are running
3. Check network connectivity
4. Ensure MongoDB is properly connected

---

**🎉 Your NewsHub Admin Panel is now fully functional!** 