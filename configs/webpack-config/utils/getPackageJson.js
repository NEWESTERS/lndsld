const path = require('path');
const fs = require('fs');

function getPackageJson() {
	return JSON.parse(fs.readFileSync(path.resolve('package.json')).toString());
}

module.exports = getPackageJson;
