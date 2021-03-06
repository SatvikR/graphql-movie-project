import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import { buildSchema } from "type-graphql";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { MovieResolver } from "./resolvers/movieResolver";
import { DirectorResolver } from "./resolvers/directorResolver";

(async () => {
  await createConnection();

  const app = express();

  app.use(
    cors({
      origin: "http://localhost:3000",
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [MovieResolver, DirectorResolver],
      validate: false,
    }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => {
    console.log("server started");
  });
})().catch((err) => console.log(err));
