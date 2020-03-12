"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var ParseThenOutput_1 = tslib_1.__importDefault(require("../ParseThenOutput"));
var hasha_1 = tslib_1.__importDefault(require("hasha"));
var fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
var cleanup = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        fs_extra_1["default"].removeSync('src/__tests__/interfaces_2');
        fs_extra_1["default"].removeSync('src/__tests__/interfaces_3');
        return [2 /*return*/];
    });
}); };
var wait = function () {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, 500);
    });
};
describe('general parse and write tot disk', function () {
    var _this = this;
    it('should parse async api correctly', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var hash2, hash;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cleanup()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, ParseThenOutput_1["default"].init('src/__tests__/srcSWAGGER2.yml', 'src/__tests__/interfaces_2')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, wait()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, hasha_1["default"].fromFile('src/__tests__/interfaces_2/Weathers.ts', { algorithm: 'md5' })];
                case 4:
                    hash2 = _a.sent();
                    expect(hash2).toBe('579568f73cedb0b42d105e37d72165a8');
                    return [4 /*yield*/, ParseThenOutput_1["default"].init('src/__tests__/srcASYNC2.yml', 'src/__tests__/interfaces_3')];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, hasha_1["default"].fromFile('src/__tests__/interfaces_3/MsAuthCacheConnection.ts', { algorithm: 'md5' })];
                case 6:
                    hash = _a.sent();
                    expect(hash).toBe('ca25aa11fc7de41cbbb604243ed0d61f');
                    return [4 /*yield*/, cleanup()];
                case 7:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
