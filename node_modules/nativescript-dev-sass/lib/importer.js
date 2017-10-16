var path = require("path");

module.exports = function(url, prev, done) {
  if (url[0] === '~' && url[1] !== '/') {
    // Resolve "~" paths to node_modules
    url = path.resolve(__dirname, "../../../node_modules", url.substr(1));
  } else if (url[0] === '~' && url[1] === '/') {
    // Resolve "~/" paths to the app root
    url = path.resolve(__dirname, "../../../app/"+ url.substr(2));
  }

  return { file: url };
}