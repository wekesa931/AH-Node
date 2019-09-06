"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var article_controller_1 = __importDefault(require("./resources/article/article.controller"));
var app_1 = __importDefault(require("./app"));
// const app = express()
// app.disable('x-powered-by')
// app.use('/v1', routerV1)
var port = 8000;
var app = new app_1.default([
    new article_controller_1.default(),
], port);
app.listen();
