import { type IApiLog } from "./apiLog.dto";
import { pool } from "../../common/services/sql.service";
import { type RowDataPacket, type ResultSetHeader } from "mysql2";

// Create log entry
export const createApiLog = async (data: Partial<IApiLog>) => {
  const query =
    "INSERT INTO api_log (userId, `key`, `date`, `time`) VALUES (?, ?, CURDATE(), CURTIME())";
  const values = [data.userId, data.key];
  const [result] = await pool.execute<ResultSetHeader>(query, values);
  return { id: result.insertId, ...data };
};

// Update log entry
export const updateApiLog = async (id: number, data: IApiLog) => {
  const query =
    "UPDATE api_log SET userId = ?, `key` = ?, `date` = ?, `time` = ? WHERE id = ?";
  const values = [data.userId, data.key, data.date, data.time, id];
  await pool.execute(query, values);
  return { id, ...data };
};

// Edit log entry dynamically (partial update)
export const editApiLog = async (
  id: number,
  data: Partial<IApiLog>
): Promise<Partial<IApiLog> & { id: number }> => {
  let query = "UPDATE api_log SET ";
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

// Delete log entry
export const deleteApiLog = async (id: number) => {
  const query = "DELETE FROM api_log WHERE id = ?";
  await pool.execute(query, [id]);
  return { id, deleted: true };
};

// Get log by ID
export const getApiLogById = async (id: number) => {
  const query =
    "SELECT id, userId, `key`, `date`, `time` FROM api_log WHERE id = ?";
  const [rows] = await pool.execute<RowDataPacket[]>(query, [id]);
  return rows[0] || null;
};

// Get all logs
export const getAllApiLogs = async () => {
  const query = "SELECT id, userId, `key`, `date`, `time` FROM api_log";
  const [rows] = await pool.execute<RowDataPacket[]>(query);
  return rows;
};

// Get all logs of a user
export const getApiLogsByUser = async (userId: number) => {
  const query =
    "SELECT id, userId, `key`, `date`, `time` FROM api_log WHERE userId = ?";
  const [rows] = await pool.execute<RowDataPacket[]>(query, [userId]);
  return rows;
};

export const getApiTodaysLogsByUser = async (userId: number) => {
  const query =
    "SELECT id, userId, `key`, `date`, `time` FROM api_log FROM api_log WHERE userId = ? AND date = CURDATE()";
  const [rows] = await pool.execute<RowDataPacket[]>(query, [userId]);
  return rows;
};

// Get logs by API key
export const getApiLogsByKey = async (key: string) => {
  const query =
    "SELECT id, userId, `key`, `date`, `time` FROM api_log WHERE `key` = ?";
  const [rows] = await pool.execute<RowDataPacket[]>(query, [key]);
  return rows;
};
