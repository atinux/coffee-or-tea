import { sqliteTable, integer, text, uniqueIndex} from 'drizzle-orm/sqlite-core'

export const votes = sqliteTable('votes', {
  id: integer('id').primaryKey(),
  userId: integer('user_id').notNull(),
  username: text('username').notNull(),
  choice: text('choice').notNull()
}, (votes) => ({
  userIdIndex: uniqueIndex('userIdIndex').on(votes.userId)
}))