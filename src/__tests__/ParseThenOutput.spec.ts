import ParseThenOutput from '@/ParseThenOutput';
import hasha from 'hasha';
import fs from 'fs-extra';

const cleanup = async () => {
  fs.removeSync('src/__tests__/interfaces_2');
  fs.removeSync('src/__tests__/interfaces_3');
};
const wait = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
};
describe('general parse and write tot disk', function () {
  it('should parse async api correctly', async () => {
    await cleanup();
    await ParseThenOutput.init('src/__tests__/srcSWAGGER2.yml', 'src/__tests__/interfaces_2');
    await wait();
    const hash2 = await hasha.fromFile('src/__tests__/interfaces_2/Weathers.ts', { algorithm: 'md5' });
    expect(hash2).toBe('579568f73cedb0b42d105e37d72165a8');

    await ParseThenOutput.init('src/__tests__/srcASYNC2.yml', 'src/__tests__/interfaces_3');
    const hash = await hasha.fromFile('src/__tests__/interfaces_3/ms_auth.cache.connection.ts', { algorithm: 'md5' });
    expect(hash).toBe('ca25aa11fc7de41cbbb604243ed0d61f');
    await cleanup();
  });
});
