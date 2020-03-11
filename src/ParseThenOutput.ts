import yamljs from 'yamljs';
import fs from 'fs-extra';
import path from 'path';
import generateTypeScriptInterfaceText from '@/generateTypeScriptInterfaceText';

const $RefParser = require('json-schema-ref-parser');

class ParseThenOutput {
  public async init (relativeInputPath: string, relativeOutputDir: string): Promise<void> {
    const ymlObj = await this.parse(relativeInputPath);
    const fileType = this.whichApiFileType(ymlObj);
    const outputDir = path.join(process.cwd(), relativeOutputDir);
    fs.ensureDirSync(outputDir);
    if (fileType === 'openapi_2') {
      await this.openapi2handle(ymlObj, outputDir);
    } else if (fileType === 'openapi_3') {
      await this.openapi3handle(ymlObj, outputDir);
    } else {
      throw new Error('No appropriate file type.');
    }
  }

  public parse (relativeInputPath: string): Promise<any> {
    const fqFilePath = path.join(process.cwd(), relativeInputPath);
    const fileString = fs.readFileSync(fqFilePath).toString('utf8');
    return $RefParser.dereference(yamljs.parse(fileString));
  }

  public whichApiFileType (ymlObj: any): string {
    if (ymlObj.asyncapi && ymlObj.asyncapi[0] === '2' || ymlObj.openapi && ymlObj.openapi[0] === '3') {
      return 'openapi_3';
    }
    if (ymlObj.swagger && ymlObj.swagger[0] === '2' || ymlObj.openapi && ymlObj.openapi[0] === '2') {
      return 'openapi_2';
    }
    throw new Error('No valid api specification formation, looked for: asyncapi 2, swagger 2, openapi 2 and openapi 3');
  }

  public async openapi2handle (ymlObj: any, outputDir: string): Promise<void> {
    if (!ymlObj.definitions) {
      throw new Error('Openapi 2 without any definitions to parse found in provided yaml file.');
    }
    this.walkObjects(ymlObj.definitions, outputDir);
  }

  public async openapi3handle (ymlObj: any, outputDir: string): Promise<void> {
    if (!ymlObj.components || !ymlObj.components.schemas) {
      throw new Error('AsyncAPI / Openapi 3 without any components.schemas to parse found in provided yaml file.');
    }
    await this.walkObjects(ymlObj.components.schemas, outputDir);
  }

  public async walkObjects (apiObjects: any, outputDir: string): Promise<void> {
    const keys = Object.keys(apiObjects);
    for (let i = 0; i < keys.length; ++i) {
      await this.generateInterfaceFile(outputDir, keys[i], apiObjects[keys[i]]);
    }
  }

  public async generateInterfaceFile (destinationDir: string, schemaName: string, schemaObject: object) {
    fs.writeFileSync(
      path.join(destinationDir, schemaName + '.ts'),
      await generateTypeScriptInterfaceText(schemaName, JSON.stringify(schemaObject)),
    );
  }
}

export default new ParseThenOutput();
