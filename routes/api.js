const router = require("express").Router();
const { Router } = require("express");
const { register, login, verifyUser, resendCode, forgotPassword, resetPassword, updatePassword, logOut, socialLogin } = require("../controllers/authController");
const { getContent, UpdateContent, notificationOnOff, getNotification, deleteNotification } = require("../controllers/commonController");
const { verifyToken } = require("../middlewares/authentication");
const { upload } = require("../middlewares/multer");
const { updateUser, userDetail, deleteUser, completeProfile } = require("../controllers/userController");
const { blockUnblock, getAllUsers, getDashboard } = require("../controllers/adminController");
const { addType, getTypes, deleteType } = require("../controllers/typeController");
const { addFeedback, getFeedback } = require("../controllers/feedbackController");
const { authorizeRoles } = require("../middlewares/authorizeRoles");
const { addMeal, editMeal, deleteMeal, getMeals } = require("../controllers/mealController");


//Authentication
router.post("/register", upload.single('image'), register);
router.post("/log-in", login);
router.post("/verify-otp", verifyUser);
router.post("/resend-code", resendCode);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/update-password", verifyToken, updatePassword);
router.get("/log-out", verifyToken, logOut);
router.post("/social-login", socialLogin);

//Admin
router.get("/block-unblock-user/:id", verifyToken, authorizeRoles("Admin"), blockUnblock);
router.get("/get-all-users", verifyToken, authorizeRoles("Admin"), getAllUsers);

//Dashboard
router.get("/get-dashboard-data", verifyToken, authorizeRoles("Admin"), getDashboard);

//Reasons
router.post("/add-type", verifyToken, authorizeRoles("Admin"), addType)
router.get("/get-types", getTypes)
router.delete("/delete-type/:_id", verifyToken, authorizeRoles("Admin"), deleteType)

//User
router.post("/complete-profile", upload.single('image') , completeProfile);
router.put("/update-profile", verifyToken, upload.single('image') , updateUser);
router.get("/get-user-detail",verifyToken, userDetail);
router.delete("/delete-user",verifyToken, deleteUser);


//Content
router.get('/get-content/:type', getContent)
router.put('/update-content/:type', UpdateContent)

router.get('/notification-on-off', verifyToken, notificationOnOff)
router.get("/get-notifications", verifyToken, getNotification);
router.delete("/delete-notifications/:notification_id",verifyToken, deleteNotification);

//FeedBack
router.post("/send-feedback", verifyToken, upload.array('images'), addFeedback)
router.get("/get-feedbacks", getFeedback)

router.post("/add-meal", verifyToken, authorizeRoles("Admin"), addMeal)
router.put("/edit-meal", verifyToken, authorizeRoles("Admin"), editMeal)
router.delete("/delete-meal/:id", verifyToken, authorizeRoles("Admin"), deleteMeal)
router.get("/get-meals", getMeals)

module.exports = router;
