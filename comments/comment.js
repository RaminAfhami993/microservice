const mongoose = require('mongoose');

const CommentShema =  new mongoose.Schema({
    text: String,
    article: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Comment', CommentShema);