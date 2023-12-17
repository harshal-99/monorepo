import { config } from "dotenv";
import mongoose from "mongoose";
import { env } from "process";
/* eslint-disable */
declare global {
  var __db: Promise<typeof mongoose> | undefined;
}

config();

let connectionString = env.CONNECTION_STRING ?? "";
if (!connectionString) {
  throw new Error("No connection string provided. ");
}

const dbName = "data-vis";

let mongodb: Promise<typeof mongoose>;

if (env.NODE_ENV === "production") {
  mongodb = mongoose.connect(connectionString, { dbName });
} else {
  if (!global.__db) {
    global.__db = mongoose.connect(connectionString, {
      dbName,
    });
  }
  mongodb = global.__db;
}

export { mongodb };
