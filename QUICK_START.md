# Quick Start Guide

Follow these steps to get the application running on your local machine.

## ⚡ 5-Minute Setup

### Step 1: Prerequisites
- [Node.js](https://nodejs.org/) (v14+)
- [MongoDB](https://www.mongodb.com/try/download/community) or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Cloud)
- Git

### Step 2: Clone or Navigate to Project
```bash
# If cloning:
git clone https://github.com/YOUR_USERNAME/student-course-registration.git
cd student_management

# Or if already in the directory:
cd "e:\KU ALl SEM\Sem 6\Full Stack\Praticals\student_management"
```

### Step 3: Install Dependencies
```bash
npm install
```

This installs:
- express (web framework)
- mongoose (MongoDB ODM)
- cors (cross-origin requests)
- dotenv (environment variables)
- bcryptjs (password hashing)
- jsonwebtoken (JWT auth)

### Step 4: Configure MongoDB

**Option A: Local MongoDB**
```bash
# Windows
mongod

# macOS/Linux
brew services start mongodb-community
```

**Option B: MongoDB Cloud (Recommended)**
1. Create free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Replace MONGODB_URI in `.env` with your connection string

### Step 5: Update .env File
```
MONGODB_URI=mongodb://localhost:27017/student_registration
PORT=5000
JWT_SECRET=your_super_secret_key_change_in_production
NODE_ENV=development
```

### Step 6: Start the Server
```bash
npm start
```

You should see:
```
Server running on http://localhost:5000
MongoDB connected successfully
```

### Step 7: Open in Browser
Navigate to: **http://localhost:5000**

## 🎯 Test the Application

### Register a New Student
1. Click "Register" tab
2. Fill in:
   - Full Name: John Doe
   - Roll Number: CS001
   - Email: john@example.com
   - Password: password123
3. Click "Register"
4. Auto-login should happen

### Create Sample Courses (Backend Only)

Open Postman or Thunder Client and POST to:
```
http://localhost:5000/api/courses
```

Headers:
```
Content-Type: application/json
```

Body:
```json
{
  "courseCode": "CS101",
  "name": "Introduction to Programming",
  "description": "Learn the basics of programming with JavaScript",
  "instructor": "Prof. Smith",
  "credits": 3,
  "semester": "Spring",
  "capacity": 60,
  "schedule": {
    "days": ["Monday", "Wednesday", "Friday"],
    "time": "9:00 AM - 10:30 AM",
    "room": "Lab 101"
  }
}
```

### Browse Courses in App
1. Click "Browse Courses" tab
2. Click "Enroll" on any course
3. Course appears in "My Courses"

## 🛠 Development Mode

For development with auto-reload:
```bash
npm run dev
```

This uses nodemon to restart the server on file changes.

## 🐛 Troubleshooting

### MongoDB Connection Failed
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**:
- Ensure MongoDB is running
- Check MongoDB is on port 27017
- Try MongoDB Atlas cloud instead

### Port 5000 Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**:
```bash
# Change port in .env
PORT=3000

# Or kill process using port 5000
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

### CORS Error in Frontend
```
Access to XMLHttpRequest has been blocked by CORS policy
```
**Solution**:
- Ensure CORS middleware is in server.js
- Check API_URL in public/script.js matches your server URL

### Can't Login
```
Invalid email or password
```
**Solution**:
- Double-check email and password
- Ensure student is registered first
- Check browser localStorage is enabled

## 📱 Frontend Testing (Browser DevTools)

### Open Developer Tools
- Press **F12** or **Ctrl+Shift+I**

### Check Console
- Look for JavaScript errors
- View console.log() outputs
- Check for network errors

### Check Network
- Go to "Network" tab
- Perform login/register
- View API request/response
- Check headers and body

### Check Storage
- Go to "Application" → "Local Storage"
- View authToken
- View currentStudent JSON

## 📊 Sample Data for Testing

### Test Login Credentials
```
Email: john@example.com
Password: password123
Roll: CS001
```

### Sample Course
```
Code: CS101
Name: Introduction to Programming
Instructor: Prof. Smith
Credits: 3
Semester: Spring
Capacity: 60
```

## ✅ Verification Checklist

- [ ] Node.js installed (`node --version`)
- [ ] MongoDB running
- [ ] `.env` file configured
- [ ] `npm install` completed
- [ ] Server started without errors
- [ ] http://localhost:5000 opens in browser
- [ ] Can register a student
- [ ] Can login with created account
- [ ] Can see dashboard
- [ ] Browser DevTools shows no errors

## 🚀 Next Steps

1. **Create sample courses** via API or add MongoDB seed script
2. **Test enrollment** in the UI
3. **Debug with DevTools** to understand flow
4. **Deploy to GitHub** using GITHUB_DEPLOYMENT.md
5. **Deploy to Heroku/Azure** for live hosting

## 📚 Useful Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [JavaScript Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [JWT Introduction](https://jwt.io/introduction)
- [Google Chrome DevTools](https://developer.chrome.com/docs/devtools/)

## 💬 Need Help?

1. Check console errors (F12)
2. Review terminal output
3. Check MongoDB connection
4. Read README.md
5. Review API documentation in README.md

---

**Status**: ✅ Ready to Run
**Last Updated**: March 30, 2026
