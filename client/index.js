const readline = require('readline');
const { sendGetAndPrintResult, sendPost } = require('./http_utils');

const FOLLOW_KEYWORD = 'follows';
const MESSAGE_KEYBOARD = '->';
const WALL_KEYWORD = 'wall';

const actions = [
	[isGetUserCommand, getUser],
	[isGetWallCommand, getWall],
	[isPostMessageCommand, postMessage],
	[isPostFollowCommand, postFollow]];

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

// RUN 
console.log('Welcome to our social newtork, write a command:');
readCommand();

function readCommand() {
	rl.question('> ', answer => {
		execAction(answer.trim().split(' '));
	})
}

function execAction(words) {
	for (action of actions) {
		if (action[0](words)) {
			action[1](words);
			return;
		}
	}
	console.log('\nInvalid command\n');
}

// ACTIONS
function getUser(command) {
	sendGetAndPrintResult(`user?name=${command[0]}`, readCommand);
}

function getWall(command) {
	sendGetAndPrintResult(`wall?name=${command[0]}`, readCommand);
}

function postMessage(command) {
	sendPost('post', { name: command[0], message: command.slice(2).join(' ') }, readCommand);
}

function postFollow(command) {
	sendPost('follow', { name: command[0], follow: command[2] }, readCommand);
}

// CONDITIONS
function isPostMessageCommand(wordArray) {
	return wordArray.length >= 3 && wordArray[1] === MESSAGE_KEYBOARD;
}

function isGetWallCommand(wordArray) {
	return wordArray.length === 2 && wordArray[1] === WALL_KEYWORD;
}

function isPostFollowCommand(wordArray) {
	return wordArray.length === 3 && wordArray[1] === FOLLOW_KEYWORD;
}

function isGetUserCommand(wordArray) {
	return wordArray.length === 1 && !wordArray[0] !== '';
}