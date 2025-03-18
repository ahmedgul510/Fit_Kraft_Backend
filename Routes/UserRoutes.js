const express = require("express");
const {getUser,CreateUser,DeleteUser,UpdateUser}=require('../controllers/Usercontroller')
const calculateMetrics = require('../middleware/calculateMetrics');
const router = express.Router();

router.route('/get/:id').get(getUser)
router.route('/create').post(calculateMetrics, CreateUser)
router.route('/delete/:id').delete(DeleteUser)
router.route('/update/:id').patch(calculateMetrics, UpdateUser)


module.exports=router  






