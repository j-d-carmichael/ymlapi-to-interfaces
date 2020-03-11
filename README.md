# ymlapi-to-interfaces

Read a swagger/openapi/asyncapi yml file, extract the models, generate interfaces from them and then write to disk.

> Currently only support typescript interfaces as this is all i need for now, but a PR for others is more than welcome.

## Swagger2/openapi2
Reads the definitions, converts to interfaces named as the definitions are named.
Currently, everything else is ignored.

## Openapi3/AsyncAPI
Reads the component/schemas, converts to interfaces named as the component/schemas are named .
Currently, everything else is ignored.

## CLI
This tool can be run via command line:
```
ymlapi-interfaces -i relative/path/to/file.yml -o realtive/path/to/output/directory
```

## Programatic use
To see how to use this tool within your own scripts please see the unit tests within this repo
