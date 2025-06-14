import { HandleRequestProps } from "../api/Router";
import { Test } from "../entities/Test";
import { Database } from "../services/Database";

interface Props {
  data: string;
}

export default async function testRoute({ data }: HandleRequestProps<Props>) {
  const database = new Database();
  const connection = await database.getConnection();
  const test = await connection.manager.find(Test);
  return test;
}
