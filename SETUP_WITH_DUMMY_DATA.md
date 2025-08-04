# SUNODESH News Website Setup Guide

## 🎯 **Features Added:**

### ✅ **Database with Dummy Data**
- 6 news categories (Politics, Technology, Business, Sports, Entertainment, Health)
- 8 articles with Hindi and English content
- 2 user accounts (Admin & Editor)
- Realistic news content with proper metadata

### ✅ **Hindi/English Language Toggle**
- Language toggle button in header
- Content displays in both Hindi and English
- Language preference saved in localStorage
- Smooth switching between languages

## 🚀 **Quick Setup:**

### 1. **Set up MongoDB Connection**
Create `backend/.env` file:
```env
# Database - Using MongoDB Atlas
MONGODB_URI=mongodb+srv://kryupa:WfPassw0rd@kryupa.6elfh.mongodb.net/newshub?retryWrites=true&w=majority&appName=kryupa

# JWT
JWT_SECRET=your-super-secret-jwt-key-here-change-in-production
JWT_EXPIRES_IN=7d

# Server
PORT=3000
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:4200
```

### 2. **Install Dependencies**
```bash
# Install all dependencies
npm run install:all
```

### 3. **Start the Application**
```bash
# Start both frontend and backend
npm run dev
```

### 4. **Seed the Database**
```bash
# Install axios if not already installed
npm install axios

# Run the seeding script
node seed-database.js
```

## 🌐 **Access Points:**

- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:3000
- **Admin Panel**: http://localhost:4200/admin
- **API Documentation**: http://localhost:3000/api

## 🔑 **Login Credentials:**

### Admin Account:
- **Email**: admin@sunodesh.com
- **Password**: admin123

### Editor Account:
- **Email**: editor@sunodesh.com
- **Password**: admin123

## 📰 **Dummy Data Included:**

### **Categories:**
1. **Politics** (राजनीति) - Political news and updates
2. **Technology** (प्रौद्योगिकी) - Tech innovations and breakthroughs
3. **Business** (व्यापार) - Business and economic news
4. **Sports** (खेल) - Sports news and updates
5. **Entertainment** (मनोरंजन) - Entertainment and celebrity news
6. **Health** (स्वास्थ्य) - Health and medical news

### **Sample Articles:**
- AI Breakthrough in Healthcare (English/Hindi)
- Major Political Reform Announced (English/Hindi)
- Stock Market Reaches New Heights (English/Hindi)
- Cricket Team Wins Championship (English/Hindi)
- Bollywood Stars Shine at Awards (English/Hindi)
- Quantum Computing Milestone (English/Hindi)
- Opposition Parties Unite (English/Hindi)
- New Medical Discovery (English/Hindi)

## 🌍 **Language Toggle Feature:**

### **How to Use:**
1. Click the language toggle button in the header (EN/हिंदी)
2. Content switches between English and Hindi
3. Language preference is saved automatically
4. All news content is available in both languages

### **Features:**
- ✅ Breaking news banner in both languages
- ✅ Article titles and content in Hindi/English
- ✅ Category names in both languages
- ✅ Navigation labels in both languages
- ✅ Persistent language preference

## 🎨 **Design Features:**

### **Traditional News Channel Look:**
- ✅ Red color scheme (traditional news color)
- ✅ Breaking news banner with animation
- ✅ Main headline with featured image
- ✅ Sidebar with quick headlines
- ✅ Latest news grid layout
- ✅ Category navigation with icons
- ✅ Professional typography

### **Responsive Design:**
- ✅ Mobile-friendly layout
- ✅ Tablet and desktop optimized
- ✅ Clean, newspaper-style design
- ✅ Easy navigation

## 🔧 **Technical Stack:**

### **Frontend:**
- Angular 17 (Standalone Components)
- Angular Material
- Tailwind CSS
- TypeScript
- RxJS for state management

### **Backend:**
- NestJS
- MongoDB with Mongoose
- JWT Authentication
- Swagger API Documentation
- CORS enabled

### **Database:**
- MongoDB Atlas (Cloud)
- Structured schemas for articles, categories, users
- Hindi and English content support

## 🚀 **Next Steps:**

1. **Customize Content**: Replace dummy data with real news content
2. **Add Images**: Replace placeholder images with real news images
3. **User Management**: Implement user registration and profile management
4. **Comments System**: Add commenting functionality
5. **Search Feature**: Implement article search
6. **Social Sharing**: Add social media sharing buttons
7. **Newsletter**: Implement email newsletter subscription
8. **Analytics**: Add user analytics and tracking

## 🐛 **Troubleshooting:**

### **MongoDB Connection Issues:**
- Check if MongoDB Atlas cluster is running
- Verify connection string in `.env` file
- Ensure IP whitelist includes your IP address

### **Frontend Issues:**
- Clear browser cache
- Check browser console for errors
- Ensure all dependencies are installed

### **Backend Issues:**
- Check if port 3000 is available
- Verify all environment variables are set
- Check backend logs for detailed error messages

## 📞 **Support:**

If you encounter any issues:
1. Check the console logs for error messages
2. Verify all setup steps are completed
3. Ensure MongoDB connection is working
4. Restart the development servers if needed

---

**🎉 Enjoy your SUNODESH News Website with Hindi/English language support!** 