# Student Course Registration System

A full-stack web application for student course registration built with **Node.js**, **Express.js**, **MongoDB**, and vanilla **JavaScript/HTML5/CSS3**.

## 📋 Features

- **Student Authentication**: Register and login functionality with JWT tokens
- **Course Management**: Browse available courses and view detailed course information
- **Course Enrollment**: Students can enroll in courses with capacity management
- **Drop Courses**: Remove courses from enrollment
- **Responsive Design**: Mobile-friendly interface built with HTML5 and CSS3
- **Form Validation**: Client-side and server-side validation
- **Real-time Updates**: Dynamic content updates using Fetch API
- **Data Persistence**: MongoDB database for storing students, courses, and enrollments

## 🛠 Tech Stack

### Frontend
- HTML5
- CSS3 (Responsive Design)
- JavaScript (ES6+)
- Fetch API for HTTP requests
- DOM API for dynamic content updates

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose (ODM)
- JWT Authentication
- bcryptjs for password hashing
- CORS for cross-origin requests

### Tools & Deployment
- Git for version control
- GitHub for repository hosting
- VS Code for development
- Browser DevTools for debugging
- npm for package management

## 📁 Project Structure

```
student_management/
├── public/
│   ├── index.html          # Main application page
│   ├── styles.css          # Styling
│   └── script.js           # Frontend JavaScript logic
├── models/
│   ├── Student.js          # Student schema
│   ├── Course.js           # Course schema
│   └── Enrollment.js       # Enrollment schema
├── controllers/
│   ├── studentController.js # Student logic (register, login, etc.)
│   └── courseController.js  # Course and enrollment logic
├── routes/
│   ├── studentRoutes.js    # Student API routes
│   └── courseRoutes.js     # Course API routes
├── server.js               # Express server entry point
├── package.json            # Dependencies
├── .env                    # Environment variables
├── .gitignore              # Git ignore rules
└── README.md              # Documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Git
- VS Code (recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd student_management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Edit `.env` file with your MongoDB connection string and JWT secret
   ```
   MONGODB_URI=mongodb://localhost:27017/student_registration
   PORT=5000
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

4. **Start MongoDB**
   ```bash
   # On Windows
   mongod
   ```

5. **Start the server**
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

6. **Open in browser**
   - Navigate to `http://localhost:5000`

## 📚 API Endpoints

### Student Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/students/register` | Register new student |
| POST | `/api/students/login` | Login student |
| GET | `/api/students` | Get all students |
| GET | `/api/students/:id` | Get student profile |
| PUT | `/api/students/:id` | Update student profile |

### Course Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/courses` | Create course (admin) |
| GET | `/api/courses` | Get all courses |
| GET | `/api/courses/:id` | Get course details |
| PUT | `/api/courses/:id` | Update course (admin) |
| DELETE | `/api/courses/:id` | Delete course (admin) |
| POST | `/api/courses/enroll` | Enroll student in course |
| POST | `/api/courses/drop` | Drop course |
| GET | `/api/courses/student/:studentId/enrollments` | Get student enrollments |

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. When a student registers or logs in, a JWT token is generated
2. The token is stored in browser's localStorage
3. Token is sent with requests in Authorization header: `Bearer <token>`
4. Token expires after 30 days

## 📝 Example API Usage

### Register Student
```bash
curl -X POST http://localhost:5000/api/students/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "rollNumber": "CS001"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/students/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Enroll in Course
```bash
curl -X POST http://localhost:5000/api/courses/enroll \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "studentId": "<student-id>",
    "courseId": "<course-id>"
  }'
```

## 🧪 Testing with Browser DevTools

1. **Open DevTools**: Press `F12` or right-click → Inspect
2. **Network Tab**: Monitor API requests and responses
3. **Console Tab**: Check for JavaScript errors and logs
4. **Application Tab**: View localStorage data (token and student info)
5. **Elements Tab**: Inspect HTML and CSS
6. **Debugger Tab**: Set breakpoints and debug JavaScript

## 📱 Frontend Features

### Authentication Page
- Login form for existing students
- Registration form for new students
- Form validation
- Error/success messages

### Dashboard
- Student profile display
- Two main sections:
  - **My Courses**: Enrolled courses with drop option
  - **Browse Courses**: Available courses with enrollment option
- Course cards showing:
  - Course code and name
  - Instructor information
  - Credits and semester
  - Enrollment status
  - Schedule and room details
  - Actions (Enroll/Drop)

## 🔄 Data Models

### Student
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  rollNumber: String (unique),
  enrolledCourses: [ObjectId],
  createdAt: Date
}
```

### Course
```javascript
{
  courseCode: String (unique),
  name: String,
  description: String,
  instructor: String,
  credits: Number,
  semester: String,
  capacity: Number,
  enrolledStudents: [ObjectId],
  schedule: {
    days: [String],
    time: String,
    room: String
  },
  createdAt: Date
}
```

### Enrollment
```javascript
{
  studentId: ObjectId,
  courseId: ObjectId,
  enrollmentDate: Date,
  grade: String,
  status: String
}
```

## 🌐 Deployment

### Deploy to Heroku
1. Create Heroku account
2. Install Heroku CLI
3. Deploy:
   ```bash
   heroku create app-name
   heroku config:set MONGODB_URI=<your-mongodb-uri>
   git push heroku main
   ```

### Deploy to Azure/AWS
- Use MongoDB Atlas for database
- Deploy Node.js server to cloud platform
- Update API_URL in frontend/script.js

## 🐛 Debugging

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check MONGODB_URI in .env
   - Verify network access if using MongoDB Atlas

2. **CORS Error**
   - Check that CORS is enabled in server.js
   - Verify API_URL in frontend script.js

3. **Authentication Issues**
   - Clear localStorage and login again
   - Check JWT_SECRET in .env
   - Verify token is being sent in headers

4. **Course Enrollment Issues**
   - Check course capacity
   - Verify no duplicate enrollments
   - Check unique index on Enrollment model

## 📖 Development Tips

1. **Use VS Code Extensions**:
   - Thunder Client or REST Client for API testing
   - MongoDB for Database Manager
   - Prettier for code formatting

2. **Debug Frontend**:
   - Use console.log() for debugging
   - Check Network tab for API responses
   - Inspect element styles with DevTools

3. **Debug Backend**:
   - Add console.log() in controllers
   - Use Node.js debugger
   - Check server logs in terminal

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

College Administration - Student Course Registration System

## 📞 Support

For issues and questions, please open an issue in the GitHub repository.

## 🎯 Future Enhancements

- [ ] Admin dashboard for course and student management
- [ ] Grade management system
- [ ] Course prerequisites validation
- [ ] Notification system (email)
- [ ] Payment integration for course fees
- [ ] Course reviews and ratings
- [ ] Transcript generation
- [ ] Advanced search and filtering
- [ ] Two-factor authentication
- [ ] Mobile app (React Native)

---

**Note**: This application is built as an educational project following full-stack web development best practices using HTML5, CSS3, JavaScript, Node.js, Express.js, and MongoDB.
