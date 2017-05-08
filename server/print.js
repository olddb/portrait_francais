var chalk = require('chalk');

module.exports = (function() {
//▶  print_properties
var print_properties = function(o, ostring) {
	var ret = '';
	for(var prop in o){
		if (!o.hasOwnProperty(prop)) 
			continue;
		if (prop == 'image')
			console.log("image sent");
		else if (prop == 'thumbnail')
			console.log("thumbnail sent");
		else
			ret = ret + '\n ' + g(prop) + ' : ' + cc(o[prop]);
	}
	if (!ret)
		console.log(bb("no " + ostring));
	else
		console.log(gg(ostring) + ' : '+ ret);
}
	//」
//▶  debug
var debug = function (req,res,next) {
	b("▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄");
	keyLog("path: ", req.path);
	if (req.user) {
		keyLog("User : ", req.user.username + ' (' + req.user.roles[0] + ')');
	} else
		r("Not logged In")

	if (req.category) 	gg("category: " 	+ req.category);
	if (req.link) 		gg("link: " 		+ req.link);
	if (req.comment) 	gg("comment: " 	+ req.comment);

	print_properties(req.body, "body");
	print_properties(req.query, "query");
	b("▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀");
	next();
}
//」

var object = function (object) {
	console.log(chalk.blue(JSON.stringify(object)));
}
var d = function (object) {
	console.log(chalk.blue(console.dir(object)));
}

//▶  accords cas/couleurs
var log = function (log) {
	console.log(log);
}
var keyLog = function (logStr, logObj) {
	log(gg(logStr) + bblue(logObj));
}
var fonction = function (function_name) {
	console.log(chalk.green(function_name));
}
var erreur = function (erreur) {
	console.log(chalk.bold.underline.bgBlack.red(erreur));
}
var check = function (check) {
	console.log(chalk.bold.magenta(check));
}
//」
//▶  colors
//yellow
var y = function (log) {
	return console.log(chalk.yellow(log));
}
//magenta
var m = function (log) {
	return console.log(chalk.magenta(log));
}
//black
var b = function (log) {
	return console.log(chalk.black(log));
}
//red
var r = function (log) {
	return console.log(chalk.black(log));
}
//blue
var blue = function (log) {
	return console.log(chalk.blue(log));
}
//cyan
var c = function (log) {
	return console.log(chalk.cyan(log));
}
//white
var w = function (log) {
	return console.log(chalk.white(log));
}
//grey
var g = function (log) {
	return chalk.gray(log);
}
var gg = function (log) {
	return chalk.gray(log);
}
var yy = function (log) {
	return chalk.yellow(log);
}
var mm = function (log) {
	return chalk.magenta(log);
}
var bb = function (log) {
	return chalk.black(log);
}
var rr = function (log) {
	return chalk.black(log);
}
var bblue = function (log) {
	return chalk.blue(log);
}
var cc = function (log) {
	return chalk.cyan(log);
}
var ww = function (log) {
	return chalk.white(log);
}

var gg = function (log) {
	return chalk.gray(log);
}
//」
//▶  return
return {
	print_properties: print_properties,
	debug: debug,
	fonction: fonction,
	erreur: erreur,
	check: check,
	y: y,
	m: m,
	b: b,
	r: r,
	blue: blue,
	c: c,
	w: w,
	g: g,
	log:log,
	keyLog:keyLog
}
})();
//」
//▶CHALK

/*
var chalk = require('chalk');
// style a string
chalk.blue('Hello world!');
// combine styled and normal strings
chalk.blue('Hello') + 'World' + chalk.red('!');
// compose multiple styles using the chainable API
chalk.blue.bgRed.bold('Hello world!');
// pass in multiple arguments
chalk.blue('Hello', 'World!', 'Foo', 'bar', 'biz', 'baz');
// nest styles
chalk.red('Hello', chalk.underline.bgBlue('world') + '!');
// nest styles of the same type even (color, underline, background)
chalk.green(
    'I am a green line ' +
    chalk.blue.underline.bold('with a blue substring') +
    ' that becomes green again!'
);

//Easily define your own themes.
var error = chalk.bold.red;
console.log(error('Error!'));
//Take advantage of console.log string substitution.
var name = 'Sindre';
console.log(chalk.green('Hello %s'), name);
//=> Hello Sindre

CHALK.<STYLE>[.<STYLE>...](STRING, [STRING...])
Order doesn t matter, and later styles take precedent in case of a conflict.
Multiple arguments will be separated by space.

//▶STYLES

Modifiers:
-reset
-bold
-dim
-italic (not widely supported)
-underline
-inverse
-hidden
-strikethrough (not widely supported)

Colors:
-black
-red
-green
-yellow
-blue (on Windows the bright version is used as normal blue is illegible)
-magenta
-cyan
-white
-gray

Background colors:
-bgBlack
-bgRed
-bgGreen
-bgYellow
-bgBlue
-bgMagenta
-bgCyan
-bgWhite
//」
//▶NOT USEFUL
//▶CHALK.ENABLED
Color support is automatically detected, but you can override it by setting the enabled property. You should however only do this in your own code as it applies globally to all chalk consumers.

If you need to change this in a reusable module create a new instance:

var ctx = new chalk.constructor({enabled: false});
//」
//▶CHALK.STYLES

Exposes the styles as ANSI escape codes.

console.log(chalk.styles.red);
//=> {open: '\u001b[31m', close: '\u001b[39m'}
console.log(chalk.styles.red.open + 'Hello' + chalk.styles.red.close);
//」
//▶CHALK.HAScOLOR(STRING)
Check whether a string has color.
//」
//▶CHALK.SUPPORTSCOLOR
Detect whether the terminal supports color. Used internally and handled for you, but exposed for convenience.
Can be overridden by the user with the flags --color and --no-color. For situations where using --color is not possible, add an environment variable FORCE_COLOR with any value to force color. Trumps --no-color.
//」
//▶CHALK.STRIPcOLOR(STRING)

Strip color from a string.

Can be useful in combination with .supportsColor to strip color on externally styled text when it's not supported.

var chalk = require('chalk');
var styledString = getText();

if (!chalk.supportsColor) {
    styledString = chalk.stripColor(styledString);
}
//」
//」
*/
//」
// err system
// 1.
// if (err) {
// return res.status(400).send({
// message: errorHandler.getErrorMessage(err)
// 2.
//assert.equal(null, err);
