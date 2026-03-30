const express = require('express');
const router = express.Router();
const {
  registerStudent,
  loginStudent,
  getStudentProfile,
  getAllStudents,
  updateStudent
} = require('../controllers/studentController');

// Student routes
router.post('/register', registerStudent);
router.post('/login', loginStudent);
router.get('/:id', getStudentProfile);
router.get('/', getAllStudents);
router.put('/:id', updateStudent);

module.exports = router;
