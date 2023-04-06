import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import http from 'http';
import { RESTDataSource } from '@apollo/datasource-rest';

class BooksAPI extends RESTDataSource {
    baseURL = 'http://localhost:3500';

    async getBooks() {
        return await this.get('/books');
    }
}

const resolvers = {
    Query: {
        books: async (_, __, { dataSources }) =>
            dataSources.booksAPI.getBooks(),
    },
};

const typeDefs = `
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

const corsOptions = {
    origin: [/localhost:/, /google\.com/],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Authorization',
        'X-Xsrf-Token',
        'X-Forwarded-For',
        'X-Real-IP',
    ],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(
    '/graphql',
    expressMiddleware(server, {
        context: async () => {
            const { cache } = server;
            return {
                dataSources: {
                    booksAPI: new BooksAPI({ cache }),
                },
            };
        },
    })
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/graphql`);
