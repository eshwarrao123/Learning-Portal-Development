import mongoose from 'mongoose';

const connectDB = async () => {
  let retries = 5;
  while (retries > 0) {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      // eslint-disable-next-line no-console
      console.info(`[db] MongoDB connected: ${conn.connection.host}`);
      return;
    } catch (err) {
      retries -= 1;
      // eslint-disable-next-line no-console
      console.error(`[db] Connection failed. Retries left: ${retries}. ${err.message}`);
      if (retries === 0) process.exit(1);
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
};

export default connectDB;
