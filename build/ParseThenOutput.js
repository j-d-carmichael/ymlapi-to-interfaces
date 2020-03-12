"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var yamljs_1 = tslib_1.__importDefault(require("yamljs"));
var fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
var path_1 = tslib_1.__importDefault(require("path"));
var generateTypeScriptInterfaceText_1 = tslib_1.__importDefault(require("./generateTypeScriptInterfaceText"));
var Strings_1 = require("quicktype/dist/quicktype-core/support/Strings");
var $RefParser = require('json-schema-ref-parser');
var ParseThenOutput = /** @class */ (function () {
    function ParseThenOutput() {
    }
    ParseThenOutput.prototype.init = function (relativeInputPath, relativeOutputDir) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ymlObj, fileType, outputDir;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.parse(relativeInputPath)];
                    case 1:
                        ymlObj = _a.sent();
                        fileType = this.whichApiFileType(ymlObj);
                        outputDir = path_1["default"].join(process.cwd(), relativeOutputDir);
                        fs_extra_1["default"].ensureDirSync(outputDir);
                        fs_extra_1["default"].emptyDirSync(outputDir);
                        if (!(fileType === 'openapi_2')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.openapi2handle(ymlObj, outputDir)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 3:
                        if (!(fileType === 'openapi_3')) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.openapi3handle(ymlObj, outputDir)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5: throw new Error('No appropriate file type.');
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ParseThenOutput.prototype.parse = function (relativeInputPath) {
        var fqFilePath = path_1["default"].join(process.cwd(), relativeInputPath);
        var fileString = fs_extra_1["default"].readFileSync(fqFilePath).toString('utf8');
        return $RefParser.dereference(yamljs_1["default"].parse(fileString));
    };
    ParseThenOutput.prototype.whichApiFileType = function (ymlObj) {
        if (ymlObj.asyncapi && ymlObj.asyncapi[0] === '2' || ymlObj.openapi && ymlObj.openapi[0] === '3') {
            return 'openapi_3';
        }
        if (ymlObj.swagger && ymlObj.swagger[0] === '2' || ymlObj.openapi && ymlObj.openapi[0] === '2') {
            return 'openapi_2';
        }
        throw new Error('No valid api specification formation, looked for: asyncapi 2, swagger 2, openapi 2 and openapi 3');
    };
    ParseThenOutput.prototype.openapi2handle = function (ymlObj, outputDir) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (!ymlObj.definitions) {
                    throw new Error('Openapi 2 without any definitions to parse found in provided yaml file.');
                }
                this.walkObjects(ymlObj.definitions, outputDir);
                return [2 /*return*/];
            });
        });
    };
    ParseThenOutput.prototype.openapi3handle = function (ymlObj, outputDir) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!ymlObj.components || !ymlObj.components.schemas) {
                            throw new Error('AsyncAPI / Openapi 3 without any components.schemas to parse found in provided yaml file.');
                        }
                        return [4 /*yield*/, this.walkObjects(ymlObj.components.schemas, outputDir)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ParseThenOutput.prototype.walkObjects = function (apiObjects, outputDir) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var keys, i, schemaName;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        keys = Object.keys(apiObjects);
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < keys.length)) return [3 /*break*/, 4];
                        schemaName = Strings_1.pascalCase(keys[i]);
                        return [4 /*yield*/, this.generateInterfaceFile(outputDir, schemaName, apiObjects[keys[i]])];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        ++i;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ParseThenOutput.prototype.generateInterfaceFile = function (destinationDir, schemaName, schemaObject) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = (_a = fs_extra_1["default"]).writeFileSync;
                        _c = [path_1["default"].join(destinationDir, schemaName + '.ts')];
                        return [4 /*yield*/, generateTypeScriptInterfaceText_1["default"](schemaName, JSON.stringify(schemaObject))];
                    case 1:
                        _b.apply(_a, _c.concat([_d.sent()]));
                        return [2 /*return*/];
                }
            });
        });
    };
    return ParseThenOutput;
}());
exports["default"] = new ParseThenOutput();
