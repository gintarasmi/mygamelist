import mongoose, { Document, Model } from 'mongoose';

export interface DeletedAt{
    deletedAt: Date | undefined;
}

export interface IRepository {
  dbModel: Model<any>;
}

export interface IGenericRepositoryFunctions {
  getAll(): Promise<any>;
  getById(id: string): Promise<any>;
  delete(modelToDelete: Document & DeletedAt): Promise<any>;
  restoreDeleted(modelToDelete: Document & DeletedAt): Promise<any>;
  getByIdDeleted(id: string): Promise<any>;
  getAllDeleted(): Promise<any>;
  paging(pageNumber: number, pageSize: number): Promise<any>;
  pagingOffset(first: number, offset: number): Promise<any>;
  create(newModel: Document): Promise<any>;
  update(model: Document, newModel: Document): Promise<any>;
}

export interface IGameRepository
  extends IRepository,
    IGenericRepositoryFunctions {}