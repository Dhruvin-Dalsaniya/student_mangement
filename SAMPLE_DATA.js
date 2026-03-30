// Sample Data for Testing
// Use Postman, Thunder Client, or curl to populate the database

// ============================================
// SAMPLE STUDENT DATA
// ============================================

// Sample Student 1 (for registration test)
{
  "name": "Raj Kumar",
  "email": "raj@example.com",
  "password": "password123",
  "rollNumber": "CS001"
}

// Sample Student 2
{
  "name": "Priya Singh",
  "email": "priya@example.com",
  "password": "password123",
  "rollNumber": "CS002"
}

// Sample Student 3
{
  "name": "Amit Patel",
  "email": "amit@example.com",
  "password": "password123",
  "rollNumber": "CS003"
}

// ============================================
// SAMPLE COURSE DATA
// ============================================

// Course 1: Introduction to Programming
{
  "courseCode": "CS101",
  "name": "Introduction to Programming",
  "description": "Learn the fundamentals of programming with JavaScript. This course covers loops, functions, arrays, and object-oriented programming concepts.",
  "instructor": "Prof. Robert Smith",
  "credits": 3,
  "semester": "Spring",
  "capacity": 60,
  "schedule": {
    "days": ["Monday", "Wednesday", "Friday"],
    "time": "9:00 AM - 10:30 AM",
    "room": "Lab 101"
  }
}

// Course 2: Web Development
{
  "courseCode": "CS102",
  "name": "Web Development with HTML, CSS & JavaScript",
  "description": "Build responsive and interactive websites using HTML5, CSS3, and JavaScript. Learn DOM manipulation, event handling, and Fetch API.",
  "instructor": "Prof. Sarah Johnson",
  "credits": 3,
  "semester": "Spring",
  "capacity": 50,
  "schedule": {
    "days": ["Tuesday", "Thursday"],
    "time": "10:00 AM - 11:30 AM",
    "room": "Lab 202"
  }
}

// Course 3: Database Management
{
  "courseCode": "CS103",
  "name": "Database Management with MongoDB",
  "description": "Master NoSQL databases with MongoDB. Learn data modeling, CRUD operations, aggregation, and indexing for efficient data management.",
  "instructor": "Prof. Michael Chen",
  "credits": 4,
  "semester": "Spring",
  "capacity": 45,
  "schedule": {
    "days": ["Monday", "Wednesday"],
    "time": "11:00 AM - 12:30 PM",
    "room": "Lab 103"
  }
}

// Course 4: Backend Development
{
  "courseCode": "CS104",
  "name": "Backend Development with Node.js & Express",
  "description": "Build robust server-side applications using Node.js and Express.js. Learn routing, middleware, authentication, and RESTful API design.",
  "instructor": "Prof. David Williams",
  "credits": 3,
  "semester": "Spring",
  "capacity": 40,
  "schedule": {
    "days": ["Tuesday", "Thursday", "Friday"],
    "time": "2:00 PM - 3:30 PM",
    "room": "Lab 204"
  }
}

// Course 5: Full Stack Development
{
  "courseCode": "CS105",
  "name": "Full Stack Web Application Development",
  "description": "Complete guide to building full-stack applications. Integrate frontend, backend, and database for production-ready applications.",
  "instructor": "Prof. Emily Brown",
  "credits": 4,
  "semester": "Spring",
  "capacity": 35,
  "schedule": {
    "days": ["Monday", "Wednesday", "Friday"],
    "time": "3:00 PM - 4:30 PM",
    "room": "Lab 305"
  }
}

// Course 6: JavaScript Fundamentals
{
  "courseCode": "CS106",
  "name": "Advanced JavaScript",
  "description": "Deep dive into JavaScript ES6+. Learn closures, promises, async/await, and functional programming paradigms.",
  "instructor": "Prof. James Wilson",
  "credits": 3,
  "semester": "Fall",
  "capacity": 55,
  "schedule": {
    "days": ["Tuesday", "Thursday"],
    "time": "1:00 PM - 2:30 PM",
    "room": "Lab 106"
  }
}

// Course 7: Web Security
{
  "courseCode": "CS107",
  "name": "Web Security & Best Practices",
  "description": "Learn security vulnerabilities, authentication, authorization, encryption, and secure coding practices for web applications.",
  "instructor": "Prof. Lisa Anderson",
  "credits": 3,
  "semester": "Fall",
  "capacity": 40,
  "schedule": {
    "days": ["Monday", "Friday"],
    "time": "10:00 AM - 11:30 AM",
    "room": "Lab 207"
  }
}

