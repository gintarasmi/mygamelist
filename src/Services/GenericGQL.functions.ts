import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt
  } from 'graphql'
  import {
    IGenericRepositoryFunctions
  } from '../Types/Repository.type';
import { IGenericGQLFunctions } from '../Types/Service.type';
export class GenericGQLFunctions implements IGenericGQLFunctions{
    getAll(
        model: GraphQLObjectType,
        repository: IGenericRepositoryFunctions,
        desc: string
      ) {
        return {
          type: new GraphQLList(model),
          description: desc,
          resolve: async () => {
            try {
              return await repository.getAll();
            } catch (error) {
              return error;
            }
          }
        };
      }
      getAllDeleted(
        model: GraphQLObjectType,
        repository: IGenericRepositoryFunctions,
        desc: string
      ) {
        return {
          type: new GraphQLList(model),
          description: desc,
          resolve: async () => {
            try {
              return await repository.getAllDeleted();
            } catch (error) {
              return error;
            }
          }
        };
      }
      getById(
        model: GraphQLObjectType,
        repository: IGenericRepositoryFunctions,
        desc: string
      ) {
        return {
          type: model,
          description: desc,
          args: {
            id: { type: GraphQLString }
          },
          resolve: async (parent: any, args: any) => {
            try {
              return repository.getById(args.id);
            } catch (error) {
              return error;
            }
          }
        };
      }
      paging(
        model: GraphQLObjectType,
        repository: IGenericRepositoryFunctions,
        desc: string
      ) {
        return {
          type: new GraphQLList(model),
          description: desc,
          args: {
            first: { type: GraphQLNonNull(GraphQLInt) },
            offset: { type: GraphQLNonNull(GraphQLInt) }
          },
          resolve: async (parent: any, args: any) => {
            try {
              if (args.first < 1 || args.offset < 0) return 'Invalid arguments';
              return await repository.pagingOffset(args.first, args.offset);
            } catch (error) {
              return error;
            }
          }
        };
      }
}