import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLType, GraphQLNonNull, GraphQLNullableType } from 'graphql';
import {
    IGenericRepositoryFunctions
  } from '../Types/Repository.type';

export interface IGraphQLService {
    RootQueryType: GraphQLObjectType;
    RootMutationType: GraphQLObjectType;
  }

export interface IGenericGQLFunctions{
    getAll(
        model: GraphQLObjectType,
        repository: IGenericRepositoryFunctions,
        desc: string
      ):{
        type: GraphQLList<GraphQLType>,
        description: typeof desc,
        resolve(): Promise<any> | unknown;
      },
    getAllDeleted(
        model: GraphQLObjectType,
        repository: IGenericRepositoryFunctions,
        desc: string
      ):{
        type: GraphQLList<GraphQLType>,
        description: typeof desc,
        resolve(): Promise<any> | unknown;
      },
    getById(
        model: GraphQLObjectType,
        repository: IGenericRepositoryFunctions,
        desc: string
      ):{
        type: typeof model,
        description: typeof desc,
        args: {id: { type: typeof GraphQLString }},
        resolve(parent: any, args: any): Promise<any> | unknown;
      }
    paging(
        model: GraphQLObjectType,
        repository: IGenericRepositoryFunctions,
        desc: string
      ):{
        type: GraphQLList<GraphQLType>,
        description: typeof desc,
        args: {
            first: { type: GraphQLNonNull<GraphQLNullableType> },
            offset: { type: GraphQLNonNull<GraphQLNullableType> }
        },
        resolve(parent: any, args: any): Promise<any> | unknown;
      }
    
}