const express = require("express");
const {getUser,CreateUser,DeleteUser,UpdateUser,loginUser,checkOnboardingStatus}=require('../controllers/Usercontroller')
const calculateMetrics = require('../middleware/calculateMetrics');
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route('/get').get(protect, getUser)
router.route('/create').post(CreateUser)
// router.route('/onboard').post(Onboarding)
router.route('/delete').delete(protect, DeleteUser)
router.route('/update').patch(protect, calculateMetrics, UpdateUser)
router.route('/login').post(loginUser);
router.get('/onboarding-status', protect, checkOnboardingStatus);


module.exports=router  






