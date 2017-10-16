var fs = require('fs');
var path = require('path');
var glob = require('glob');
var Promise = require('bluebird');

// Clean-up files from compiled app packages
module.exports = function (logger, platformsData, projectData, hookArgs, $usbLiveSyncService) {
	// delete all scss files from compiled sources

	var liveSync = $usbLiveSyncService.isInitialized;

	// Don't include .SCSS files in LiveSync -- only sync CSS files (works in {N} 3.0+)
	if (hookArgs.filesToSync !== undefined) {
		hookArgs.filesToSync.forEach(function (file, index) {
			if (file.indexOf(".scss") !== -1 || file.indexOf(".sass") !== -1) {
				// Remove the .SCSS file from LiveSync operation
				hookArgs.filesToSync.splice(index, 1);
			}
		});
	}

	// Don't try to LiveSync .SCSS or .SASS files (they do not exist in app package)
	if (liveSync) return;

	var platformData = platformsData.getPlatformData(hookArgs.platform.toLowerCase());

	return new Promise(function(resolve, reject) {
		// Remove node_sass directory from compiled output
		var nodeSassPath = path.join(platformData.appDestinationDirectoryPath, 'app/tns_modules/node-sass/');
		deleteFolderRecursive(nodeSassPath);
		
		// Find and remove unnecessary SCSS files from iOS and Android app packages
		var sassFilesPath = path.join(platformData.appDestinationDirectoryPath, 'app/**/*.s[ca]ss');
		var sassFiles = glob.sync(sassFilesPath).filter(function (filePath) {
			var path = filePath;
			var parts = path.split('/');
			var filename = parts[parts.length - 1];
			return path.indexOf("App_Resources") === -1;
		});

		Promise.each(sassFiles, function (sassFile) {
			return fs.unlinkSync(sassFile);
		})
		.then(function() {
			console.log("All SASS source files removed from app package");
			resolve();
		});
	});
}

// Utility to delete non-empty folder recursively
var deleteFolderRecursive = function(filepath) {
  if( fs.existsSync(filepath)) {
    fs.readdirSync(filepath).forEach(function(file,index){
      var curPath = path.join(filepath, file);
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    return fs.rmdirSync(filepath);
  }
};
