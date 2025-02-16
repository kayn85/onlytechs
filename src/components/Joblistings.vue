<script setup>
import Joblisting from './Joblisting.vue'
import { ref, defineProps, onMounted, reactive } from 'vue'
import { RouterLink } from 'vue-router'
import axios from 'axios'

defineProps({
  limit: Number,
  visaKnappen: {
    type: Boolean,
    default: false
  },
})

const firebase_url = 'YOUR_URL from firebase'

const status = reactive({
  jobs: [],
})

onMounted(async () => {
  try {
    const response = await axios.get(`${firebase_url}/.json`)
    status.jobs = response.data
  } catch (error) {
    console.error('Hämta jobb. Misslyckades ', error)
  }
})
</script>

<template>
  <section class="bg-green-50 px-4 py-4 pb-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-black mb-6 text-center">
        Hitta jobb
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Joblisting
          v-for="job in status.jobs.slice(0, limit || status.jobs.length)"
          :key="job.id" :job="job" />
      </div>
    </div>
  </section>

  <section class="bg-slate-900 py-4">
    <div v-if="visaKnappen" class="m-auto max-w-lg my-10 px-6">
      <RouterLink to="/jobs"
        class="block bg-green-500 text-white text-center py-4 px-6 rounded-xl hover:bg-green-600">
        Visa
        alla jobb</RouterLink>
    </div>
  </section>
</template>
