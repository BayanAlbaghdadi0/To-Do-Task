const express = require("express");
const app = express();

const tasks = require("./routs/tasks.js");
const login = require("./routs/login.js");
const regester = require("./routs/regester.js");

// const {signup, login} = require('./controllers/login')

const cors = require('cors');
const port = 3001;

//midellware
app.use(express.json());
app.use(cors());

// app.post('/signup', signup)
//هون مالي مستخدمها بس للمستقبل
app.use(express.static('./public'))
//route
app.use("/api/v1/tasks", tasks);

app.use("/api/v1/login", login);

app.use("/api/v1/regester", regester);
//run
app.listen(port, console.log(`task maneger work on port ${port}`));
