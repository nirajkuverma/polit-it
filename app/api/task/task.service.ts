import { type ITask } from "./task.dto";
import { pool } from "../../common/services/sql.service";
import { type RowDataPacket, type ResultSetHeader } from "mysql2";

// Create task
export const createTask = async (data: ITask) => {
  const query = "INSERT INTO task (role, content) VALUES (?, ?)";
  const values = [data.role, data.content];
  const [result] = await pool.execute<ResultSetHeader>(query, values);
  return { id: result.insertId, ...data };
};

// Update task (all fields)
export const updateTask = async (id: number, data: ITask) => {
  const query = "UPDATE task SET role = ?, content = ? WHERE id = ?";
  const values = [data.role, data.content, id];
  await pool.execute(query, values);
  return { id, ...data };
};

// Edit task dynamically (partial update)
export const editTask = async (
  id: number,
  data: Partial<ITask>
): Promise<Partial<ITask> & { id: number }> => {
  let query = "UPDATE task SET ";
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

// Delete task
export const deleteTask = async (id: number) => {
  const query = "DELETE FROM task WHERE id = ?";
  await pool.execute(query, [id]);
  return { id, deleted: true };
};

// Get task by ID
export const getTaskById = async (id: number) => {
  const query = "SELECT id, role, content FROM task WHERE id = ?";
  const [rows] = await pool.execute<RowDataPacket[]>(query, [id]);
  return rows[0] || null;
};

// Get all tasks
export const getAllTasks = async () => {
  const query = "SELECT id, role, content FROM task";
  const [rows] = await pool.execute<RowDataPacket[]>(query);
  return rows;
};

// Get tasks by role
export const getTasksByRole = async (role: string) => {
  const query = "SELECT id, role, content FROM task WHERE role = ?";
  const [rows] = await pool.execute<RowDataPacket[]>(query, [role]);
  return rows;
};
