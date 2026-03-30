# API Testing Guide

Complete guide to test all API endpoints using curl, Postman, or Thunder Client.

## 🔧 Testing Tools

### Option 1: cURL (Command Line)
Pre-installed on most systems. Run commands in terminal.

### Option 2: Postman
Download from [postman.com](https://www.postman.com/downloads/)

### Option 3: Thunder Client
VS Code extension. Install from Extensions marketplace.

### Option 4: REST Client
VS Code extension. Create `.http` files with requests.

## 📋 Base URL

```
http://localhost:5000/api
```

## ✅ Student Authentication API

### 1. Register New Student

**Endpoint**: `POST /students/register`

**cURL**:
```bash
curl -X POST http://localhost:5000/api/students/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Raj Kumar",
    "email": "raj@example.com",
    "password": "password123",
    "rollNumber": "CS001"
  }'
```

**Postman**:
- Method: POST
- URL: `http://localhost:5000/api/students/register`
- Headers: `Content-Type: application/json`
- Body:
```json
{
  "name": "Raj Kumar",
  "email": "raj@example.com",
  "password": "password123",
  "rollNumber": "CS001"
}
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Student registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "student": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Raj Kumar",
    "email": "raj@example.com",
    "rollNumber": "CS001"
  }
}
```

---

### 2. Login Student

**Endpoint**: `POST /students/login`

**cURL**:
```bash
curl -X POST http://localhost:5000/api/students/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "raj@example.com",
    "password": "password123"
  }'
```

**Response**: Same as register, includes JWT token

**Save Token**: Store the returned token for subsequent requests
```
Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### 3. Get All Students

**Endpoint**: `GET /students`

**cURL**:
```bash
curl -X GET http://localhost:5000/api/students
```

**Headers**: None required

**Response**:
```json
{
  "success": true,
  "students": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Raj Kumar",
      "email": "raj@example.com",
      "rollNumber": "CS001",
      "enrolledCourses": [],
      "createdAt": "2024-03-30T10:00:00.000Z"
    }
  ]
}
```

---

### 4. Get Student Profile

**Endpoint**: `GET /students/:id`

**cURL**:
```bash
curl -X GET http://localhost:5000/api/students/507f1f77bcf86cd799439011
```

**Replace** `507f1f77bcf86cd799439011` with actual student ID

**Response**:
```json
{
  "success": true,
  "student": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Raj Kumar",
    "email": "raj@example.com",
    "rollNumber": "CS001",
    "enrolledCourses": ["507f1f77bcf86cd799439012"],
    "createdAt": "2024-03-30T10:00:00.000Z"
  }
}
```

---

### 5. Update Student Profile

**Endpoint**: `PUT /students/:id`

**cURL**:
```bash
curl -X PUT http://localhost:5000/api/students/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Raj Kumar Singh",
    "email": "raj.new@example.com"
  }'
```

**Body** (optional fields):
```json
{
  "name": "New Name",
  "email": "newemail@example.com"
}
```

---

## 📚 Course Management API

### 1. Create Course (Admin)

**Endpoint**: `POST /courses`

**cURL**:
```bash
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "courseCode": "CS101",
    "name": "Introduction to Programming",
    "description": "Learn programming fundamentals",
    "instructor": "Prof. Smith",
    "credits": 3,
    "semester": "Spring",
    "capacity": 60,
    "schedule": {
      "days": ["Monday", "Wednesday", "Friday"],
      "time": "9:00 AM - 10:30 AM",
      "room": "Lab 101"
    }
  }'
```

**Response**:
```json
{
  "success": true,
  "message": "Course created successfully",
  "course": {
    "_id": "507f1f77bcf86cd799439012",
    "courseCode": "CS101",
    "name": "Introduction to Programming",
    "description": "Learn programming fundamentals",
    "instructor": "Prof. Smith",
    "credits": 3,
    "semester": "Spring",
    "capacity": 60,
    "enrolledStudents": [],
    "schedule": {
      "days": ["Monday", "Wednesday", "Friday"],
      "time": "9:00 AM - 10:30 AM",
      "room": "Lab 101"
    }
  }
}
```

---

### 2. Get All Courses

**Endpoint**: `GET /courses`

**cURL**:
```bash
curl -X GET http://localhost:5000/api/courses
```

**Response**:
```json
{
  "success": true,
  "courses": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "courseCode": "CS101",
      "name": "Introduction to Programming",
      "instructor": "Prof. Smith",
      "credits": 3,
      "semester": "Spring",
      "capacity": 60,
      "enrolledStudents": ["507f1f77bcf86cd799439011"]
    }
  ]
}
```

---

### 3. Get Course Details

**Endpoint**: `GET /courses/:id`

**cURL**:
```bash
curl -X GET http://localhost:5000/api/courses/507f1f77bcf86cd799439012
```

---

### 4. Update Course

**Endpoint**: `PUT /courses/:id`

**cURL**:
```bash
curl -X PUT http://localhost:5000/api/courses/507f1f77bcf86cd799439012 \
  -H "Content-Type: application/json" \
  -d '{
    "capacity": 65,
    "instructor": "Prof. Johnson"
  }'
```

---

### 5. Delete Course

**Endpoint**: `DELETE /courses/:id`

**cURL**:
```bash
curl -X DELETE http://localhost:5000/api/courses/507f1f77bcf86cd799439012
```

---

## 🎓 Enrollment API

### 1. Enroll Student in Course

**Endpoint**: `POST /courses/enroll`

**cURL**:
```bash
curl -X POST http://localhost:5000/api/courses/enroll \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "studentId": "507f1f77bcf86cd799439011",
    "courseId": "507f1f77bcf86cd799439012"
  }'
