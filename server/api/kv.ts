export default defineEventHandler((event) => {
  return useKV().getKeys()
})
