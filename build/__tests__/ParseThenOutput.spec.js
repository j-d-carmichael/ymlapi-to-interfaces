"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ParseThenOutput_1 = tslib_1.__importDefault(require("../ParseThenOutput"));
const hasha_1 = tslib_1.__importDefault(require("hasha"));
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const cleanup = async () => {
    fs_extra_1.default.removeSync('src/__tests__/interfaces_2');
    fs_extra_1.default.removeSync('src/__tests__/interfaces_3');
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
        await ParseThenOutput_1.default.init('src/__tests__/srcSWAGGER2.yml', 'src/__tests__/interfaces_2');
        await wait();
        const hash2 = await hasha_1.default.fromFile('src/__tests__/interfaces_2/Weathers.ts', { algorithm: 'md5' });
        expect(hash2).toBe('579568f73cedb0b42d105e37d72165a8');
        await ParseThenOutput_1.default.init('src/__tests__/srcASYNC2.yml', 'src/__tests__/interfaces_3');
        const hash = await hasha_1.default.fromFile('src/__tests__/interfaces_3/MsAuthCacheConnection.ts', { algorithm: 'md5' });
        expect(hash).toBe('ca25aa11fc7de41cbbb604243ed0d61f');
        await cleanup();
    });
});
