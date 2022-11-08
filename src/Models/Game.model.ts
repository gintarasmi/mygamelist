import mongoose, { Document, mongo, Schema } from 'mongoose';
import { IGame } from '../Types/Game.type';

export interface IGameModel extends IGame, Document {}

export const GameSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    dateCreated: { type: Date, required: true },
    score: { type: String },
    dateBeaten: { type: Date },
    image: { type: String }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default mongoose.model<IGameModel>('Game', GameSchema);