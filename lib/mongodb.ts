import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;

if (!uri) throw new Error("MONGODB_URI is not defined");

declare global {
  var _mongoClient: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClient) {
    global._mongoClient = new MongoClient(uri).connect();
  }
  clientPromise = global._mongoClient;
} else {
  clientPromise = new MongoClient(uri).connect();
}

export default clientPromise;
