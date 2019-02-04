var user = require('./controllers/user');

module.exports = function (app) {
	app.get('/user', user.getUser, user.sendUserPosts);
	app.get('/wall', user.getUser, user.getWall);
	app.post('/post', user.create, user.setMessage);
	app.post('/follow', user.create, user.setFollower);

	app.get('*', function (req, res) {
		res.send('invalid request')
	});
};