import { type ISubscriber } from "./subscriber.dto";
import { pool } from "../../common/services/sql.service";
import { type RowDataPacket, type ResultSetHeader } from "mysql2";

// Create a new subscriber (assign subscription to user)
export const createSubscriber = async (data: ISubscriber) => {
  const query =
    "INSERT INTO subscriber (userId, subId, isExpired ) VALUES (?, ?, ?)";
  const values = [
    data.userId,
    data.subId,
    getDateFromToday(Number(data.isExpired)),
  ];
  const [result] = await pool.execute<ResultSetHeader>(query, values);
  return { id: result.insertId, ...data };
};

// Update a subscriber
export const updateSubscriber = async (id: number, data: ISubscriber) => {
  const query =
    "UPDATE subscriber SET userId = ?, subId = ?, isExpired = ? WHERE id = ?";
  const values = [
    data.userId,
    data.subId,
    getDateFromToday(Number(data.isExpired)),
    id,
  ];
  await pool.execute(query, values);
  return { id, ...data };
};

// Edit subscriber dynamically (partial update)
export const editSubscriber = async (
  id: number,
  data: Partial<ISubscriber>
): Promise<Partial<ISubscriber> & { id: number }> => {
  let query = "UPDATE subscriber SET ";
  const updates: string[] = [];
  const values: any[] = [];

  Object.keys(data).forEach(async (key) => {
    updates.push(`${key} = ?`);
    if (key === "isExpired") {
      values.push(await getDateFromToday(Number((data as any)[key])));
    } else {
      values.push((data as any)[key]);
    }
  });

  query += updates.join(", ") + " WHERE id = ?";
  values.push(id);

  await pool.execute(query, values);
  return { id, ...data };
};

// Delete subscriber
export const deleteSubscriber = async (id: number) => {
  const query = "DELETE FROM subscriber WHERE id = ?";
  await pool.execute(query, [id]);
  return { id, deleted: true };
};

// Get subscriber by ID
export const getSubscriberById = async (id: number) => {
  const query =
    "SELECT id, userId, subId, isExpired FROM subscriber WHERE id = ?";
  const [rows] = await pool.execute<RowDataPacket[]>(query, [id]);
  return rows[0] || null;
};

// Get all subscribers
export const getAllSubscribers = async () => {
  const query = "SELECT id, userId, subId, isExpired FROM subscriber";
  const [rows] = await pool.execute<RowDataPacket[]>(query);
  return rows;
};

// Get all subscriptions of a user
export const getSubscriptionsByUser = async (userId: number) => {
  const query = `
    SELECT s.id, s.title, s.description, s.api_call, s.amount, b.isExpired
    FROM subscription s
    JOIN subscriber sb ON sb.subId = s.id
    WHERE sb.userId = ?`;
  const [rows] = await pool.execute<RowDataPacket[]>(query, [userId]);
  return rows;
};

// Get all users of a subscription
export const getUsersBySubscription = async (subId: number) => {
  const query = `
    SELECT u.id, u.email
    FROM user u
    JOIN subscriber sb ON sb.userId = u.id
    WHERE sb.subId = ?`;
  const [rows] = await pool.execute<RowDataPacket[]>(query, [subId]);
  return rows;
};

export const getMySubscriptionDetail = async (userId: number) => {
  const query =
    "SELECT b.*, a.isExpired FROM subscriber a left join subscription b on b.id = a.subId WHERE userId = ? order by a.id desc limit 1";
  const [rows] = await pool.execute<RowDataPacket[]>(query, [userId]);
  if (Array.isArray(rows) && rows.length > 0) {
    return rows[0];
  }
  return null;
};

// Get the current Subscription, If Subscription expired add new subscription to free.
export const getUpdateSubscription = async (userId: number) => {
  const currentSub = await getMySubscriptionDetail(userId);
  const today = new Date();
  const subExpiry = currentSub?.isExpired
    ? new Date(currentSub.isExpired)
    : null;

  // If no subscription or expired
  if (!subExpiry || subExpiry < today) {
    // Get default free subscription
    const defaultSubscription = "SELECT * FROM subscription WHERE id = ?";
    const [rows] = await pool.execute<RowDataPacket[]>(defaultSubscription, [
      1,
    ]);

    if (Array.isArray(rows) && rows.length > 0) {
      const defaultSub = rows[0];

      // Expiry = today + 15 days
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + Number(defaultSub.day));

      // Create new subscriber
      const res = await createSubscriber({
        userId,
        subId: defaultSub.id,
        isExpired: String(expiryDate), // pass expiry date
      });

      return res; // return newly created subscription
    }
  }

  return currentSub; // still active, return current subscription
};

export const getDateFromToday = async (offsetDays: number) => {
  const today = new Date();
  const result = new Date(today);

  // Add or subtract days
  result.setDate(today.getDate() + offsetDays);

  // Format as DD/MM/YYYY
  const dd = String(result.getDate()).padStart(2, "0");
  const mm = String(result.getMonth() + 1).padStart(2, "0"); // Month is 0-based
  const yyyy = result.getFullYear();

  return `${dd}/${mm}/${yyyy}`;
};
