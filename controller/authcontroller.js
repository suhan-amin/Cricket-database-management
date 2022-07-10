const pool = require("../utils/db-config");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
    try {
        const body = req.body;
        console.log(body);
       
        // const body = req.body;
        // console.log(body);

        const profile = await pool.query('select * from Student where email=$1 or usn=$2', [body.email, body.usn]);

        if (profile.rowCount !== 0) {
            res.status(404).json("Account Already Exist")
            return;

        }
       
       
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(body.password, salt);
        
        const insertion = await pool.query('insert into Student (email,password,usn,fname,lname,dob,sem,did) values($1,$2,$3,$4,$5,$6,$7,$8) returning *', [body.email, hash,body.usn, body.fname,body.lname, body.dob,body.sem,body.did]);

        if (insertion.rowCount == 0) {
            res.status(400).json("Profile Creation Failed");
            return;
        }

        res.status(201).json(insertion.rows[0]);



    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}



module.exports.login = async (req, res) => {
    try {
        const body = req.body;
        console.log(body);
        
        // const body = req.body;
        // console.log(body);

        const profile = await pool.query('select * from Student where email=$1', [body.email]);

        if (profile.rowCount == 0) {
            res.status(404).json("Account Not Found")
            return;

        }
        const hash = profile.rows[0].password;
        const passCheck = await bcrypt.compare(body.password, hash);
        console.log("22", passCheck);

        if (!passCheck) {
            res.status(403).json("Password Incorrect");
            return;
        }
        const jwt_secret = process.env.JWT_SECRET || 'somesecret';
        const token = await jwt.sign({
            email: profile.rows[0].email,
            usn: profile.rows[0].usn,
           
            fname: profile.rows[0].fname,
        }, jwt_secret)

        
        res.cookie('access_token', token, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),

            httpOnly: true,
            path: '/'
        })

        
        res.status(200).json("Successful");



    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}



module.exports.adminlogin = async (req, res) => {
    try {
        const body = req.body;
        console.log(body);

        // const body = req.body;
        // console.log(body);

        
        const email = 'admin@gmail.com';
        const pass = "12345678";

        if (body.email == email && body.password == pass) {
            const jwt_secret = process.env.JWT_SECRET || 'somesecret';
            const token = await jwt.sign({
                email:email,
                
            }, jwt_secret)


            res.cookie('access_token', token, {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),

                httpOnly: true,
                path: '/'
            })
            console.log(2222222);
            res.status(200).json("Successful");
        }
        else {
            res.status(403).json()
            return;
        }


    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

module.exports.logout = async (req, res) => {
    res.clearCookie('access_token', {
        httpOnly: true,
        path: '/'
    })
        .sendStatus(200);
};