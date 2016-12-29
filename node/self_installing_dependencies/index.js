// install missing dependencies
const deps = require("./internal_modules/install_deps/index.js");
deps.installIfRequired();

// parse command line
const argv =
	require("yargs")
	
	// help
	.alias("h", "help")
	.describe("h", "Shows help information")
	.help("h")
	
	.argv;

// just test using internal module (that depends on chalk)
const c = require("./internal_modules/console/index.js");
c.title("Just testing dependencies auto install");

// exit
process.exit(0);