```

**Headers**:
- `Content-Type: application/json`
- `Authorization: Bearer <token>` (Replace with actual token)

**Body**:
```json
{
  "studentId": "507f1f77bcf86cd799439011",
  "courseId": "507f1f77bcf86cd799439012"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Student enrolled successfully",
  "enrollment": {
    "_id": "507f1f77bcf86cd799439013",
    "studentId": "507f1f77bcf86cd799439011",
    "courseId": "507f1f77bcf86cd799439012",
    "enrollmentDate": "2024-03-30T10:30:00.000Z",
    "grade": "Pending",
    "status": "Active"
  }
}
```

---

### 2. Drop Course

**Endpoint**: `POST /courses/drop`

**cURL**:
```bash
curl -X POST http://localhost:5000/api/courses/drop \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "studentId": "507f1f77bcf86cd799439011",
    "courseId": "507f1f77bcf86cd799439012"
  }'
```

**Response**:
```json
{
  "success": true,
  "message": "Course dropped successfully"
}
```

---

### 3. Get Student Enrollments

**Endpoint**: `GET /courses/student/:studentId/enrollments`

**cURL**:
```bash
curl -X GET http://localhost:5000/api/courses/student/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Response**:
```json
{
  "success": true,
  "enrollments": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "studentId": "507f1f77bcf86cd799439011",
      "courseId": {
        "_id": "507f1f77bcf86cd799439012",
        "courseCode": "CS101",
        "name": "Introduction to Programming"
      },
      "enrollmentDate": "2024-03-30T10:30:00.000Z",
      "grade": "Pending",
      "status": "Active"
    }
  ]
}
```

---

## 📊 Complete Testing Workflow

### Step 1: Register Two Students

**Student 1**:
```bash
curl -X POST http://localhost:5000/api/students/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Raj Kumar",
    "email": "raj@example.com",
    "password": "pass123",
    "rollNumber": "CS001"
  }'
```

Save the token as `TOKEN1`

**Student 2**:
```bash
curl -X POST http://localhost:5000/api/students/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Priya Singh",
    "email": "priya@example.com",
    "password": "pass123",
    "rollNumber": "CS002"
  }'
```

Save the token as `TOKEN2`

---

### Step 2: Create 3 Courses

**Course 1**:
```bash
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "courseCode": "CS101",
    "name": "Programming Basics",
    "description": "Learn fundamentals",
    "instructor": "Prof. Smith",
    "credits": 3,
    "semester": "Spring",
    "capacity": 2,
    "schedule": {"days": ["Mon", "Wed"], "time": "9-10 AM", "room": "Lab 1"}
  }'
```

Save course ID as `COURSE1`

Repeat for Course 2 (CS102) and Course 3 (CS103)

---

### Step 3: Test Enrollment

**Enroll Student 1 in Course 1**:
```bash
curl -X POST http://localhost:5000/api/courses/enroll \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN1" \
  -d '{
    "studentId": "STUDENT1_ID",
    "courseId": "COURSE1"
  }'
```

**Enroll Student 2 in Course 1**:
```bash
curl -X POST http://localhost:5000/api/courses/enroll \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN2" \
  -d '{
    "studentId": "STUDENT2_ID",
    "courseId": "COURSE1"
  }'
```

**Try Enrolling Student 1 Again (Should Fail)**:
```bash
curl -X POST http://localhost:5000/api/courses/enroll \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN1" \
  -d '{
    "studentId": "STUDENT1_ID",
    "courseId": "COURSE1"
  }'
```

Expected: `"Student already enrolled in this course"`

---

### Step 4: Test Drop

```bash
curl -X POST http://localhost:5000/api/courses/drop \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN1" \
  -d '{
    "studentId": "STUDENT1_ID",
    "courseId": "COURSE1"
  }'
```

---

### Step 5: Verify Data

**Get all courses**:
```bash
curl http://localhost:5000/api/courses
```

**Get student enrollments**:
```bash
curl http://localhost:5000/api/courses/student/STUDENT1_ID
```

**Get student profile**:
```bash
curl http://localhost:5000/api/students/STUDENT1_ID
```

---

## 🚨 Common Errors & Solutions

### 401 Unauthorized
```json
"Invalid email or password"
```
- Check email and password are correct
- Ensure student is registered

### 400 Bad Request
```json
"Please provide all required fields"
```
- Verify all required fields are sent
- Check JSON formatting

### 400 Conflict
```json
"Email already registered"
```
- Use unique email for each student

### 400 Full
```json
"Course is full"
```
- Try enrolling in course with available slots

### 404 Not Found
```json
"Student not found" or "Course not found"
```
- Verify ID exists
- Check ID format (should be MongoDB ObjectId)

### 500 Server Error
- Check server logs in terminal
- Verify MongoDB is running
- Check .env configuration

---

## 📝 Postman Collection

You can import a Postman collection. Create a `postman_collection.json` file:

```json
{
  "info": {
    "name": "Student Registration API",
    "version": "1.0"
  },
  "item": [
    {
      "name": "Register Student",
      "request": {
        "method": "POST",
        "url": "http://localhost:5000/api/students/register",
        "body": {
          "mode": "raw",
          "raw": "{\"name\": \"Test\", \"email\": \"test@test.com\", \"password\": \"pass123\", \"rollNumber\": \"T001\"}"
        }
      }
    }
  ]
}
```

---

## ✅ Testing Checklist

- [ ] Register students without errors
- [ ] Login returns valid token
- [ ] Retrieve student profile
- [ ] Create courses successfully
- [ ] Get all courses
- [ ] Enroll in course
- [ ] Cannot enroll twice
- [ ] Cannot enroll in full course
- [ ] Drop course successfully
- [ ] Get student enrollments
- [ ] All error cases handled properly

---

**Last Updated**: March 30, 2026
**Status**: Ready for Testing
