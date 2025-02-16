<script setup>
import BackButton from '@/components/BackButton.vue'
import { reactive, onMounted, ref } from 'vue'
import { useRoute, RouterLink, useRouter } from 'vue-router'
import axios from 'axios'


const route = useRoute()
const router = useRouter()
const jobId = route.params.id

const status = reactive({
  job: {}
})

const firebase_url = 'YOUR_URL from firebase'

const deleteJob = async () => {
  try {
    const confirm = window.confirm('Är du säker på att du vill ta bort detta jobbet?')
    if (confirm) {
      await axios.delete(`${firebase_url}/${jobId}/.json`)
      router.push('/jobs')
    }
  } catch (error) {
    console.error('Radering misslyckades', error)
  }
}

onMounted(async () => {
  try {
    const response = await axios.get(`${firebase_url}/${jobId}/.json`)
    status.job = response.data
  } catch (error) {
    console.error('Gick ej att hämta jobb.', error)
  }
})
</script>

<template>
  <section class="bg-green-50">
    <div class="container m-auto py-10 px-6">
      <BackButton />
      <div class="grid w-full gap-6 sm:grid-cols-1 md:grid-cols-[70%_30%]">
        <main>
          <div
            class="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
            <div class="text-gray-500 mb-4">{{ status.job.typ }}</div>
            <h1 class="text-3xl font-bold mb-4">{{ status.job.title }}</h1>
            <div
              class="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
              <i class="pi pi-map-marker text-orange-700"></i>
              <p class="text-orange-700">{{ status.job.plats }}</p>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-green-800 text-lg font-bold mb-6">
              Beskrivning
            </h3>

            <p class="mb-4">
              {{ status.job.beskrivning }}
            </p>

            <h3 class="text-green-800 text-lg font-bold mb-2">Lön</h3>

            <p class="mb-4">{{ status.job.lön }} / Månad</p>
          </div>
        </main>

        <aside>

          <!-- om företag -->

          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold mb-6">Om företag</h3>

            <h2 v-if="status.job.företag" class="text-2xl">{{
              status.job.företag.namn }}</h2>

            <p v-if="status.job.företag" class="my-2">
              {{ status.job.företag.beskrivning }}
            </p>

            <hr class="my-4" />

            <h3 v-if="status.job.företag" class="text-xl">Epost:</h3>

            <p v-if="status.job.företag"
              class="my-2 bg-green-100 p-2 font-bold">
              {{ status.job.företag.epost }}
            </p>

            <h3 class="text-xl">Telefon:</h3>

            <p v-if="status.job.företag"
              class="my-2 bg-green-100 p-2 font-bold">
              {{ status.job.företag.telefon }}
            </p>
          </div>

          <!-- Hantera jobb-->

          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-xl font-bold mb-6">Hantera jobb</h3>
            <RouterLink :to="`/jobs/edit/${status.job.id}`"
              class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
              Redigera jobb
            </RouterLink>
            <button @click="deleteJob"
              class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block cursor-pointer">
              Radera jobb
            </button>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>
