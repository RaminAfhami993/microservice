const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/commentsService', {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log("Connected to commentsService DB");   
});

app.use(express.json());

const Comment = require('./comment');

const axios =  require('axios');

app.post('/comment', (req, res) => {    
    new Comment({
        text: req.body.text,
        article: req.body.article
    }).save((err, comment) => {
        console.log(err);
        
        if (err) return res.send('err');
        else return res.json(comment)
    });
});

app.get('/comment/:id', (req, res) => {
    Comment.findById(req.params.id).then(comment => {
        if (comment) {
            axios.get('http://localhost:7777/article/' + comment.article).then(response => {
                comment = comment.toObject();
                comment.article = response.data;
                return res.json(comment);
            }).catch(err => {                
                return res.send('err');
            });
        } else {
            return res.sendStatus(404);
        };
    }).catch(err => {
        return res.send('err');
    })
})

app.listen(5555, () => {
    console.log("Up and running --- comments ms");
})