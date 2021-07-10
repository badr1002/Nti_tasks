const express = require('express');
const router = express.Router();
const Models = require('../controllers/myController.control');
const model = new Models();

// redirect to students page
router.get('/', (req, res) => res.redirect('/students'));
// show all students
router.get('/students', model.getAllStudents);
// show single student
router.get('/student/:id', model.getStudentById);
// show all courses far an student
router.get('/student/:id/courses', model.getStudentCourses);
// show single course for an student
router.get('/student/:sid/course/:cid', model.getSingleCourse);
// add new student
router.post('/add/student', model.addStudent);
// add new course for an student
router.patch('/student/:id/add/course', model.addCourse);
// delete an student
router.delete('/delete/student/:id', model.deleteStudent);
// delete all courses for an student
router.delete('/delete/student/:sid/courses/', model.deleteAllCoursesForStudent);
// delete one cousre for an student
router.delete('/delete/student/:sid/course/:cid', model.deleteCourse);
// edit student
router.patch('/edit/student/:id', model.editStudent);
// edit course
router.patch('/student/:sid/edit/course/:cid', model.editCourse);



module.exports = router;
