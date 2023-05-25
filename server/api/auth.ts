export default gitHubOAuthEventHandler({
  async onSuccess(event, { user }) {
    await setUserSession(event, {
      user
    })
    await sendRedirect(event, '/')
  }
})