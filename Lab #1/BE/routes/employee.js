const express = require('express')
const router = express.Router()

const {
  createEmployee,
  deleteEmployee,
  getEmployees,
  updateEmployee,
} = require('../controllers/employee')

router.route('/').get(getEmployees).post(createEmployee)

router.route('/:id').delete(deleteEmployee).put(updateEmployee)

module.exports = router
