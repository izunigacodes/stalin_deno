import {
  Database,
  MongoClient,
} from "https://deno.land/x/mongo@v0.32.0/mod.ts";

import { MONGODB_URL } from "./config.ts";
import { MONGO_DATABASE } from "./config.ts";

let db: Database;
async function createMongoDBConnection() {
  try {
    const client = new MongoClient();
    await client.connect(MONGODB_URL);
    console.log("MongoDB conecion establecida..");
    return client.database(MONGO_DATABASE);
  } catch (error) {
  }
}

db = await createMongoDBConnection();
export { createMongoDBConnection, db };
