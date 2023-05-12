export default defineEventHandler(async (event) => {
  const ghUser = await loginWithGitHub(event)

  if (!ghUser) {
    return
  }

  await setUserSession(event, {
    user: ghUser,
    loggedInAt: new Date()
  })

  return sendRedirect(event, '/')
})
