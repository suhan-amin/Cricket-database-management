const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser')
const app = express();
const path = require("path");

const auth = require("./routes/authrouter")
const indi = require('./routes/individual')
const team = require("./routes/team");
//cookie parser
app.use(cookieParser())
//Body Parser
app.use(express.json())

app.use(express.urlencoded({ extended: true }))
app.use(expressLayouts);
app.set('views', './public');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));

// app.use("/login",login)

app.use("/", auth);
app.use("/home", indi);
app.use("/team", team);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server connected to port ${port}`)
})