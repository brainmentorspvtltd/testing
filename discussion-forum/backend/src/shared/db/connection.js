import mongoose from "mongoose";

export const createConnection = async () => {
  await mongoose.connect(process.env.DB_URL);
};
export default mongoose;
