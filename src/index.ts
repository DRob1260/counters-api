import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import schema from "./schema";

const app = express();

const graphqlServer = graphqlHTTP({ schema, graphiql: true });

app.use(cors());
app.use("/graphql", graphqlServer);

app.listen(8080);
