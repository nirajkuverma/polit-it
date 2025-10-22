import { type ISubscription } from "./subscription.dto";
import { pool } from "../../common/services/sql.service";
import { type RowDataPacket, type ResultSetHeader } from "mysql2";

export const createSubscription = async (data: ISubscription) => {
  const query =
    "INSERT INTO subscription (title, description, api_call, amount, day) VALUES (?, ?, ?, ?, ?)";
  const values = [
    data.title,
    data.description,
    data.api_call,
    data.amount,
    data.day,
  ];
  const [result] = await pool.execute<ResultSetHeader>(query, values);
  return { id: result.insertId, ...data };
};

export const updateSubscription = async (id: number, data: ISubscription) => {
  const query =
    "UPDATE subscription SET title = ?, description = ?, api_call = ?, amount = ?, day = ? WHERE id = ?";
  const values = [
    data.title,
    data.description,
    data.api_call,
    data.amount,
    data.day,
    id,
  ];
  await pool.execute(query, values);
  return { id, ...data };
};

export const editSubscription = async (
  id: number,
  data: Partial<ISubscription>
): Promise<Partial<ISubscription> & { id: number }> => {
  let query = "UPDATE subscription SET ";
  const updates: string[] = [];
  const values: any[] = [];

  Object.keys(data).forEach((key) => {
    updates.push(`${key} = ?`);
    values.push((data as any)[key]);
  });

  query += updates.join(", ") + " WHERE id = ?";
  values.push(id);

  await pool.execute(query, values);
  return { id, ...data };
};

export const deleteSubscription = async (id: number) => {
  const query = "DELETE FROM subscription WHERE id = ?";
  await pool.execute(query, [id]);
  return { id, deleted: true };
};

export const getSubscriptionById = async (id: number) => {
  const query =
    "SELECT id, title, description, api_call, amount, day FROM subscription WHERE id = ?";
  const [rows] = await pool.execute<RowDataPacket[]>(query, [id]);
  return rows[0] || null;
};

export const getAllSubscriptions = async () => {
  const query =
    "SELECT id, title, description, api_call, amount, day FROM subscription";
  const [rows] = await pool.execute<RowDataPacket[]>(query);
  return rows;
};

export const getSubscriptionByTitle = async (
  title: string
): Promise<ISubscription | null> => {
  const [rows] = await pool.execute(
    "SELECT * FROM subscription WHERE title = ?",
    [title]
  );
  if (Array.isArray(rows) && rows.length > 0) {
    return rows[0] as ISubscription;
  }
  return null;
};
