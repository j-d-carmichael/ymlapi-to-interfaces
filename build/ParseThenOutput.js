"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const yamljs_1 = tslib_1.__importDefault(require("yamljs"));
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const path_1 = tslib_1.__importDefault(require("path"));
const generateTypeScriptInterfaceText_1 = tslib_1.__importDefault(require("./generateTypeScriptInterfaceText"));
const Strings_1 = require("quicktype/dist/quicktype-core/support/Strings");
const $RefParser = require('json-schema-ref-parser');
class ParseThenOutput {
    async init(relativeInputPath, relativeOutputDir) {
        const ymlObj = await this.parse(relativeInputPath);
        const fileType = this.whichApiFileType(ymlObj);
        const outputDir = path_1.default.join(process.cwd(), relativeOutputDir);
        fs_extra_1.default.ensureDirSync(outputDir);
        if (fileType === 'openapi_2') {
            await this.openapi2handle(ymlObj, outputDir);
        }
        else if (fileType === 'openapi_3') {
            await this.openapi3handle(ymlObj, outputDir);
        }
        else {
            throw new Error('No appropriate file type.');
        }
    }
    parse(relativeInputPath) {
        const fqFilePath = path_1.default.join(process.cwd(), relativeInputPath);
        const fileString = fs_extra_1.default.readFileSync(fqFilePath).toString('utf8');
        return $RefParser.dereference(yamljs_1.default.parse(fileString));
    }
    whichApiFileType(ymlObj) {
        if (ymlObj.asyncapi && ymlObj.asyncapi[0] === '2' || ymlObj.openapi && ymlObj.openapi[0] === '3') {
            return 'openapi_3';
        }
        if (ymlObj.swagger && ymlObj.swagger[0] === '2' || ymlObj.openapi && ymlObj.openapi[0] === '2') {
            return 'openapi_2';
        }
        throw new Error('No valid api specification formation, looked for: asyncapi 2, swagger 2, openapi 2 and openapi 3');
    }
    async openapi2handle(ymlObj, outputDir) {
        if (!ymlObj.definitions) {
            throw new Error('Openapi 2 without any definitions to parse found in provided yaml file.');
        }
        this.walkObjects(ymlObj.definitions, outputDir);
    }
    async openapi3handle(ymlObj, outputDir) {
        if (!ymlObj.components || !ymlObj.components.schemas) {
            throw new Error('AsyncAPI / Openapi 3 without any components.schemas to parse found in provided yaml file.');
        }
        await this.walkObjects(ymlObj.components.schemas, outputDir);
    }
    async walkObjects(apiObjects, outputDir) {
        const keys = Object.keys(apiObjects);
        for (let i = 0; i < keys.length; ++i) {
            const schemaName = Strings_1.pascalCase(keys[i]);
            await this.generateInterfaceFile(outputDir, schemaName, apiObjects[keys[i]]);
        }
    }
    async generateInterfaceFile(destinationDir, schemaName, schemaObject) {
        fs_extra_1.default.writeFileSync(path_1.default.join(destinationDir, schemaName + '.ts'), await generateTypeScriptInterfaceText_1.default(schemaName, JSON.stringify(schemaObject)));
    }
}
exports.default = new ParseThenOutput();
