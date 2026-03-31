# Student Placement Management System

> **Owner:** Nikki

A full-stack web application built with the MERN stack (MongoDB, Express.js, React, Node.js) for managing student placement data efficiently.

## 🎯 Features

### Authentication
- User registration and login
- Session-based authentication
- Protected routes

### Student Management
- Add, view, update, and delete students
- Fields: name, branch, cgpa, email, phone
- Search functionality by name, email, or branch

### Company Management
- Add, view, update, and delete companies
- Fields: company_name, location, package, job_role
- Search functionality by company name, location, or job role

### Placement Management
- Assign students to companies
- Track placement status and interview rounds
- View detailed placement history

### Dashboard
- Overview statistics
- Quick action buttons
- Placement rate calculations

## 🗄️ Database Schema

### Collections

#### Users
```javascript
{
  username: String,
  email: String,
  password: String (hashed),
  role: String (admin/user)
}
```

#### Students
```javascript
{
  name: String,
  branch: String,
  cgpa: Number,
  email: String,
  phone: String,
  placed: Boolean
}
```

#### Companies
```javascript
{
  company_name: String,
  location: String,
  package: Number,
  job_role: String,
  active: Boolean
}
```

#### Placements
```javascript
{
  studentId: ObjectId (ref: Student),
  companyId: ObjectId (ref: Company),
  placement_date: Date,
  status: String (Pending/Selected/Rejected/On Hold),
  interview_round: String,
  notes: String
}
```

## 🛠️ Technology Stack

- **Frontend**: React 18, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: bcryptjs for password hashing
- **Styling**: Custom CSS with flexbox/grid

## 📁 Project Structure

```
student-placement-tracker/
├── server/
│   ├── models/
│   │   ├── User.js
│   │   ├── Student.js
│   │   ├── Company.js
│   │   └── Placement.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── students.js
│   │   ├── companies.js
│   │   └── placements.js
│   ├── package.json
│   ├── server.js
│   └── .env.example
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.js
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Students.js
│   │   │   ├── AddStudent.js
│   │   │   ├── Companies.js
│   │   │   ├── AddCompany.js
│   │   │   ├── Placements.js
│   │   │   └── AddPlacement.js
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── README.md
```

## 🚀 How to Run This Project

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (installed and running) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** (comes with Node.js)

### Step 1: Clone the Repository

```bash
git clone https://github.com/Nikhitagrace/student-placement-tracker.git
cd student-placement-tracker
```

### Step 2: Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file from example
cp .env.example .env

# Edit .env file with your MongoDB connection string
# Default: MONGODB_URI=mongodb://127.0.0.1:27017/placementDB
```

### Step 3: Frontend Setup

```bash
# Open a new terminal and navigate to client directory
cd client

# Install dependencies
npm install
```

### Step 4: MongoDB Setup

#### Option 1: Using MongoDB Compass (Recommended for beginners)

1. Download and install [MongoDB Compass](https://www.mongodb.com/try/download/compass)
2. Open MongoDB Compass
3. Connect to: `mongodb://127.0.0.1:27017`
4. Create a new database named: `placementDB`
5. Collections will be created automatically when the application runs

#### Option 2: Using MongoDB Shell

```bash
# Start MongoDB service (if not running)
mongod

# Open MongoDB shell in another terminal
mongo

# Create database
use placementDB

# Collections will be created automatically
```

### Step 5: Running the Application

#### Terminal 1 - Start Backend Server

```bash
# Navigate to server directory
cd server

# Start the server
npm start
```

✅ Backend will run on `http://localhost:5000`

#### Terminal 2 - Start Frontend Development Server

```bash
# Navigate to client directory
cd client

# Start the development server
npm start
```

✅ Frontend will run on `http://localhost:3000`

### Step 6: Access the Application

Open your browser and navigate to: **http://localhost:3000**

## 🌐 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |

### Students
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students` | Get all students (with search) |
| GET | `/api/students/:id` | Get single student |
| POST | `/api/students` | Add new student |
| PUT | `/api/students/:id` | Update student |
| DELETE | `/api/students/:id` | Delete student |

### Companies
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/companies` | Get all companies (with search) |
| GET | `/api/companies/:id` | Get single company |
| POST | `/api/companies` | Add new company |
| PUT | `/api/companies/:id` | Update company |
| DELETE | `/api/companies/:id` | Delete company |

### Placements
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/placements` | Get all placements |
| GET | `/api/placements/:id` | Get single placement |
| POST | `/api/placements` | Add new placement |
| PUT | `/api/placements/:id` | Update placement |
| DELETE | `/api/placements/:id` | Delete placement |
| GET | `/api/placements/student/:studentId` | Get placements by student |
| GET | `/api/placements/company/:companyId` | Get placements by company |

## 🧪 Sample Data

### Sample User
```json
{
  "username": "admin",
  "email": "admin@example.com",
  "password": "admin123"
}
```

### Sample Student
```json
{
  "name": "John Doe",
  "branch": "Computer Science",
  "cgpa": 8.5,
  "email": "john@example.com",
  "phone": "1234567890"
}
```

### Sample Company
```json
{
  "company_name": "Tech Solutions Inc.",
  "location": "Bangalore, Karnataka",
  "package": 12.5,
  "job_role": "Software Engineer"
}
```

### Sample Placement
```json
{
  "studentId": "student_object_id",
  "companyId": "company_object_id",
  "placement_date": "2024-03-15",
  "status": "Selected",
  "interview_round": "Final",
  "notes": "Excellent performance"
}
```

## 🎨 UI Features

- **Responsive Design**: Works on desktop and mobile devices
- **Clean Interface**: Modern, user-friendly design
- **Real-time Search**: Instant search functionality
- **Status Indicators**: Visual status badges
- **Data Tables**: Organized data display
- **Form Validation**: Client-side validation
- **Error Handling**: User-friendly error messages

## 🔧 Development Features

- **Hot Reload**: Development server with hot reload
- **Environment Variables**: Secure configuration
- **Error Handling**: Comprehensive error handling
- **Input Validation**: Server and client-side validation
- **Password Hashing**: Secure password storage
- **CORS Enabled**: Cross-origin resource sharing

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running: `mongod`
   - Check connection string in `.env` file
   - Verify database name is correct

2. **CORS Error**
   - Backend server must be running on port 5000
   - Frontend proxy configuration in client/package.json

3. **Module Not Found**
   - Run `npm install` in both server and client directories
   - Check if all dependencies are installed

4. **Port Already in Use**
   - Windows: `netstat -ano | findstr :5000` then `taskkill /PID <PID> /F`
   - Mac/Linux: `lsof -ti:5000 | xargs kill -9`
   - Or change ports in configuration files

5. **Permission Denied (Mac/Linux)**
   - Run commands with `sudo` if needed
   - Or fix npm permissions: `npm config set prefix ~/.npm-global`

## 📝 How MERN Stack Works

### Data Flow

1. **Frontend (React)**: User interacts with the UI
2. **API Request**: React app sends HTTP requests to Express server
3. **Backend (Express)**: Server receives requests, validates data
4. **Database (MongoDB)**: Express interacts with MongoDB via Mongoose
5. **Response**: Data flows back through the same path to update UI

### Why MongoDB?

- **Flexible Schema**: No rigid table structure
- **Scalability**: Easy to scale horizontally
- **JSON-like Documents**: Natural fit with JavaScript
- **Rich Queries**: Powerful querying capabilities
- **Performance**: Fast for read-heavy applications

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Create a Pull Request

## 📞 Support

For any queries or issues, please contact the owner **Nikki** or create an issue in the repository.

---

**Built with ❤️ by Nikki**