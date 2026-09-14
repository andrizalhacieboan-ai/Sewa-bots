import { sqliteTable, text, integer, datetime } from 'drizzle-orm/sqlite-core';

export const orders = sqliteTable('orders', {
  id: text('id').primaryKey(), // Order ID unik, e.g: AS-1710000000000
  packageName: text('package_name').notNull(),
  duration: integer('duration').notNull(),
  amount: integer('amount').notNull(),
  groupLink: text('group_link').notNull(),
  status: text('status', { enum: ['PENDING', 'WAITING_PAYMENT', 'PAID', 'ACTIVE', 'EXPIRED', 'CANCELLED'] }).default('PENDING').notNull(),
  createdAt: datetime('created_at').defaultNow().notNull(),
});

export const rentals = sqliteTable('rentals', {
  id: text('id').primaryKey(),
  orderId: text('order_id').notNull(),
  groupLink: text('group_link').notNull(),
  status: text('status', { enum: ['ACTIVE', 'EXPIRED', 'SUSPENDED'] }).default('ACTIVE').notNull(),
  startedAt: datetime('started_at').defaultNow().notNull(),
  expiredAt: datetime('expired_at').notNull(),
});
