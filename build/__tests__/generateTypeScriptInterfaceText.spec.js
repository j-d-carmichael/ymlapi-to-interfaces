"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const generateTypeScriptInterfaceText_1 = tslib_1.__importDefault(require("../generateTypeScriptInterfaceText"));
it('should not trow an error', async () => {
    const output = await generateTypeScriptInterfaceText_1.default('Person', `
    {
      type: 'object',
      properties: { lon: { type: 'number' }, lat: { type: 'number' } }
    }
    `);
    expect(output).toBe(`export interface Person {
    lat?: number;
    lon?: number;
}

`);
});
