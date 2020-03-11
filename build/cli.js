"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const commander_1 = tslib_1.__importDefault(require("commander"));
const ParseThenOutput_1 = tslib_1.__importDefault(require("./ParseThenOutput"));
const inputArgs = commander_1.default
    .option('-i, --input [path]', 'The relative path to the yml file eg "../rabbitmq/build/asyncapi.yml"')
    .option('-o, --output [path]', `The relative path to the output directory eg "./rabbitmq/interfaces/"`);
ParseThenOutput_1.default.init(inputArgs.program.input, inputArgs.program.input)
    .catch((e) => {
    console.error('SORRY SOMETHING WENT WRONG:');
    console.error(e);
});
