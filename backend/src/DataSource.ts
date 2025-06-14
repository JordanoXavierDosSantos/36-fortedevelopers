import "./services/LoadEnvironment";
import { DataSource as TypeORMDataSource } from "typeorm";
import {
  getEnvironmentVariable,
  getEnvironmentVariableAsNumber,
} from "./services/Environment";

const DataSource = new TypeORMDataSource({
  type: "mysql",
  host: getEnvironmentVariable("DATABASE_HOST"),
  port: getEnvironmentVariableAsNumber("DATABASE_PORT"),
  username: getEnvironmentVariable("DATABASE_USERNAME"),
  password: getEnvironmentVariable("DATABASE_PASSWORD"),
  database: getEnvironmentVariable("DATABASE_NAME"),
  synchronize: true,
  logging: false,
  entities: ["src/entities/**/*.ts"],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: ["src/subscribers/**/*.ts"],
});

export default DataSource;
