"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ArticleController = /** @class */ (function () {
    function ArticleController() {
        var _this = this;
        this.path = '/articles';
        this.router = express_1.Router();
        this.articles = [
            {
                author: 'Marcin',
                content: 'Dolor sit amet',
                title: 'Lorem Ipsum',
            }
        ];
        this.getAllArticles = function (req, res) {
            res.send(_this.articles);
        };
        this.createArticle = function (req, res) {
            var article = req.body;
            _this.articles.push(article);
            res.send("Article created successfully");
        };
        this.intializeRoutes();
    }
    ArticleController.prototype.intializeRoutes = function () {
        this.router.route(this.path)
            .get(this.getAllArticles)
            .post(this.createArticle);
    };
    return ArticleController;
}());
exports.default = ArticleController;
