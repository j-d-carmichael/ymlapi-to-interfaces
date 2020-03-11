declare class ParseThenOutput {
    init(relativeInputPath: string, relativeOutputDir: string): Promise<void>;
    parse(relativeInputPath: string): Promise<any>;
    whichApiFileType(ymlObj: any): string;
    openapi2handle(ymlObj: any, outputDir: string): Promise<void>;
    openapi3handle(ymlObj: any, outputDir: string): Promise<void>;
    walkObjects(apiObjects: any, outputDir: string): Promise<void>;
    generateInterfaceFile(destinationDir: string, schemaName: string, schemaObject: object): Promise<void>;
}
declare const _default: ParseThenOutput;
export default _default;
