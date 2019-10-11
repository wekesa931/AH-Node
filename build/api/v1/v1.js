"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var logger_1 = require("../../utils/logger");
var User_1 = require("./routes/User");
var Profile_1 = require("./routes/Profile");
var Article_1 = require("./routes/Article");
var Comments_1 = require("./routes/Comments");
exports.routerV1 = express_1.Router();
exports.routerV1.use(logger_1.logger);
exports.routerV1.get('/', function (req, res) {
    res.send('Welcome to Authors Haven');
});
exports.routerV1.use(User_1.userRouter);
exports.routerV1.use(Profile_1.profileRouter);
exports.routerV1.use(Article_1.articleRouter);
exports.routerV1.use(Comments_1.commentRouter);
