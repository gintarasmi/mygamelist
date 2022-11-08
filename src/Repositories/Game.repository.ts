import mongoose from 'mongoose';
import GameModel, { IGameModel } from '../Models/Game.model';
import { GenericRepository } from './Generic.repository';

export class GameRepository extends GenericRepository {
  dbModel = GameModel;
  async update(model: IGameModel, newModel: IGameModel) {
    model.set(newModel);
    return model.save();
  }
  async create(newModel: IGameModel) {
    const model = new this.dbModel(newModel);
    return await model.save();
  }
  //nes negauna type kitaip
  async getById(id: string) {
    return this.dbModel.findById(id).where('deletedAt').equals(null);
  }
}