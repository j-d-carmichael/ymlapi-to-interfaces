# ymlapi-to-interfaces

Read a swagger/openapi/asyncapi yml file, extract the models, generate interfaces from them and then write to disk.

> Currently only support typescript interfaces as this is all i need for now, but a PR for others is more than welcome.

## The result
The end result of a successful execution of this tool will be:

- The output directory will be created if it was not already there.
- The output directory will be emptied before parsing the yml file.
- The tool dereferences the input via [json-schema-ref-parser](https://www.npmjs.com/package/json-schema-ref-parser).
- Parses the yml to native js object via [yamljs](https://www.npmjs.com/package/yamljs).
- Checks the input file is a valid type (swagger/openapi/asyncapi).
- Checks the input file has either definitions or component/schemas.
- The tool will copy out each model 1 at a time and convert to typescript interfaces, PascalCase, to the output directory.
  - The tool uses [quicktype](https://www.npmjs.com/package/quicktype) to generate the interfaces.

## CLI
This tool can be run via command line:
```
ymlapi-interfaces -i relative/path/to/file.yml -o realtive/path/to/output/directory
```

## Programatic use
To see how to use this tool within your own scripts please see the unit tests within this repo

## Swagger2/openapi2
Reads the definitions, converts to interfaces named as the definitions are named.
Currently, everything else is ignored.

## Openapi3/AsyncAPI
Reads the component/schemas, converts to interfaces named as the component/schemas are named .
Currently, everything else is ignored.
