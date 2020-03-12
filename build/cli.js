"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var commander_1 = tslib_1.__importDefault(require("commander"));
var ParseThenOutput_1 = tslib_1.__importDefault(require("./ParseThenOutput"));
commander_1["default"]
    .option('-i, --input [path]', 'The relative path to the yml file eg "../rabbitmq/build/asyncapi.yml"')
    .option('-o, --output [path]', "The relative path to the output directory eg \"./rabbitmq/interfaces/\"");
commander_1["default"].parse(process.argv);
ParseThenOutput_1["default"].init(commander_1["default"].input, commander_1["default"].output)["catch"](function (e) {
    console.error('SORRY SOMETHING WENT WRONG:');
    console.error(e);
});
