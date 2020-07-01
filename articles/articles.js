const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/articleService', {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log("Connected to articleService DB");   
});

app.use(express.json());

const Article = require('./article');

app.post('/article', (req, res) => {
    new Article({
        title: req.body.title,
        description: req.body.description
    }).save((err, article) => {
        console.log(err);
        
        if (err) return res.send('err');
        else return res.json(article)
    });
});

app.get('/articles', (req, res) => {
    Article.find().then(articles => {
        return res.json(articles)
    }).catch(err => {
        return res.send('err');
    })
})


app.get('/article/:id', (req, res) => {
    Article.findById(req.params.id).then(article => {
        if (article) {
            return res.json(article)
        } else {
            res.statusCode(404)
        }
    }).catch(err => {
        return res.send('err');
    })
})

app.listen(7777, () => {
    console.log("Up and running --- articles ms");
})