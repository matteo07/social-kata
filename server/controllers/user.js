var User = require('./../models/user');
var format = require('./../utils/format')

var newPost = user => ({
	message: user.message,
	time: new Date(),
	author: user.name
})

const WALL_LIMIT = 10

var getMessageWithAuthor = p => `${p.author} - ${getFormattedMessage(p)}`

var getFormattedMessage = p => `${p.message} (${format.toMinHDAgo(new Date(), p.time)} ago)`

module.exports = {
	create: (req, res, next) => {
		User.create({
			name: req.body.name,
		}, (err, user) => next())
	},

	getUser: (req, res, next) => {
		User.findOne(
			{ name: req.query.name },
			(err, user) => {
				if (err || user == null) {
					res.send(['user not found'])
				} else {
					req.user = user
					next()
				}
			}
		);
	},

	getWall: (req, res) => {
		const follows = req.user.follows
		const userPosts = req.user.posts
		User.find(
			{ name: { $in: follows } },
			(err, users) => {
				if (err) {
					res.send(['user not found'])
				}
				const allPosts = [...users.map(u => u.posts)
					.reduce((acc, x) => acc = [...acc, ...x], [])//.flat()
					, ...userPosts]

				const orderedPosts = allPosts
					.sort(((x, y) => x.time < y.time))
					.slice(0, WALL_LIMIT)
				res.send(orderedPosts.map(getMessageWithAuthor))
			}
		);
	},

	sendUserPosts: (req, res) => {
		const messages = req.user.posts.reverse().map(getFormattedMessage)
		res.send(messages)
	},

	setMessage: (req, res) => {
		User.update(
			{ name: req.body.name },
			{ $push: { posts: newPost(req.body) } },
			() => { res.send('updated posts') }
		);
	},

	setFollower: (req, res) => {
		User.update(
			{ name: req.body.name },
			{ $addToSet: { follows: req.body.follow } },
			() => { res.send('updated follows') }
		);
	}
}