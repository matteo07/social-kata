var mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	message: { type: String },
	time: { type: Date },
	author: { type: String}
})

module.exports = {
	Post: mongoose.model('Post', postSchema),
	postSchema: postSchema
}