const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const Student = require('../models/Student');

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const { courseCode, name, description, instructor, credits, semester, capacity, schedule } = req.body;

    const course = await Course.create({
      courseCode,
      name,
      description,
      instructor,
      credits,
      semester,
      capacity,
      schedule
    });

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      course
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('enrolledStudents');
    res.status(200).json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get course by ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('enrolledStudents');

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    res.status(200).json({ success: true, course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update course
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    res.status(200).json({ success: true, message: 'Course updated successfully', course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete course
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    res.status(200).json({ success: true, message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Enroll student in course
exports.enrollStudent = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    // Check if student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({ studentId, courseId });
    if (existingEnrollment) {
      return res.status(400).json({ success: false, message: 'Student already enrolled in this course' });
    }

    // Check course capacity
    if (course.enrolledStudents.length >= course.capacity) {
      return res.status(400).json({ success: false, message: 'Course is full' });
    }

    // Create enrollment
    const enrollment = await Enrollment.create({ studentId, courseId });

    // Add course to student's enrolled courses
    student.enrolledCourses.push(courseId);
    await student.save();

    // Add student to course's enrolled students
    course.enrolledStudents.push(studentId);
    await course.save();

    res.status(201).json({
      success: true,
      message: 'Student enrolled successfully',
      enrollment
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Drop course
exports.dropCourse = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    const enrollment = await Enrollment.findOneAndDelete({ studentId, courseId });

    if (!enrollment) {
      return res.status(404).json({ success: false, message: 'Enrollment not found' });
    }

    // Remove course from student's enrolled courses
    await Student.findByIdAndUpdate(studentId, { $pull: { enrolledCourses: courseId } });

    // Remove student from course's enrolled students
    await Course.findByIdAndUpdate(courseId, { $pull: { enrolledStudents: studentId } });

    res.status(200).json({ success: true, message: 'Course dropped successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get student enrollments
exports.getStudentEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ studentId: req.params.studentId }).populate('courseId');

    res.status(200).json({ success: true, enrollments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
