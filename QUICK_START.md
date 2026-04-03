# 🚀 Quick Start Guide

## 📋 Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (installed and running)
- **npm** or **yarn**

---

## ⚡ Quick Setup (5 Minutes)

### 1. **Start Backend Server**
```bash
cd server
npm install
npm start
```
✅ Server runs on: `http://localhost:5000`

### 2. **Start Frontend**
```bash
cd client
npm install
npm start
```
✅ Frontend runs on: `http://localhost:3000`

### 3. **Access the Application**
Open your browser and go to: `http://localhost:3000`

---

## 👤 Default Users

### **Admin Account**
- **Email**: `admin@example.com`
- **Password**: `Admin123`
- **Access**: Full system management

### **Student Account**
- **Email**: `student@example.com`  
- **Password**: `Student123`
- **Access**: Personal placement tracking

> 💡 **Note**: If these users don't exist, register them first at `/register`

---

## 🎯 What You Can Do

### **As Admin**
- ✅ Manage all students
- ✅ Manage all companies
- ✅ Create/update placements
- ✅ View system statistics
- ✅ Full CRUD operations

### **As Student**
- ✅ View your placement status
- ✅ Track interview progress
- ✅ View company details
- ✅ Access personal dashboard

---

## 🔗 Quick Links

| Page | URL | Access |
|------|-----|--------|
| **Login** | `http://localhost:3000/login` | All Users |
| **Register** | `http://localhost:3000/register` | All Users |
| **Admin Dashboard** | `http://localhost:3000/admin-dashboard` | Admin Only |
| **Student Dashboard** | `http://localhost:3000/student-dashboard` | Student Only |
| **Students Management** | `http://localhost:3000/students` | Admin Only |
| **Companies Management** | `http://localhost:3000/companies` | Admin Only |
| **Placements** | `http://localhost:3000/placements` | All Users |

---

## 🧪 Quick Test

### **1. Test Admin Access**
1. Login as `admin@example.com` / `Admin123`
2. You should see **Admin Dashboard**
3. Try accessing `/students` - should work
4. Try adding a new student/company

### **2. Test Student Access**
1. Login as `student@example.com` / `Student123`
2. You should see **Student Dashboard**
3. Try accessing `/students` - should show **Access Denied**
4. Check your placement status

### **3. Test Security**
1. Try accessing admin pages without logging in
2. Try wrong passwords
3. Verify role-based navigation works

---

## 🔧 Troubleshooting

### **Server Issues**
```bash
# Check if MongoDB is running
mongod

# Kill existing Node processes
taskkill /F /IM node.exe

# Restart server
cd server && npm start
```

### **Frontend Issues**
```bash
# Clear node_modules and reinstall
cd client
rmdir /s node_modules
npm install
npm start
```

### **Common Errors**
- **EADDRINUSE**: Port already in use → Kill Node processes
- **MongoDB connection failed**: Start MongoDB service
- **401/403 Errors**: Normal - security is working!

---

## 🎯 Demo Flow

### **For Presentations**
1. **Show Login Page** - Clean, professional interface
2. **Admin Login** - Demonstrate full management capabilities
3. **Add Student/Company** - Show CRUD operations
4. **Create Placement** - Show relationship management
5. **Student Login** - Show limited access
6. **Student Dashboard** - Show personal tracking
7. **Security Test** - Try accessing admin pages as student

---

## 📱 Features Highlight

### **Security**
- 🔐 Header-based authentication
- 🛡️ Role-based access control
- 🔒 Protected API endpoints
- ✅ Input validation

### **User Experience**
- 📊 Role-based dashboards
- 🎨 Clean, modern UI
- 📱 Responsive design
- ⚡ Fast navigation

### **Data Management**
- 📚 Full CRUD operations
- 🔍 Search functionality
- 📈 Statistics dashboard
- 🗃️ Relationship management

---

## 🚀 Ready to Go!

Your system is now **demo-ready** with:
- ✅ Complete role-based security
- ✅ Professional user interfaces  
- ✅ Protected API endpoints
- ✅ Error handling and validation
- ✅ Clean user experience

**Start presenting!** 🎉

---

## 📞 Need Help?

- Check: `ROLE_BASED_UPGRADE_GUIDE.md` for detailed setup
- Verify: MongoDB is running on default port
- Test: With provided user credentials
- Ensure: Both servers are running (backend on 5000, frontend on 3000)

**Happy Demonstrating!** 🚀
