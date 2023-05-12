import { desc } from 'drizzle-orm'

export default defineEventHandler((event) => {
  return useDb()
    .select()
    .from(tables.votes)
    .orderBy(desc(tables.votes.id))
    .all()
})
