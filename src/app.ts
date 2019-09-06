import express = require("express");
import bodyParser = require("body-parser");
import { logger } from "./utils/logger";

class App {
  public app: express.Application;
  public port: number;

  constructor(controllers: any, port: number) {
    this.app = express();
    this.port = port;

    this.loggerFunction()
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    
  }

  private loggerFunction () {
    this.app.use(logger);
  }

  private initializeMiddlewares () {
    this.app.use(bodyParser.json());
  }

  private initializeControllers(controllers:any) {
    controllers.forEach((controller: any) => {
      this.app.use('/v1/', controller.router)
    });
  }
  public listen() {
    this.app.listen(this.port, (): void => console.log(`server listening at port ${this.port}`))
  }
}

export default App;