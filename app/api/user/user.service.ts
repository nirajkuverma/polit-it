import { type IUser } from "./user.dto";
import { pool } from "../../common/services/sql.service";
import { type RowDataPacket, type ResultSetHeader } from "mysql2";

export const createUser = async (data: IUser) => {
  const query =
    "INSERT INTO users (name, email, phone, type, password) VALUES (?, ?, ?, ?, ?)";
  const values = [
    data.name,
    data.email,
    data.phone,
    data.type,
    data.password || null,
  ];
  const [result] = await pool.execute<ResultSetHeader>(query, values);
  return { userId: result.insertId };
};

export const updateUser = async (id: number, data: IUser) => {
  const query =
    "UPDATE users SET name = ?, email = ?, phone = ?, type = ?, password = ? WHERE id = ?";
  const values = [
    data.name,
    data.email,
    data.phone,
    data.type,
    data.password || null,
    id,
  ];
  await pool.execute(query, values);
  return { id, ...data };
};

export const editUser = async (
  id: number,
  data: Partial<IUser>
): Promise<Partial<IUser> & { id: number }> => {
  let query = "UPDATE users SET ";
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

export const deleteUser = async (id: number) => {
  const query = "DELETE FROM users WHERE id = ?";
  await pool.execute(query, [id]);
  return { id, deleted: true };
};

export const getUserById = async (id: number) => {
  const query = "SELECT name, email, phone, type FROM users WHERE id = ?";
  const [rows] = await pool.execute<RowDataPacket[]>(query, [id]);
  return rows[0] || null;
};

export const getAllUsers = async () => {
  const query = "SELECT name, email, phone, type FROM users";
  const [rows] = await pool.execute<RowDataPacket[]>(query);
  return rows;
};

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  const [rows] = await pool.execute<RowDataPacket[]>(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  if (Array.isArray(rows) && rows.length > 0) {
    return rows[0] as IUser;
  }
  return null;
};
