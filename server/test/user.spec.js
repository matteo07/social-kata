const chai = require("chai");
const { expect } = chai;
const sinon = require("sinon");
var assert = require('assert');

var userController = require('./../controllers/user');
var User = require('./../models/user');

let getResponseSent = res => res.send.firstCall.args[0];

describe("user controller", function () {
    let testUser, testReq, testRes, user1, user2;

    it("should set user in req", function () {
        testReq = { query: {} };
        sinon.stub(User, 'findOne').yields(null, testUser);

        userController.getUser(testReq, {}, () => { })

        expect(testReq.user).to.equal(testUser);
    });

    it("should send all user's post formatted", function () {
        userController.sendUserPosts(testReq, testRes)

        expect(getResponseSent(testRes)).to.contain("post1 (3 hours ago)");
        expect(getResponseSent(testRes)).to.contain("post2 (4 hours ago)");
    });

    it("should return user's wall", function () {
        sinon.stub(User, 'find').yields(null, [user1, user2]);

        userController.getWall(testReq, testRes)

        expect(getResponseSent(testRes)[0]).to.equal("user2 - post1 (1 hour ago)");
        expect(getResponseSent(testRes)[1]).to.equal("user1 - post1 (1 hour ago)");
        expect(getResponseSent(testRes)[4]).to.equal("testUser - post2 (4 hours ago)");
    })

    // SETUP

    before(function () {
        sinon.useFakeTimers({ now: new Date('2019-01-17T04:24:00') });
    });

    beforeEach(function (done) {
        testUser = {
            name: 'testUser',
            posts: [
                { message: 'post2', time: new Date('2019-01-17T00:20:00'), author: 'testUser' },
                { message: 'post1', time: new Date('2019-01-17T01:24:00'), author: 'testUser' }],
            follows: ['user1', 'user2']
        };

        testRes = { send: sinon.spy() };
        testReq = {
            user: testUser,
            query: {},
        };

        user1 = {
            name: 'user1',
            posts: [
                { message: 'post2', time: new Date('2019-01-17T03:21:00'), author: 'user1' },
                { message: 'post1', time: new Date('2019-01-17T03:22:00'), author: 'user1' }],
        };
        user2 = {
            name: 'user2',
            posts: [
                { message: 'post1', time: new Date('2019-01-17T03:24:00'), author: 'user2' }],
        };
        done();
    });
})