// Course 8: API Development
{
  "courseCode": "CS108",
  "name": "RESTful API Design & Development",
  "description": "Build scalable and efficient APIs. Learn RESTful principles, API documentation, versioning, performance optimization.",
  "instructor": "Prof. Kevin Lee",
  "credits": 3,
  "semester": "Fall",
  "capacity": 45,
  "schedule": {
    "days": ["Wednesday", "Friday"],
    "time": "2:00 PM - 3:30 PM",
    "room": "Lab 308"
  }
}

// ============================================
// HOW TO SEED THE DATABASE
// ============================================

/*
OPTION 1: Using Postman or Thunder Client
============================================

1. Register students:
   - POST to http://localhost:5000/api/students/register
   - Send student data from above
   - Save the returned token

2. Create courses:
   - POST to http://localhost:5000/api/courses
   - Send course data from above
   - (Note: May need admin token - currently not implemented)

3. Enroll students:
   - POST to http://localhost:5000/api/courses/enroll
   - Headers: Authorization: Bearer <token>
   - Body:
     {
       "studentId": "<student-id>",
       "courseId": "<course-id>"
     }

OPTION 2: Create a seed.js script
=================================

const mongoose = require('mongoose');
const Course = require('./models/Course');
const Student = require('./models/Student');
require('dotenv').config();

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Course.deleteMany({});
    await Student.deleteMany({});

    // Create courses
    const courses = [
      // Course data from above...
    ];

    const createdCourses = await Course.insertMany(courses);
    console.log(`Created ${createdCourses.length} courses`);

    // Create students
    const students = [
      // Student data from above...
    ];

    const createdStudents = await Student.insertMany(students);
    console.log(`Created ${createdStudents.length} students`);

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seedDatabase();

// Run with: node seed.js

OPTION 3: Manual via MongoDB Compass
====================================

1. Open MongoDB Compass
2. Connect to your MongoDB instance
3. Create database "student_registration"
4. Create collection "courses"
5. Insert documents with course data
6. Create collection "students"
7. Insert documents with student data
*/

// ============================================
// TESTING WORKFLOW
// ============================================

/*
1. REGISTER STUDENTS
   POST /api/students/register
   - Register Raj Kumar (CS001)
   - Register Priya Singh (CS002)
   - Register Amit Patel (CS003)

2. CREATE COURSES
   POST /api/courses
   - Create all 8 sample courses

3. LOGIN
   POST /api/students/login
   - Login as Raj Kumar
   - Save token from response

4. ENROLL IN COURSES
   POST /api/courses/enroll
   - Enroll Raj in CS101, CS102, CS103
   - Use saved token in Authorization header

5. VIEW DASHBOARD
   - Login in web app
   - Check "My Courses" tab
   - See enrolled courses
   - Check "Browse Courses" tab
   - See available courses

6. DROP COURSE
   POST /api/courses/drop
   - Drop CS101
   - Verify it's removed from "My Courses"

7. GET ENROLLMENTS
   GET /api/courses/student/<studentId>/enrollments
   - View all student enrollments

8. VIEW ALL STUDENTS
   GET /api/students
   - See all registered students

9. VIEW ALL COURSES
   GET /api/courses
   - See all available courses with enrollment status
*/

// ============================================
// EXPECTED RESPONSES
// ============================================

// Register Success
{
  "success": true,
  "message": "Student registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "student": {
    "id": "60f7c3a0a1b2c3d4e5f6g7h8",
    "name": "Raj Kumar",
    "email": "raj@example.com",
    "rollNumber": "CS001"
  }
}

// Login Success
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "student": {
    "id": "60f7c3a0a1b2c3d4e5f6g7h8",
    "name": "Raj Kumar",
    "email": "raj@example.com",
    "rollNumber": "CS001"
  }
}

// Enroll Success
{
  "success": true,
  "message": "Student enrolled successfully",
  "enrollment": {
    "_id": "60f7c3a0a1b2c3d4e5f6g7h9",
    "studentId": "60f7c3a0a1b2c3d4e5f6g7h8",
    "courseId": "60f7c3a0a1b2c3d4e5f6g7h0",
    "enrollmentDate": "2024-03-30T10:30:00.000Z",
    "grade": "Pending",
    "status": "Active"
  }
}

// Error Response
{
  "success": false,
  "message": "Student already enrolled in this course"
}
*/
