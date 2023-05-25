import { sqliteTable, text, integer, uniqueIndex } from 'drizzle-orm/sqlite-core'

export const votes = sqliteTable('votes', {
  id: integer('id').primaryKey(),
  userId: integer('user_id').notNull(),
  username: text('username').notNull(),
  choice: text('choice').notNull()
}, (table) => {
  return {
    userVoteIndex: uniqueIndex('user_vote_index').on(table.userId)
  }
})