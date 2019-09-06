"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var logger_1 = require("./utils/logger");
var App = /** @class */ (function () {
    function App(controllers, port) {
        this.app = express();
        this.port = port;
        this.loggerFunction();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }
    App.prototype.loggerFunction = function () {
        this.app.use(logger_1.logger);
    };
    App.prototype.initializeMiddlewares = function () {
        this.app.use(bodyParser.json());
    };
    App.prototype.initializeControllers = function (controllers) {
        var _this = this;
        controllers.forEach(function (controller) {
            _this.app.use('/v1/', controller.router);
        });
    };
    App.prototype.listen = function () {
        var _this = this;
        this.app.listen(this.port, function () { return console.log("server listening at port " + _this.port); });
    };
    return App;
}());
exports.default = App;
