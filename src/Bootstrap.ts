import express from 'express';
import type { IApp } from './Types/App.type';
import type Controller from './Types/Controller.type';
import Logging from './Utils/Logging';

export default class App implements IApp {
  public app: express.Application;
  constructor(controllers: Controller[]) {
    this.app = express();

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  public async listen() {
    this.app.listen(4000, function () {
      Logging.info(`Running on port ${4000}`);
    });
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeControllers(controllers: Controller[]) {
    this.app.get('/', (req, res) => {
      res.sendFile(__dirname + '/index.html');
    });
    this.app.get('/socketServer.js', (req, res) => {
      res.sendFile(__dirname + '/socketServer.js');
    });

    this.app //healthcheck
      .get('/ping', function (req, res) {
        res.status(200).json({ message: 'Hello world' });
      });

    controllers.forEach((controller) => {
      this.app.use(controller.router);
    });

    //route not found
    this.app.use((req, res) => {
      const error = new Error('route not found');
      Logging.error(error);

      return res.status(404).json({ message: error.message });
    });
  }
}