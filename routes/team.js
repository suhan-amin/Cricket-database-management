const express = require("express");
const router = express.Router();
const team = require("../controller/team");

router.get("/", async (req, res) => {
    try {
        const values = await team.fetch(req, res);
        const teams = await team.team(req, res);

        res.render("team.ejs",{layout:false,values:values,teams:teams})
    } catch (e) {
        console.log(e);
    }
})


router.post("/insertvalue", async (req, res) => {
    try {
        await team.insertvalue(req, res);
    } catch (e) {
        console.log(e);
    }
})





module.exports = router;