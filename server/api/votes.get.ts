export default defineEventHandler(() => {
  return useDb().select().from(tables.votes).all()
})
