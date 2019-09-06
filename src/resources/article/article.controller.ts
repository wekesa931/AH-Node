import express, { RequestHandler, Router } from "express";
import Articles from './article.model';

export default class ArticleController {
  public path = '/articles'
  public router = Router();

  private articles: Articles[] = [
    {
      author: 'Marcin',
      content: 'Dolor sit amet',
      title: 'Lorem Ipsum',
    }
  ]
  constructor() {
    this.intializeRoutes();
  }
  public intializeRoutes() {
    this.router.route(this.path)
      .get(this.getAllArticles)
      .post(this.createArticle);
  }
  getAllArticles: RequestHandler = (req: express.Request, res: express.Response) => {
    res.send(this.articles);
  }
  createArticle = (req: express.Request, res: express.Response) => {
    const article: Articles = req.body;
    this.articles.push(article);
    res.send("Article created");
  }
}