import express, { Express, Request, Response } from "express";

import Controller from "./interfaces/controller.interface";
import cors from "cors";
import errorMiddleware from "./middlewares/error.middleware";
import fileUpload from "express-fileupload";
import path from "path";
import router from "./routes/index";
import { sequelize } from "./db";

const PORT = process.env.PORT || 5000;

class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();

    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(PORT, () => {
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }

  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use("/api", router);
    this.app.use(express.static(path.resolve(__dirname, "uploads")));
    this.app.use(fileUpload({}));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/api", controller.router);
    });
  }

  private async connectToTheDatabase() {
    try {
      await sequelize.authenticate();
      await sequelize.sync();
    } catch (e) {
      console.log(e);
    }
  }
}

export default App;
