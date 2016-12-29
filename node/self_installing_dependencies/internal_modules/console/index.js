const chalk = require("chalk");

function highlightTitleBorder(c) {
	return chalk.yellow(c);
}

function highlightTitleText(str) {
	return chalk.bold(str);
}

module.exports = {
	title: function(str) {
		var len = str.length;
		var msg = highlightTitleBorder("╔");
		for(var i = 0; i < len + 2; i++) {
			msg += highlightTitleBorder("═");
		}
		msg += highlightTitleBorder("╗\n║ ");
		msg += highlightTitleText(str);
		msg += highlightTitleBorder(" ║\n╚");
		for(var i = 0; i < len + 2; i++) {
			msg += highlightTitleBorder("═");
		}
		msg += highlightTitleBorder("╝\n");

		process.stdout.write(msg);
	}
};