const mongoose = require('mongoose');

const ArticleShema =  new mongoose.Schema({
    title: String,
    description: String
});

module.exports = mongoose.model('Article', ArticleShema);