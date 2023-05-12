export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  const body = await readBody(event)
  const { choice } = body || {}

  if (!['coffee', 'tea'].includes(choice)) {
    throw createError({
      statusCode: 400,
      message: 'Bad choice, must be coffee or tea'
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
      set: { choice }
    })
    .returning()
    .get()
  return vote
})
