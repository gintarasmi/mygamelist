import mongoose from 'mongoose';
import express from 'express';
import Logging from './Utils/Logging';
import App from './Bootstrap';
import GraphQLController from './Controllers/Game.controller';
import { GraphQLService } from './Services/Game.service';
import { GameRepository } from './Repositories/Game.repository';
import { GenericGQLFunctions } from './Services/GenericGQL.functions';
import * as dotenv from 'dotenv'

dotenv.config();
const url = process.env.DB_URL || "";


const app = new App([new GraphQLController(new GraphQLService(new GameRepository(), new GenericGQLFunctions))]);

    mongoose
    .connect(url, { retryWrites: true, w: 'majority' })
    .then(() => {
      Logging.info('hello');
      Logging.info('Connected to MongoDB');
      //starts if connected
      app.listen();
    })
    .catch((error) => {
      Logging.error(error);
    });