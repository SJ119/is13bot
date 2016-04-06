var Bot = require('@kikinteractive/kik');
var is = require('./lib/index');
var strings = require('./strings');

var bot = new Bot({
    username: 'is13bot',
    apiKey: process.env.API_KEY || 'FAKE_KEY',
    baseUrl: 'https://0436af6c.ngrok.io/incoming'
});

var choose = function(a) {
	if (a.length > 1) {
		var i = Math.floor(Math.random() * a.length);
		return a[i];
	} else {
		return a[0];
	}
};

String.prototype.shuffle = function() {
	var a = this.split("");
	var n = a.length;

	for(var i = n-1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var tmp = a[i];
		a[i] = a[j];
		a[j] = tmp;
	}

	console.log(a.join(''));
	return a.join("");
};

bot.onStartChattingMessage((msg) => {
	console.log(msg);
	msg.reply('Hello ' + msg.from + ', give me an input and I will tell you if it\'s 13');
});

bot.onTextMessage((msg) => {
	var body = msg.body.toLowerCase();

	if (is(body).thirteen()) {
		msg.reply(choose(strings.isThirteen));
	} else if (is(body).roughly.thirteen()) {
		msg.reply(choose(strings.isRoughlyThirteen));
	} else if (is(body).square.of.thirteen()) {
		msg.reply('Good news! ' + body + ' ' + choose(strings.isSquareOfThirteen));
	} else if (is(body).divisible.by.thirteen()) {
		msg.reply(choose(strings.isNotThirteen) + ' However, ' + body + ' ' + choose(strings.isDivisibleByThirteen).toLowerCase());
	} else if (is(body).backwards.thirteen()) {
		msg.reply(choose(strings.isBackwardsOfThirteen));
	} else if (is(body).anagramOf.thirteen()) {
		msg.reply('thirteen'.shuffle() + ', see ' + choose(strings.isAnagramOfThirteen));
	} else {
		msg.reply(choose(strings.isNotThirteen));
	}
});

module.exports = bot;