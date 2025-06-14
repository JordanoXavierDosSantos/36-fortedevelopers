import {
  Connection,
  ConnectionManager,
  createConnection,
  getConnectionManager,
} from "typeorm";
import path from "path";
import {
  getEnvironmentVariable,
  getEnvironmentVariableAsNumber,
} from "./Environment";

export class Database {
  private readonly connectionManager: ConnectionManager;

  constructor() {
    this.connectionManager = getConnectionManager();
  }

  public async getConnection(): Promise<Connection> {
    const CONNECTION_NAME = `default`;

    let connection: Connection;

    if (this.connectionManager.has(CONNECTION_NAME)) {
      connection = this.connectionManager.get(CONNECTION_NAME);
      if (!connection.isConnected) connection = await connection.connect();
    } else {
      connection = await createConnection({
        name: `default`,
        type: `mysql`,
        port: getEnvironmentVariableAsNumber("DATABASE_PORT"),
        synchronize: true,
        logging: false,
        host: getEnvironmentVariable("DATABASE_HOST"),
        username: getEnvironmentVariable("DATABASE_USERNAME"),
        database: getEnvironmentVariable("DATABASE_NAME"),
        password: getEnvironmentVariable("DATABASE_PASSWORD"),
        entities: [path.join(__dirname, "..", "entities", "*.*")],
        subscribers: [path.join(__dirname, "..", "subscribers", "*.*")],
        extra: {
          connectTimeout: 3000,
          connectionLimit: 5,
          queueLimit: 6000,
        },
        connectTimeout: 3000,
        insecureAuth: true,
        timezone: "+00:00",
      });
    }

    return connection;
  }

  public static async getConnection(): Promise<Connection> {
    const database = new Database();
    return await database.getConnection();
  }

  public static async flush() {
    if (process.env.NODE_ENV !== "test") {
      throw new Error(
        "Database flush() can only be called in test environment"
      );
    }

    const database = new Database();
    const connection = await database.getConnection();
    await connection.dropDatabase();
    await connection.synchronize();
  }
}
