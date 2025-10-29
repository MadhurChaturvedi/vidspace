import { Connecton } from "mongoose";

declare global {
  var mongoose: {
    conn: Connecton | null;
    promise: Promise<Connecton> | null;
  };
}
