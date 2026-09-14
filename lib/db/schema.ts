import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const orders = sqliteTable('orders', {
  id: text('id').primaryKey(),
  packageName: text('package_name').notNull(),
  duration: integer('duration').notNull(),
  amount: integer('amount').notNull(),
  groupLink: text('group_link').notNull(),
  status: text('status', { enum: ['PENDING', 'WAITING_PAYMENT', 'PAID', 'ACTIVE', 'EXPIRED', 'CANCELLED'] }).default('PENDING').notNull(),
  // PERBAIKAN: Gunakan integer dengan mode timestamp
  createdAt: integer('created_at', { mode: 'timestamp' }).defaultNow().notNull(),
});

export const rentals = sqliteTable('rentals', {
  id: text('id').primaryKey(),
  orderId: text('order_id').notNull(),
  groupLink: text('group_link').notNull(),
  status: text('status', { enum: ['ACTIVE', 'EXPIRED', 'SUSPENDED'] }).default('ACTIVE').notNull(),
  startedAt: integer('started_at', { mode: 'timestamp' }).defaultNow().notNull(),
  expiredAt: integer('expired_at', { mode: 'timestamp' }).notNull(),
});
