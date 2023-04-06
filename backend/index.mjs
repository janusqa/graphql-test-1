import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];

const resolvers = {
    Query: {
        books: () => books,
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

const server = new ApolloServer({
    typeDefs,
    resolvers,
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

app.use('/graphql', expressMiddleware(server));

await new Promise((resolve) => app.listen({ port: 4000 }, resolve));

console.log(`🚀 Server ready at http://localhost:4000/graphql`);

app.get('/health', (req, res) => {
    res.status(200).json({ message: 'Okay!' });
});
