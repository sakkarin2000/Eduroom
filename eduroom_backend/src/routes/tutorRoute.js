const express = require('express')
const router = express.Router()

const {
	getAvailableInstructor,
	getInstructorList,
	getInstructorInfo,
	getStudentAppointments,
	getInstructorReviews,
	getUserInfo,
} = require('../controllers/tutor/tutorController')
router.get('/availability', getAvailableInstructor)
router.get('/instructors', getInstructorList)
router.get('/instructor/info', getInstructorInfo)
router.get('/student/appointments', getStudentAppointments)
router.get('/appointment/review', getInstructorReviews)
router.get('/utils/id', getUserInfo)

module.exports = router
