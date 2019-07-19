import { ApolloServer, gql } from 'apollo-server';
import { UserRepository } from '../../usecase/user';

const typeDefs = gql`
  type Query {
    helloWorld: String!
  }
`;
const resolvers = {
  Query: {
    helloWorld: () => 'helloworld'
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

export function createGraphqlServerApp(
  config: Config,
  repos: Repositories
): GraphqlApp {
  const server = new ApolloServer({
    cors: true,
    typeDefs,
    resolvers,
    context: ({ req, res }) => {
      const token = req.headers['auth-token'];
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
