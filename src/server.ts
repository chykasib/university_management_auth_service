import mongoose from "mongoose";
import app from "./app";
import config from "./config";

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log(`database connected successfully`);
    app.listen(config.port, () => {
      console.log(`database listening on port ${config.port}`);
    });
  } catch (err) {
    console.error(`database connect to fail`, err);
  }
}

bootstrap();
