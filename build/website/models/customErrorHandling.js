"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
var CustomError = /** @class */ (function () {
    function CustomError(message, status, additionalInfo) {
        if (status === void 0) { status = 500; }
        if (additionalInfo === void 0) { additionalInfo = {}; }
        this.message = message;
        this.status = status;
        this.additionalInfo = additionalInfo;
    }
    return CustomError;
}());
exports.CustomError = CustomError;
