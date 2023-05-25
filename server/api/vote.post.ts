export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  const { choice } = (await readBody(event)) || {}

  if (!['coffee', 'tea'].includes(choice)) {
    throw createError({
      statusCode: 400,
      message: 'Bad choice, please choose between coffee or tea'
    })
  }

  const vote = await useDB()
    .insert(tables.votes)
    .values({
      userId: session.user.id,
      username: session.user.name,
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
