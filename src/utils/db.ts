import { connect, ConnectOptions } from "mongoose";

const { NEXT_MONGODB_URI } = process.env;

const options: ConnectOptions = {
  autoIndex: true,
};

const connectToDatabase = (): Promise<typeof import("mongoose")> =>
  connect(NEXT_MONGODB_URI, options);

export default connectToDatabase;
