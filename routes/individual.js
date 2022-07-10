const express = require("express");
const router = express.Router();
const ind = require("../controller/individualcontroller");

router.get("/", async (req, res) => {
    try {
        const value=await ind.fetch(req, res);
        res.render('dash.ejs', { layout: false,scores:value })
    } catch (e) {
        console.log(e);
    }
})


router.get("/view", async (req, res) => {
    try {
        const value = await ind.fetchvalue(req, res);
        res.render('view.ejs', { layout: false, scores: value })
    } catch (e) {
        console.log(e);
    }
})


router.get("/adminindi", async (req, res) => {
    try {
        const value = await ind.fetch(req, res);
        res.render('adminindi.ejs', { layout: false, scores: value })
    } catch (e) {
        console.log(e);
    }
})





router.post("/insertvalue", async (req, res) => {
    try {
        await ind.insertvalue(req, res);
    } catch (e) {
        console.log(e);
    }
})





module.exports = router;