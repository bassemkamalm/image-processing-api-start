"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Create my middleware logger
var logger = function (req, res, next) {
    var url = req.url;
    console.log("".concat(url, " was visited"));
    next();
};
exports.default = logger;
