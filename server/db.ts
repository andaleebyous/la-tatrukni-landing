import { desc, eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertOrder, InsertUser, orders, users, OrderStatus } from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) return;
  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};
  const textFields = ["name", "email", "loginMethod"] as const;
  textFields.forEach((field) => {
    const value = user[field];
    if (value !== undefined) { values[field] = value ?? null; updateSet[field] = value ?? null; }
  });
  if (user.lastSignedIn !== undefined) { values.lastSignedIn = user.lastSignedIn; updateSet.lastSignedIn = user.lastSignedIn; }
  if (user.role !== undefined) { values.role = user.role; updateSet.role = user.role; }
  else if (user.openId === ENV.ownerOpenId) { values.role = "admin"; updateSet.role = "admin"; }
  if (!values.lastSignedIn) values.lastSignedIn = new Date();
  if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();
  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createOrder(order: InsertOrder) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.insert(orders).values(order);
  const result = await db.select().from(orders).where(eq(orders.orderNumber, order.orderNumber)).limit(1);
  return result[0];
}

export async function listOrders(status?: OrderStatus) {
  const db = await getDb();
  if (!db) return [];
  const query = db.select().from(orders).orderBy(desc(orders.createdAt));
  if (status) return query.where(eq(orders.status, status));
  return query;
}

export async function updateOrderStatus(id: number, status: OrderStatus) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.update(orders).set({ status, updatedAt: new Date() }).where(eq(orders.id, id));
  const result = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
  return result[0];
}

export async function getOrderStats() {
  const db = await getDb();
  if (!db) return { total: 0, pending: 0, confirmed: 0, revenue: 0 };
  const [summary] = await db.select({
    total: sql<number>`count(*)`,
    revenue: sql<number>`coalesce(sum(case when ${orders.status} <> 'cancelled' then ${orders.amount} else 0 end), 0)`,
  }).from(orders);
  const statusRows = await db.select({ status: orders.status, count: sql<number>`count(*)` }).from(orders).groupBy(orders.status);
  const byStatus = Object.fromEntries(statusRows.map((row) => [row.status, Number(row.count)]));
  return { total: Number(summary?.total ?? 0), pending: byStatus.pending ?? 0, confirmed: (byStatus.confirmed ?? 0) + (byStatus.shipped ?? 0), revenue: Number(summary?.revenue ?? 0) };
}
