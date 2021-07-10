const studentModel = require('../models/student.model');

class Models {

    getAllStudents = async (req, res) => {
        try {
            const students = await studentModel.find();
            res.render("home",{title:"B7-home", data:students});
        }
        catch (err) {
            res.status(500).send({
                apiStatus: false,
                message: "Not found students!",
                data: err
            })
        }
    }

    getStudentById = async (req, res) => {
        try {
            const id = req.params.id
            const student = await studentModel.findById(id);
            if (!student) {
                res.status(404).send({
                    apiStatus: true,
                    message:"student not found",
                    data: null
                })
            }
            res.render("singleStudent",{data:student});
        }
        catch (err) {
            res.status(500).send({
                apiStatus: false,
                message: "This student not found!",
                data: err
            })
        }
    }

    getStudentCourses = async (req, res) => {
        try {
            const id = req.params.id;
            const student = await studentModel.findById(id);
            if (!student) {
                res.status(404).send({
                    apiStatus: true,
                    message:"student not found!",
                    data: null
                })
            }
            res.status(200).send({
                apiStatus: true,
                message: "Get student cousrses has done",
                data: student.courses
            });
        }
        catch (err) {
            res.status(500).send({
                apiStatus: false,
                message: "This student not found!",
                data: err
            })
        }
    }

    getSingleCourse = async (req, res) => {
        try {
            const studentId = req.params.sid;
            const courseId = req.params.cid;
            const student = await studentModel.findById(studentId);
            if (!student) {
                res.status(404).send({
                    apiStatus: true,
                    message:"student not found!",
                    data: null
                })
            }
            res.status(200).send({
                apiStatus: true,
                message: "Get course for student has done",
                data: student.courses.filter(c => c._id = courseId)
            });
        }
        catch (err) {
            res.status(500).send({
                apiStatus: false,
                message: "This student not found!",
                data: err
            })
        }
    }


    addStudent = async (req, res) => {
    try {
        const newStudent = new studentModel(req.body);
        await newStudent.save();
        res.status(200).send({
            apiStatus: true,
            message: "New studet added successfuly",
            data: newStudent
        });
     }
    catch (err) {
        res.status(500).send({
            apiStatus: false,
            message: "Error on add new student!",
            data:err
        })
    }

    }

    addCourse = async (req, res) => {
        try {
            const student = await studentModel.findById(req.params.id);
            const newCourses = student.courses.push(req.body)
            student.update({ courses: newCourses });
            await student.save();
            res.status(200).send({
                 apiStatus: true,
                 message: "New studet added successfuly",
                 data: newCourses
            });
        }
    catch (err) {
        res.status(500).send({
            apiStatus: false,
            message: "Error on add new student!",
            data:err
        })
    }

    }


    deleteStudent = async (req, res) => {
        try {
            const id = req.params.id
            const student = await studentModel.findByIdAndDelete(id);
            if (!student) {
                res.status(404).send({
                    apiStatus: true,
                    message:"student not found",
                    data: null
                })
            }
            res.status(200).send({
                apiStatus: true,
                message: "This student has deleted!",
                data: null
            });
        }
        catch (err) {
            res.status(500).send({
                apiStatus: false,
                message: "This student not deleted!",
                data: err
            })
        }
    }

    deleteAllCoursesForStudent = async (req, res) => {
        try {
            const student = await studentModel.findByIdAndUpdate(req.params.sid, { $unset: { courses: 1 } });
            if (!student) {
                res.status(404).send({
                    apiStatus: true,
                    message:"student not found!",
                    data: null
                })
            }
            res.status(200).send({
                apiStatus: true,
                message: "Thise courses had deleted!",
                data: null
            });
        }
        catch (err) {
            res.status(500).send({
                apiStatus: false,
                message: "Thise courses not found!",
                data: err
            })
        }
    }

    deleteCourse = async (req, res) => {
        try {
            const student = await studentModel.findById(req.params.sid);
            const course = student.courses.find(c => c._id == req.params.cid);
            const newCourses = student.courses.splice(course, 1);
            student.update({ courses: newCourses });
            await student.save();
            if (!student) {
                res.status(404).send({
                    apiStatus: true,
                    message:"student not found!",
                    data: null
                })
            }
            res.status(200).send({
                apiStatus: true,
                message: "This course  has deleted successfully",
                data: {}
            });
        }
        catch (err) {
            res.status(500).send({
                apiStatus: false,
                message: "This student not found!",
                data: err
            })
        }
    }    


    editStudent = async (req, res) => {
        // update just name, password 
        const myAllowedUpdates = ['name', 'password']
        const updates = Object.keys(req.body)
        const isValid = updates.every(up => myAllowedUpdates.includes(up))
        if(!isValid) res.status(500).send('not avaliable')
        try {
            const student = await studentModel.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true });
            if (!student) {
                res.status(404).send({
                    apiStatus: true,
                    message:"This student not found",
                    data: null
                })
            }
            res.status(200).send({
                apiStatus: true,
                message: "This student has updated!",
                data: null
            });
        }
        catch (err) {
            res.status(500).send({
                apiStatus: false,
                message: "This student not updated!",
                data: err
            })
        }
    }
    
    editCourse = async (req, res) => {
        const myAllowedUpdates = ['title', 'content']
        const updates = Object.keys(req.body)
        const isValid = updates.every(up => myAllowedUpdates.includes(up))
        if(!isValid) res.status(500).send('not avaliable')
        try {
            const student = await studentModel.findById(req.params.sid);
            let newCourses = student.courses; 
            newCourses.map(c => {
                if (c._id == req.params.cid) {
                    Object.entries(req.body).map(a => {
                        return c[a[0]] = a[1]
                    })
                }
            });
            
           student.update({ courses: newCourses });
           await student.save();
            if (!student) {
                res.status(404).send({
                    apiStatus: true,
                    message:"student not found!",
                    data: {}
                })
            }
            res.status(200).send({
                apiStatus: true,
                message: "This course  has deleted successfully",
                data: newCourses 
            });
        }
        catch (err) {
            res.status(500).send({
                apiStatus: false,
                message: "This student not found!",
                data: err
            })
        }
}
module.exports = Models;
