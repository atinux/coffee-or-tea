<script setup>
const { loggedIn, user, clear } = useUserSession()
const { data: votes, refresh, error } = await useFetch('/api/votes')

const userChoice = computed(() => votes.value.find(vote => vote.userId === user.value?.id)?.choice)
const totalCoffee = computed(() => votes.value.filter(vote => vote.choice === 'coffee').length)
const totalTea = computed(() => votes.value.filter(vote => vote.choice === 'tea').length)

function vote(choice) {
  $fetch('/api/vote', {
    method: 'POST',
    body: { choice }
  }).then(refresh)
}
</script>

<template>
  <pre v-if="error">{{ error }}</pre>
  <div v-else class="min-h-screen flex flex-col gap-8 items-center pt-4">
    <h1 class="text-3xl">Coffee of Tea?</h1>
    <div class="flex items-center gap-4">
      <button @click="vote('coffee')" class="vote" :class="{ '!bg-gray-100': userChoice === 'coffee' }">☕️ {{ totalCoffee }}</button>
      <button @click="vote('tea')" class="vote" :class="{ '!bg-gray-100': userChoice === 'tea' }">🍵 {{ totalTea }}</button>
    </div>
    <div>
      <p v-if="loggedIn">Welcome {{ user.login }}, <button @click="clear" class="underline">logout</button></p>
      <a v-else href="/api/auth" class="bg-black text-white rounded px-4 py-2">Login with GitHub to vote</a>
    </div>
    <ul>
      <li v-for="vote of votes" :key="vote.id">
        {{ vote.choice === 'coffee' ? '☕️' : '🍵' }} by {{ vote.username }}
      </li>
    </ul>
  </div>
</template>

<style lang="postcss" scoped>
button.vote {
  @apply border rounded p-4 hover:bg-gray-50;
}
</style>