const mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
    title: { type: String },
    content: { type: String },
    author: { type: String },
    category: { type: String }
});


module.exports = mongoose.model('Blog', blogSchema);