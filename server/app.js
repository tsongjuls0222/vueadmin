//imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path')

// const mysql = require('mysql2');

const app = express();
const port = process.env.PORT || 5000;


//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

//database connection
const db = require('./db_config.js');

//test database
db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

//routes prefix
app.use("/api/accounts", require("./routes/routes"));
app.use("/api", require("./routes/routes_agent"));
app.use("/api/moneyCount", require("./routes/routes_moneyCount"));
app.use("/api/memberList", require("./routes/routes_memberList"));
app.use("/api/memberListSearch", require("./routes/routes_memberList"));

//login
app.use("/api/login", require("./routes/routes_login"));

//admin main 1st load
app.use("/api/admin", require("./routes/routes_admin"));

//navbar
app.use("/api/navbar", require("./routes/routes_navbar"));

//userpopup
app.use("/api/userpopup", require("./routes/routes_userpopup"));

// feelogs
app.use("/api/feemanagement", require("./routes/routes_feemanagement"));

// otp
app.use("/api/otp", require("./routes/routes_otp"));

// events
app.use("/api/event", require("./routes/routes_event"));

// partner
app.use("/api/partner", require("./routes/routes_partner"));

// customer-service
app.use("/api/cs", require("./routes/routes_customerservice"));

// league list
app.use("/api/league", require("./routes/routes_league"));

// league list
app.use("/api/gamelist", require("./routes/routes_gamelist"));

// images
app.use("/api/upload", express.static(path.join("./upload")));


//start server
app.listen(port, () => console.log(`server running at http://localhost:${port}`));
