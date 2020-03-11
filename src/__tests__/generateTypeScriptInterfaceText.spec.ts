import generateTypeScriptInterfaceText from '@/generateTypeScriptInterfaceText';

it('should not trow an error', async () => {
  const output = await generateTypeScriptInterfaceText('Person', `
    {
      type: 'object',
      properties: { lon: { type: 'number' }, lat: { type: 'number' } }
    }
    `);
  expect(output).toBe(
    `export interface Person {
    lat?: number;
    lon?: number;
}

`);
});
