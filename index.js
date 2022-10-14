require('dotenv').config();
const express = require('express');
const app = express();
const port = 4000;
let route = require('./routes/route');
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(route);
app.listen(port , () => {
    console.log(`Server started at ${port}`);
})