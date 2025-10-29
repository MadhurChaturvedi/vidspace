import mongoose from "mongoose";

const MONODB_URI = process.env.MONGDB_URL!;

if (!MONODB_URI) {
  throw new Error("Pls Define mongo_url in env variable");
}

const cached = global.mongoose;

if (!cached) {
  global.mongoose = { conn: null, promise: null };
}

export async function connectToDataBase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      maxPoolSize: 10,
    };
    mongoose.connect(MONODB_URI, opts).then(() => mongoose.connection);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
  }
  return cached.conn;
}
