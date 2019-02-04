const chai = require("chai");
const { expect } = chai;
const sinon = require("sinon");
var assert = require('assert');

var format = require('./../utils/format');

describe("utils", function () {
    it("should find min, hour, days ago", function () {
        //minutes difference
        dNow = new Date('2019-01-17T03:24:00')
        dPost = new Date('2019-01-17T03:23:00')
        assert.equal(format.toMinHDAgo(dNow, dPost), "1 minute");
        
        dNow = new Date('2019-01-17T03:24:00')
        dPost = new Date('2019-01-17T03:22:00')
        assert.equal(format.toMinHDAgo(dNow, dPost), "2 minutes");
        //hours difference
        dNow = new Date('2019-01-17T06:24:00')
        dPost = new Date('2019-01-17T05:24:00')
        assert.equal(format.toMinHDAgo(dNow, dPost), "1 hour");

        dNow = new Date('2019-01-17T06:24:00')
        dPost = new Date('2019-01-17T03:24:00')
        assert.equal(format.toMinHDAgo(dNow, dPost), "3 hours");
        //days difference
        dNow = new Date('2019-01-18T03:24:00')
        dPost = new Date('2019-01-17T03:24:00')
        assert.equal(format.toMinHDAgo(dNow, dPost), "1 day");

        dNow = new Date('2019-01-21T03:24:00')
        dPost = new Date('2019-01-17T03:24:00')
        assert.equal(format.toMinHDAgo(dNow, dPost), "4 days");
    });
})