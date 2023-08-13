import express from 'express';
import graphqlHTTP from "express-graphql";
import graphql from "graphql";

import RootQuery from './Schemas/Queries.js';
import Mutation from './Schemas/Mutations.js';

import cors from "cors";

const {GraphQLSchema} = graphql;

const app = express();
const PORT = 8080;

app.use(cors());

const schema = new GraphQLSchema({query: RootQuery, mutation: Mutation});

app.use('/graphql', graphqlHTTP.graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(PORT, () => {console.log(`Running on port: http://localhost:${PORT}`)});