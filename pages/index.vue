<script setup>
const { loggedIn, user, clear } = useUserSession()
const { data: votes, refresh } = await useFetch('/api/votes')

const userChoice = computed(() => votes.value?.find(v => v.userId === user.value?.id)?.choice)
const totalCoffee = computed(() => votes.value?.filter(v => v.choice === 'coffee').length)
const totalTea = computed(() => votes.value?.filter(v => v.choice === 'tea').length)

let interval
onMounted(() => {
  interval = setInterval(refresh, 1500)
})
onBeforeUnmount(() => {
  clearInterval(interval)
})

function vote(choice) {
  if (!loggedIn.value) {
    return alert('Please login to vote')
  }
  $fetch('/api/vote', {
    method: 'POST',
    body: { choice }
  }).then(refresh)
}
useSeoMeta({
  title: 'Coffee or Tea?',
  description: 'A simple app to vote for your favorite drink using Nuxt and SQLite with edge-side rendering.',
  ogImage: 'https://github.com/Atinux/vue-london-edge/assets/904724/b6eb9925-21b1-4ad4-8c86-2bcefc9f1973',
  twitterImage: 'https://github.com/Atinux/vue-london-edge/assets/904724/b6eb9925-21b1-4ad4-8c86-2bcefc9f1973',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <div class="min-h-screen flex flex-col gap-8 items-center pt-8">
    <h1 class="text-3xl">Coffee or Tea?</h1>
    <div class="flex items-center gap-4">
      <button @click="vote('coffee')" class="border p-4 text-3xl rounded hover:bg-gray-50" :class="{ '!bg-gray-100 border-black': userChoice === 'coffee' }">☕️ {{ totalCoffee  }}</button>
      <button @click="vote('tea')" class="border p-4 text-3xl rounded hover:bg-gray-50" :class="{ '!bg-gray-100 border-black': userChoice === 'tea' }">🍵 {{ totalTea  }}</button>
    </div>
    <div>
      <p v-if="loggedIn">Hello {{ user.login }}, <button @click="clear" class="underline">logout</button>.</p>
      <a v-else href="/api/auth" class="bg-black px-4 py-2 text-white rounded">Login with GitHub to vote</a>
    </div>
    <ul>
      <li v-for="vote of votes">
        <span class="font-medium">{{ vote.username }}</span> voted for {{ vote.choice === 'coffee' ? '☕️' : '🍵' }}
      </li>
    </ul>
    <footer class="text-center">
      <NuxtLink href="https://github.com/atinux/vue-london-edge" target="_blank" class="text-sm text-gray-500 hover:text-gray-700">
        GitHub
      </NuxtLink>
      ·
      <NuxtLink href="https://twitter.com/Atinux" target="_blank" class="text-sm text-gray-500 hover:text-gray-700">
        Twitter
      </NuxtLink>
    </footer>
  </div>
</template>
