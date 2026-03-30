const express = require('express');
const router = express.Router();
const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  enrollStudent,
  dropCourse,
  getStudentEnrollments
} = require('../controllers/courseController');

// Course routes
router.post('/', createCourse);
router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

// Enrollment routes
router.post('/enroll', enrollStudent);
router.post('/drop', dropCourse);
router.get('/student/:studentId/enrollments', getStudentEnrollments);

module.exports = router;
