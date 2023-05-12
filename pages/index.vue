<script setup>
const { loggedIn, user, clear } = useUserSession()
const { data: votes, refresh, error } = await useFetch('/api/votes')

const userChoice = computed(() => votes.value.find(r => r.username === user.value?.login)?.choice)
const coffeeScore = computed(() => votes.value.filter(r => r.choice === 'coffee').length)
const teaScore = computed(() => votes.value.filter(r => r.choice === 'tea').length)

if (!error.value) {
  let interval
  onMounted(() => {
    interval = setInterval(refresh, 1000)
  })
  onBeforeUnmount(() => {
    clearInterval(interval)
  })
}

function vote(choice) {
  if (!loggedIn.value) {
    return alert('You must be logged in to vote')
  }
  $fetch('/api/vote', {
    method: 'POST',
    body: { choice }
  }).then(refresh)
}
</script>

<template>
  <pre v-if="error">{{ error }}</pre>
  <div v-else class="min-h-screen flex flex-col gap-8 items-center pt-4">
    <h1 class="text-3xl">Coffee or Tea?</h1>
    <div class="flex items-center gap-4">
      <button @click="vote('coffee')" class="p-4 border rounded hover:bg-gray-50" :class="{ '!bg-gray-100': userChoice === 'coffee' }">☕ {{ coffeeScore }}</button>
      <button @click="vote('tea')" class="p-4 border rounded hover:bg-gray-50" :class="{ '!bg-gray-100': userChoice === 'tea' }">🍵 {{ teaScore }}</button>
    </div>
    <div>
      <p v-if="loggedIn">Logged in as {{ user.login }}, <button @click="clear" class="underline">logout</button></p>
      <a v-else href="/api/auth" class="rounded bg-black text-white px-4 py-2">Login with GitHub to vote</a>
    </div>
    <ul>
      <li v-for="vote of votes" :key="vote.id">
        {{ vote.choice === 'coffee' ? '☕️' : '🍵' }} by <a :href="`https://github.com/${vote.username}`" target="_blank" class="underline">{{ vote.username }}</a>
      </li>
    </ul>
  </div>
</template>