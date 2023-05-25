<script setup>
const { loggedIn, user, clear } = useUserSession()
const { data: votes, refresh } = await useFetch('/api/votes')

const userChoice = computed(() => votes.value?.find(vote => vote.userId === user.value?.id)?.choice)
const totalCoffee = computed(() => votes.value?.filter(vote => vote.choice === 'coffee').length)
const totalTea = computed(() => votes.value?.filter(vote => vote.choice === 'tea').length)

let interval
onMounted(() => {
  interval = setInterval(refresh, 1500)
})
onBeforeUnmount(() => {
  clearInterval(interval)
})

function vote(choice) {
  if (!loggedIn.value) return window.alert('Please login to vote')
  $fetch('/api/vote', {
    method: 'POST',
    body: { choice }
  }).then(refresh)
}
</script>

<template>
  <div class="min-h-screen flex flex-col gap-8 items-center pt-8">
    <h1 class="text-3xl">Coffee or Tea?</h1>
    <div class="flex items-center gap-4">
      <button @click="vote('coffee')" class="border rounded p-4 text-3xl hover:bg-gray-50" :class="{ '!bg-gray-100 outline border-black': userChoice === 'coffee' }">☕️ {{ totalCoffee }}</button>
      <button @click="vote('tea')" class="border rounded p-4 text-3xl hover:bg-gray-50" :class="{ '!bg-gray-100 outline border-black': userChoice === 'tea' }">🍵 {{ totalTea }}</button>
    </div>
    <div>
      <p v-if="loggedIn">Hello {{ user.login }}, <button class="underline" @click="clear">logout</button>.</p>
      <a v-else href="/api/auth" class="bg-black p-2 text-white font-medium rounded">Login with GitHub to vote</a>
    </div>
    <ul>
      <li v-for="vote of votes">
        <span class="font-medium">{{ vote.username }}</span> voted for {{ vote.choice === 'tea' ? '🍵' : '☕️' }}
      </li>
    </ul>
  </div>
</template>
