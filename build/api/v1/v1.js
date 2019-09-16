"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var logger_1 = require("../../utils/logger");
var User_1 = require("./routes/User");
exports.routerV1 = express_1.Router();
exports.routerV1.use(logger_1.logger);
exports.routerV1.get('/', function (req, res) {
    res.send('Welcome to Authors Haven');
});
exports.routerV1.use(User_1.userRouter);
