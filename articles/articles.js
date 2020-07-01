const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ramin:12345678asd@cluster0.t8pmx.mongodb.net/articleService?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log("Connected to articleService DB");   
});

const Article = require('./article');

app.get("/", (req, res) => {
    res.send("test");
});

app.listen(7777, () => {
    console.log("Up and running --- articles ms");
})