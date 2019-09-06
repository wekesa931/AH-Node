import express = require("express");
import { routerV1 } from './resources/v1';
import ArticleController from "./resources/article/article.controller";
import App from "./app";

// const app = express()

// app.disable('x-powered-by')
// app.use('/v1', routerV1)

const port: number = 8000

const app = new App(
  [
    new ArticleController(),
  ],
  port,
)

app.listen();