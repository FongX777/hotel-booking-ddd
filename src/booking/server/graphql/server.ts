import { ApolloServer, gql } from 'apollo-server';

import { UserRepository } from '../../usecase/user';
import { UserController } from '../../adapter/controller/user';
import { UserPrensenter } from '../../adapter/presenter/user';

const typeDefs = gql`
  type Query {
    helloWorld: String!
  }

  type Mutation {
    register(name: String, email: String, password: String): User
  }

  type User {
    name: String
    email: String
    mobilePhone: String
  }
`;
const resolvers = {
  Query: {
    helloWorld: () => 'helloworld'
  },
  Mutation: {
    register: (
      _: any,
      args: { name: string; email: string; password: string },
      context: GraphqlContext
    ) => {
      const userRepo = context.repository.user;
      const userController = new UserController(userRepo);

      const output = new UserPrensenter();
      const req = {
        name: args.name,
        email: args.email,
        password: args.password
      };

      userController.register(req, output);
      return output.user;
    }
  }
};

export interface GraphqlApp {
  start: () => void;
}

export interface Config {
  port: number;
}

export interface Repositories {
  user: UserRepository;
}

type GraphqlContext = {
  token: string;
  repository: Repositories;
};

export function createGraphqlServerApp(
  config: Config,
  repos: Repositories
): GraphqlApp {
  const server = new ApolloServer({
    cors: true,
    typeDefs,
    resolvers,
    context: ({ req, res }): GraphqlContext => {
      const token = req.headers['auth-token'] as string;
      return { token, repository: repos };
    }
  });

  const app: GraphqlApp = {
    start: () => {
      server.listen({ port: config.port }, () =>
        console.log(`🚀 Server ready at http://localhost:${config.port}`)
      );
    }
  };
  return app;
}
