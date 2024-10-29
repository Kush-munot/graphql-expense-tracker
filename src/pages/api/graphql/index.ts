import { ApolloServer } from 'apollo-server-micro';
import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { typeDefs } from './schema/typeDefs';
import { resolvers } from './schema/resolvers';

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI as string;

if (!mongoose.connection.readyState) {
    mongoose.connect(MONGODB_URI);
}

// Create Apollo Server
const apolloServer = new ApolloServer({ typeDefs, resolvers });

const startServer = apolloServer.start();

// Next.js API route handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await startServer;
    await apolloServer.createHandler({ path: '/api/graphql' })(req, res);
}

export const config = {
    api: {
        bodyParser: false,
    },
};
