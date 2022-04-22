const express = require("express");
const authController = require("./../controllers/auth");
const router = express.Router();

router.get('/', authController.isLoggedIn, (req, res) => {
    console.log("Testing");
    res.render('index', {user: req.user});
});

router.get("/register-client", authController.isLoggedIn, (req, res) => {
    res.render("register", {user: req.user});
});

router.get("/register-trainer", authController.isLoggedIn, (req, res) => {
    res.render("register", {user: req.user});
});

router.get("/login", authController.isLoggedIn, (req, res) => {
    console.log(req.user);
    res.render("log-in", {user: req.user});
});



module.exports = router;