import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt
  } from 'graphql';
  import { IGenericGQLFunctions, IGraphQLService } from '../Types/Service.type';
  import {
    IGameRepository,
    IGenericRepositoryFunctions
  } from '../Types/Repository.type';
  import { IGameModel } from '../Models/Game.model';
  import Logging from '../Utils/Logging';
  
  export class GraphQLService implements IGraphQLService {
    constructor(
      public gameRepository: IGameRepository,
      public GQLFunctions: IGenericGQLFunctions
    ) {}
  
    GameType: GraphQLObjectType = new GraphQLObjectType({
      name: 'Game',
      description: 'A video game',
      fields: () => ({
        _id: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLNonNull(GraphQLString) },
        dateCreated: { type: GraphQLNonNull(GraphQLString) },
        score: { type: GraphQLString },
        dateBeaten: { type: GraphQLString },
        image: { type: GraphQLString }
      })
    });
  
    RootQueryType = new GraphQLObjectType({
      name: 'Query',
      description: 'Root Query',
      fields: () => ({
        game: this.GQLFunctions.getById(this.GameType, this.gameRepository, 'A game'),
        games: this.GQLFunctions.getAll(this.GameType, this.gameRepository, 'A list of games'),
        gamesPaging: this.GQLFunctions.paging(
          this.GameType,
          this.gameRepository,
          'A list of games with paging'
        ),
        gamesDeleted: this.GQLFunctions.getAllDeleted(
          this.GameType,
          this.gameRepository,
          'A list of deleted games'
        )
      })
    });
  
    RootMutationType = new GraphQLObjectType({
      name: 'Mutation',
      description: 'Root mutation',
      fields: () => ({
        addGame: {
          type: this.GameType,
          description: 'Add game',
          args: {
            /////////////////////////////////
            name: { type: GraphQLNonNull(GraphQLString) },
            dateCreated: { type: GraphQLNonNull(GraphQLString) },
            score: { type: GraphQLInt },
            dateBeaten: { type: GraphQLString },
            image: { type: GraphQLString }
          },
          resolve: async (parent, args) => {
            try {
              return this.gameRepository.create({
                name: args.name,
                dateCreated: args.dateCreated,
                score: args.score,
                dateBeaten: args.dateBeaten,
                image: args.image
              } as IGameModel);
            } catch (error) {
              return error;
            }
          }
        },
        updateGame: {
          type: this.GameType,
          description: 'Update game',
          args: {
            id: { type: GraphQLNonNull(GraphQLString) },
            givenName: { type: GraphQLNonNull(GraphQLString) },
            age: { type: GraphQLNonNull(GraphQLInt) },
            breed: { type: GraphQLNonNull(GraphQLString) },
            weight: { type: GraphQLNonNull(GraphQLInt) },
            eyeColor: { type: GraphQLNonNull(GraphQLString) }
          },
          resolve: async (parent, args) => {
            try {
              const existingModel: IGameModel = await this.gameRepository.getById(
                args.id
              );
              if (!existingModel) return 'model not found';
              return this.gameRepository.update(existingModel, {
                name: args.name,
                dateCreated: args.dateCreated,
                score: args.score,
                dateBeaten: args.dateBeaten,
                image: args.image
              } as IGameModel);
            } catch (error) {
              return error;
            }
          }
        },
        deleteGame: {
          type: this.GameType,
          description: 'Delete game',
          args: {
            id: { type: GraphQLNonNull(GraphQLString) }
          },
          resolve: async (parent, args) => {
            try {
              const existingModel = await this.gameRepository.getById(args.id);
              if (!existingModel) return 'model not found';
              return this.gameRepository.delete(existingModel);
            } catch (error) {
              return error;
            }
          }
        }
      })
    });
  }