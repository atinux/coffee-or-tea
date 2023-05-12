export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  const { choice } = (await readBody(event)) || {}

  if (['coffee', 'tea'].includes(choice) === false) {
    return createError({
      statusCode: 400,
      message: 'Invalid choice, must be coffee or tea'
    })
  }
  const vote = await useDb()
    .insert(tables.votes)
    .values({
      userId: session.user.id,
      username: session.user.login,
      choice
    })
    .onConflictDoUpdate({
      target: tables.votes.userId,
      set: {
        choice
      }
    })
    .returning()
    .get()

  return vote
})
