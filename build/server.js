"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var v1_1 = require("./api/v1/v1");
var app = express();
app.disable('x-powered-by');
app.use('/v1', v1_1.routerV1);
app.listen(process.env.PORT || 8000, function () { console.log("Server started..."); });
