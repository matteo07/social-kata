var mongoose = require('mongoose');
var { postSchema } = require('./../models/post');

module.exports = mongoose.model('User', {
    name: { type: String, index: { unique: true } },
    posts: [postSchema],
    follows: [String]
});