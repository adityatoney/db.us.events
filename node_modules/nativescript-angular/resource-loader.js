Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var compiler_1 = require("@angular/compiler");
var file_system_1 = require("tns-core-modules/file-system");
var ns_file_system_1 = require("./file-system/ns-file-system");
var extensionsFallbacks = [
    [".scss", ".css"],
    [".sass", ".css"],
    [".less", ".css"]
];
var FileSystemResourceLoader = /** @class */ (function (_super) {
    __extends(FileSystemResourceLoader, _super);
    function FileSystemResourceLoader(fs) {
        var _this = _super.call(this) || this;
        _this.fs = fs;
        return _this;
    }
    FileSystemResourceLoader.prototype.get = function (url) {
        var resolvedPath = this.resolve(url);
        var templateFile = this.fs.fileFromPath(resolvedPath);
        return templateFile.readText();
    };
    FileSystemResourceLoader.prototype.resolve = function (url) {
        var normalizedUrl = this.resolveRelativeUrls(url);
        if (this.fs.fileExists(normalizedUrl)) {
            return normalizedUrl;
        }
        var _a = this.fallbackResolve(normalizedUrl), fallbackCandidates = _a.candidates, fallbackResource = _a.resource;
        if (fallbackResource) {
            return fallbackResource;
        }
        throw new Error("Could not resolve " + url + ". Looked for: " + normalizedUrl + ", " + fallbackCandidates);
    };
    FileSystemResourceLoader.prototype.resolveRelativeUrls = function (url) {
        // Angular assembles absolute URLs and prefixes them with //
        if (url.indexOf("/") !== 0) {
            // Resolve relative URLs based on the app root.
            return file_system_1.path.join(this.fs.currentApp().path, url);
        }
        else {
            return url;
        }
    };
    FileSystemResourceLoader.prototype.fallbackResolve = function (url) {
        var _this = this;
        var candidates = extensionsFallbacks
            .filter(function (_a) {
            var extension = _a[0];
            return url.endsWith(extension);
        })
            .map(function (_a) {
            var extension = _a[0], fallback = _a[1];
            return _this.replaceExtension(url, extension, fallback);
        });
        var resource = candidates.find(function (candidate) { return _this.fs.fileExists(candidate); });
        return { candidates: candidates, resource: resource };
    };
    FileSystemResourceLoader.prototype.replaceExtension = function (fileName, oldExtension, newExtension) {
        var baseName = fileName.substr(0, fileName.length - oldExtension.length);
        return baseName + newExtension;
    };
    FileSystemResourceLoader = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [ns_file_system_1.NSFileSystem])
    ], FileSystemResourceLoader);
    return FileSystemResourceLoader;
}(compiler_1.ResourceLoader));
exports.FileSystemResourceLoader = FileSystemResourceLoader;
//# sourceMappingURL=resource-loader.js.map