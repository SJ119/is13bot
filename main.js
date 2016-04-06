'use strict';

var http = require('http');
var bot = require('./bot');

var server = http
	.createServer(bot.incoming())
	.listen(process.env.PORT || 8080);
