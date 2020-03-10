# ymlapi-to-interfaces

Read a swagger/openapi/asyncapi yml file, extract the models, generate interfaces from them and then write to disk.

## Swagger2/openapi2
Reads the definitions, converts to interfaces named as the definitions are named.
Currently, everything else is ignored.

## Openapi3/AsyncAPI
Reads the component/schemas, converts to interfaces named as the component/schemas are named .
Currently, everything else is ignored.
