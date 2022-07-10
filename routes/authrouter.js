const express = require("express");
const router = express.Router();
const authcontroller = require("../controller/authcontroller");


// validtion body for registration 

 
router.get('/', (req, res) => res.render('homepage.ejs', { layout: false }));

router.get('/userregister', (req, res) => res.render('register.ejs', { layout: false }));

router.get('/userlogin', (req, res) => res.render('userlogin.ejs', { layout: false }));


router.get('/admin', (req, res) => res.render('adminlogin.ejs', { layout: false }));


// Router  to register the user with  all the details entered in registration page
router.post("/register", async (req, res) => {
    try {

        await authcontroller.register(req, res);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})

// Router  to login the user with  all the details entered in registration page
router.post("/login", async (req, res) => {
    try {
        await authcontroller.login(req, res);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})

// Router  to login the user with  all the details entered in registration page
router.post("/adminlogin", async (req, res) => {
    try {
        await authcontroller.adminlogin(req, res);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})
//Router to logout the user 
router.get("/logout", async (req, res) => {
    await authcontroller.logout(req, res);


})




module.exports = router;