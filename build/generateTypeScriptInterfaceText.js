"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_1 = require("./constants/cli");
const { InputData, JSONSchemaInput, JSONSchemaStore, quicktype } = require('quicktype/dist/quicktype-core');
exports.default = async (name, schema) => {
    const schemaInput = new JSONSchemaInput(new JSONSchemaStore());
    await schemaInput.addSource({
        name,
        schema: schema,
    });
    const inputData = new InputData();
    inputData.addInput(schemaInput);
    const interfaceContent = await quicktype({
        inputData,
        lang: 'ts',
        rendererOptions: {
            'just-types': true,
            'acronym-style': 'original',
        },
    });
    let interfaceReturnString = '';
    interfaceContent.lines.forEach((line) => {
        interfaceReturnString += line + cli_1.LINEBREAK;
    });
    return interfaceReturnString;
};
