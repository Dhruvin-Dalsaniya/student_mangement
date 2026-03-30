// API Configuration
const API_URL = 'http://localhost:5000/api';
let authToken = localStorage.getItem('authToken');
let currentStudent = JSON.parse(localStorage.getItem('currentStudent'));

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  if (authToken && currentStudent) {
    showDashboard();
  } else {
    showAuthSection();
  }
});

// Switch between login and register tabs
function switchTab(tabName) {
  // Hide all tabs
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });
  
  // Remove active class from all buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  // Show selected tab
  const tabElement = document.getElementById(tabName + 'Tab');
  if (tabElement) {
    tabElement.classList.add('active');
  }

  // Add active class to clicked button
  event.target.classList.add('active');
}

// Register student
async function registerStudent(event) {
  event.preventDefault();

  const name = document.getElementById('regName').value;
  const rollNumber = document.getElementById('regRoll').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;

  try {
    const response = await fetch(`${API_URL}/students/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password,
        rollNumber
      })
    });

    const data = await response.json();

    if (data.success) {
      showAlert(data.message, 'success');
      // Clear form
      document.getElementById('registerForm').reset();
      // Auto-login
      authToken = data.token;
      currentStudent = data.student;
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('currentStudent', JSON.stringify(currentStudent));
      
      setTimeout(() => {
        showDashboard();
      }, 1000);
    } else {
      showAlert(data.message, 'danger');
    }
  } catch (error) {
    showAlert('Registration failed: ' + error.message, 'danger');
  }
}

// Login student
async function loginStudent(event) {
  event.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const response = await fetch(`${API_URL}/students/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await response.json();

    if (data.success) {
      showAlert(data.message, 'success');
      // Store auth token and student info
      authToken = data.token;
      currentStudent = data.student;
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('currentStudent', JSON.stringify(currentStudent));

      // Clear form
      document.getElementById('loginForm').reset();

      setTimeout(() => {
        showDashboard();
      }, 1000);
    } else {
      showAlert(data.message, 'danger');
    }
  } catch (error) {
    showAlert('Login failed: ' + error.message, 'danger');
  }
}

// Show dashboard
function showDashboard() {
  document.getElementById('authSection').style.display = 'none';
  document.getElementById('dashboardSection').style.display = 'block';

  // Update user display
  if (currentStudent) {
    document.getElementById('userDisplay').textContent = `Welcome, ${currentStudent.name}`;
    document.getElementById('studentName').textContent = currentStudent.name;
    document.getElementById('studentRoll').textContent = currentStudent.rollNumber;
  }

  // Show logout button
  document.getElementById('logoutBtn').style.display = 'inline-block';

  // Add logout functionality
  document.getElementById('logoutBtn').onclick = logout;

  // Load enrolled courses
  loadEnrolledCourses();

  // Load available courses
  loadAvailableCourses();
}

// Show auth section
function showAuthSection() {
  document.getElementById('authSection').style.display = 'flex';
  document.getElementById('dashboardSection').style.display = 'none';
  document.getElementById('userDisplay').textContent = '';
  document.getElementById('logoutBtn').style.display = 'none';
}

// Load enrolled courses
async function loadEnrolledCourses() {
  try {
    const response = await fetch(`${API_URL}/students/${currentStudent.id}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });

    const data = await response.json();

    if (data.success && data.student.enrolledCourses.length > 0) {
      const enrolledCoursesDiv = document.getElementById('enrolledCourses');
      enrolledCoursesDiv.innerHTML = '';

      data.student.enrolledCourses.forEach(course => {
        enrolledCoursesDiv.innerHTML += createCourseCard(course, true);
      });
    } else {
      document.getElementById('enrolledCourses').innerHTML = '<p class="no-data">No courses enrolled yet</p>';
    }
  } catch (error) {
    showAlert('Failed to load enrolled courses: ' + error.message, 'danger');
  }
}

// Load available courses
async function loadAvailableCourses() {
  try {
    const response = await fetch(`${API_URL}/courses`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });

    const data = await response.json();

    if (data.success) {
      const availableCoursesDiv = document.getElementById('availableCourses');
      availableCoursesDiv.innerHTML = '';

      if (data.courses.length === 0) {
        availableCoursesDiv.innerHTML = '<p class="no-data">No courses available</p>';
        return;
      }

      // Filter to show only courses not enrolled in
      const enrolledIds = currentStudent.enrolledCourses || [];
      const availableCourses = data.courses.filter(course => !enrolledIds.includes(course._id));

      if (availableCourses.length === 0) {
        availableCoursesDiv.innerHTML = '<p class="no-data">You are enrolled in all available courses</p>';
        return;
      }

      availableCourses.forEach(course => {
        availableCoursesDiv.innerHTML += createCourseCard(course, false);
      });
    }
  } catch (error) {
    showAlert('Failed to load courses: ' + error.message, 'danger');
  }
}

// Create course card HTML
function createCourseCard(course, isEnrolled) {
  const enrolledCount = course.enrolledStudents ? course.enrolledStudents.length : 0;
  const isFull = enrolledCount >= course.capacity;

  let actionsHTML = '';
  if (isEnrolled) {
    actionsHTML = `
      <button class="btn btn-danger btn-small" onclick="dropCourse('${course._id}')">Drop Course</button>
    `;
  } else {
    actionsHTML = `
      <button class="btn btn-success btn-small" onclick="enrollCourse('${course._id}')" ${isFull ? 'disabled' : ''}>
        ${isFull ? 'Course Full' : 'Enroll'}
      </button>
    `;
  }

  return `
    <div class="course-card">
      <div class="course-code">${course.courseCode}</div>
      <h4>${course.name}</h4>
      <p class="course-instructor">📍 ${course.instructor}</p>
      <div class="course-details">
        <div class="course-detail-item">
          <span class="detail-label">Credits</span>
          <span>${course.credits}</span>
        </div>
        <div class="course-detail-item">
          <span class="detail-label">Semester</span>
          <span>${course.semester}</span>
        </div>
        <div class="course-detail-item">
          <span class="detail-label">Enrolled</span>
          <span>${enrolledCount}/${course.capacity}</span>
        </div>
      </div>
      <div class="course-description">${course.description}</div>
      ${course.schedule && course.schedule.time ? `
        <div class="course-schedule">
          📅 ${course.schedule.days ? course.schedule.days.join(', ') : 'TBD'} | ${course.schedule.time}
          ${course.schedule.room ? `<br>🏛️ ${course.schedule.room}` : ''}
        </div>
      ` : ''}
      <div class="course-actions">
        ${actionsHTML}
      </div>
    </div>
  `;
}

// Enroll in course
async function enrollCourse(courseId) {
  try {
    const response = await fetch(`${API_URL}/courses/enroll`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        studentId: currentStudent.id,
        courseId: courseId
      })
    });

    const data = await response.json();

    if (data.success) {
      showAlert('Enrolled successfully!', 'success');
      // Reload courses
      loadEnrolledCourses();
      loadAvailableCourses();
    } else {
      showAlert(data.message, 'danger');
    }
  } catch (error) {
    showAlert('Enrollment failed: ' + error.message, 'danger');
  }
}

// Drop course
async function dropCourse(courseId) {
  if (!confirm('Are you sure you want to drop this course?')) {
    return;
  }

  try {
    const response = await fetch(`${API_URL}/courses/drop`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        studentId: currentStudent.id,
        courseId: courseId
      })
    });

    const data = await response.json();

    if (data.success) {
      showAlert('Course dropped successfully!', 'success');
      // Reload courses
      loadEnrolledCourses();
      loadAvailableCourses();
    } else {
      showAlert(data.message, 'danger');
    }
  } catch (error) {
    showAlert('Drop course failed: ' + error.message, 'danger');
  }
}

// Switch dashboard tabs
function switchDashboardTab(tabName) {
  // Hide all tabs
  document.querySelectorAll('.dashboard-tab-content').forEach(tab => {
    tab.classList.remove('active');
  });

  // Remove active class from all buttons
  document.querySelectorAll('.dashboard-tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  // Show selected tab
  const tabElement = document.getElementById(tabName + 'Tab');
  if (tabElement) {
    tabElement.classList.add('active');
  }

  // Add active class to clicked button
  event.target.classList.add('active');
}

// Logout
function logout() {
  if (confirm('Are you sure you want to logout?')) {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentStudent');
    authToken = null;
    currentStudent = null;
    document.getElementById('loginForm').reset();
    document.getElementById('registerForm').reset();
    showAuthSection();
    showAlert('Logged out successfully!', 'success');
  }
}

// Show alert message
function showAlert(message, type = 'info') {
  const alertBox = document.getElementById('alertBox');
  const alertElement = document.createElement('div');
  alertElement.className = `alert alert-${type}`;
  alertElement.textContent = message;

  alertBox.appendChild(alertElement);

  // Auto remove after 4 seconds
  setTimeout(() => {
    alertElement.style.animation = 'slideInRight 0.3s ease reverse';
    setTimeout(() => {
      alertElement.remove();
    }, 300);
  }, 4000);
}

// Fetch API with error handling
async function fetchAPI(endpoint, options = {}) {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    }
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...defaultOptions,
      ...options
    });

    return await response.json();
  } catch (error) {
    showAlert('API Error: ' + error.message, 'danger');
    throw error;
  }
}

// Form validation helpers
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validateForm(formData) {
  for (let [key, value] of Object.entries(formData)) {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return false;
    }
  }
  return true;
}
