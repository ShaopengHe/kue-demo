var kue = require('kue');
var config = require('./config');

var queue = kue.createQueue(config.kue);
queue.kue = kue;

module.exports = queue;
