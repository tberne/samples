// required libs
const fs = require("fs");
const path = require("path");
const spawnSync = require('child_process').spawnSync;

// log function
function log(str) {
	process.stdout.write(str + "\n");
}

// err function
function err(str) {
	process.stderr.write(str + "\n");
}

module.exports = {
	installIfRequired: function() {

		// main modules
		var projectRoot = process.cwd();
		var mainModulesFolder = path.join(projectRoot, "node_modules");

		// check if main modules are already installed
		if(!fs.existsSync(mainModulesFolder)) {

			// if not, install them
			log(`Installing main dependencies...`);

			// exec npm install
			var mainNpmInstallResult = spawnSync("npm", ["install"], {
				cwd: projectRoot,
				shell: true
			});

			// check npm install result
			if(mainNpmInstallResult.status == 0){
				log("Main dependencies installed.");

				// internal modules folder
				var internalModulesFolder = path.join(projectRoot, "internal_modules");

				// read all internal modules that are not "install_deps"
				fs.readdirSync(internalModulesFolder).filter(subModule => subModule != "install_deps").forEach(subModule => {

					// sub module folder
					var internalModuleFolder = path.join(internalModulesFolder, subModule);

					// sub module modules folder
					var internalModulesModulesFolder = path.join(internalModuleFolder, "node_modules");

					// check if sub module folder already have a "node_modules" folder
					if(!fs.existsSync(internalModulesModulesFolder)) {

						// if not, perform a npm install
						log(`Installing dependencies of module ${subModule}...`);
						var npmInstallResult = spawnSync("npm", ["install"], {
							cwd: internalModuleFolder,
							shell: true
						});

						// check result
						if(npmInstallResult.status == 0){
							log(`Dependencies of ${subModule} installed.`);
						}
						else {
							err(`Error npm installing '${subModule}' module.`);
							err(npmInstallResult.stderr);
							process.exit(1);
						}
					}
				});
			}
			else {
				err("Error npm installing main modules.");
				err(mainNpmInstallResult.stderr);
				process.exit(1);
			}
		}
	}
};
