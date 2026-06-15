import { env } from "./config/env.js";
import app from "./app.js";
import logger from "./utils/logger.js";

app.listen(env.PORT, () => {
  logger.info(`Servidor corriendo en http://localhost:${env.PORT}`);
  logger.info(`Entorno: ${env.NODE_ENV}`);
});
