import { promises as fs } from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import { dbConfig } from "../config/config";
import logger from "../util/logger";

async function ensureDatabaseDirectoryExists() {
  const dbPath = path.dirname(dbConfig.storage);

  try {
    await fs.access(dbPath);
  } catch (error) {
    console.error(error);
    logger.error("Failed to create database directory:", error);
  }
}

const sequelizeConnection = new Sequelize({
  dialect: dbConfig.dialect,
  storage: dbConfig.storage,
  logging: msg => logger.debug(msg),
});

async function initializeDatabase() {
  await ensureDatabaseDirectoryExists();
  try {
    await sequelizeConnection.authenticate();
    logger.info(
      "Connection to the database has been established successfully."
    );
    await sequelizeConnection.sync();
    logger.info("Database synchronized successfully.");
  } catch (error) {
    logger.error("Unable to connect to the database:", error);
    throw error;
  }
}

export { sequelizeConnection, initializeDatabase };
