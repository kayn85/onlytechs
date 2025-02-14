<script setup>
import { reactive, onMounted, watch } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css';
import axios from 'axios'

const toast = useToast({
  position: 'top-right'
})

const abort = () => {
  router.push(`/jobs/${jobId}`)
}

const route = useRoute()
const router = useRouter()
const jobId = route.params.id

const firebase_url = 'https://api-testing-c2ddc-default-rtdb.europe-west1.firebasedatabase.app'

const form = reactive({
  typ: '',
  title: '',
  beskrivning: '',
  lön: '',
  plats: '',
  företag: {
    namn: '',
    beskrivning: '',
    epost: '',
    telefon: '',
  }
})

const status = reactive({
  job: {}
})

const handleSubmit = async () => {
  const jobId = route.params.id

  const updateJob = {
    id: jobId,
    typ: form.typ,
    title: form.title,
    plats: form.plats,
    beskrivning: form.beskrivning,
    lön: form.lön,
    företag: {
      namn: form.företag.namn,
      beskrivning: form.företag.beskrivning,
      epost: form.företag.epost,
      telefon: form.företag.telefon,
    },
  }
  try {
    await axios.put(`${firebase_url}/${jobId}.json`, updateJob)
    toast.success('Jobbet har uppdaterats.')
    router.push(`/jobs/${jobId}`)
  } catch (error) {
    toast.error('Jobbet kunde inte uppdateras.')
    console.error('Uppdatering av jobb misslyckades.', error)
  }
}

onMounted(async () => {
  try {
    const response = await axios.get(`${firebase_url}/${jobId}/.json`)
    status.job = response.data
    form.typ = status.job.typ
    form.title = status.job.title
    form.beskrivning = status.job.beskrivning
    form.lön = status.job.lön
    form.plats = status.job.plats
    form.företag.namn = status.job.företag.namn
    form.företag.beskrivning = status.job.företag.beskrivning
    form.företag.epost = status.job.företag.epost
    form.företag.telefon = status.job.företag.telefon
  } catch (error) {
    console.error('Uppdatera jobb misslyckande')
  }
})

</script>

<template>
  <section class="bg-green-50">
    <div class="container m-auto max-w-2xl py-24">
      <div
        class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">

        <form @submit.prevent="handleSubmit">
          <h2 class="text-3xl text-center font-semibold mb-6">Hantera jobb</h2>

          <div class="mb-4">
            <label for="typ" class="block text-gray-700 font-bold mb-2">
              Jobbtyp
            </label>
            <select v-model="form.typ" id="typ" name="typ"
              class="border rounded w-full py-2 px-3" required>
              <option value="Lia/Praktik">Lia/Praktik</option>
              <option value="Heltid">Heltid</option>
              <option value="Deltid">Deltid</option>
              <option value="Distans">Distans</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Annonsens
              namn</label>
            <input type="text" v-model="form.title" id="title" name="title"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="ex. Fullstack utvecklare" required />
          </div>
          <div class="mb-4">
            <label for="beskrivning"
              class="block text-gray-700 font-bold mb-2">Beskrivning</label>
            <textarea v-model="form.beskrivning" id="beskrivning"
              name="beskrivning"
              class="border rounded w-full py-2 px-3 resize-none" rows="4"
              placeholder="Lägg till eventuella arbetsuppgifter, förväntningar, krav etc"
              required></textarea>
          </div>

          <div class="mb-4">
            <label for="type"
              class="block text-gray-700 font-bold mb-2">Lön</label>
            <select v-model="form.lön" id="lön" name="lön"
              class="border rounded w-full py-2 px-3" required>
              <option value="Lia/Praktik">Lia/Praktik
              </option>
              <option value="35 000 - 40 000 kronor">35 000 - 40 000 kronor
              </option>
              <option value="40 000 - 50 000 kronor">40 000 - 50 000 kronor
              </option>
              <option value="50 000 - 60 0000 kronor">50 000 - 60 000 kronor
              </option>
              <option value="60 000 - 70 000 kronor">60 000 - 70 000 kronor
              </option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">
              Plats
            </label>
            <input v-model="form.plats" type="text" id="plats" name="plats"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="Vilken stad?" required />
          </div>

          <h3 class="text-2xl mb-5">Företag Information</h3>

          <div class="mb-4">
            <label for="företag"
              class="block text-gray-700 font-bold mb-2">Företagsnamn</label>
            <input v-model="form.företag.namn" type="text" id="företag.namn"
              name="företag.namn" class="border rounded w-full py-2 px-3"
              placeholder="Företagsnamn" required />
          </div>
          <div class="mb-4">
            <label for="företag.beskrivning"
              class="block text-gray-700 font-bold mb-2">Verksamhetsbeskrivning</label>
            <textarea v-model="form.företag.beskrivning"
              id="företag.beskrivning" name="företag.beskrivning"
              class="border rounded w-full py-2 px-3 resize-none" rows="4"
              placeholder="Vad gör ditt företag? required"></textarea>
          </div>

          <div class="mb-4">
            <label for="epost"
              class="block text-gray-700 font-bold mb-2">Epost</label>
            <input v-model="form.företag.epost" type="email" id="epost"
              name="epost" class="border rounded w-full py-2 px-3"
              placeholder="E-postadress" required />
          </div>
          <div class="mb-4">
            <label for="telefon"
              class="block text-gray-700 font-bold mb-2">Telefon</label>
            <input v-model="form.företag.telefon" type="tel" id="telefon"
              name="telefon" class="border rounded w-full py-2 px-3"
              placeholder="Telefon" required />
          </div>

          <div>
            <button
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline cursor-pointer"
              type="submit">
              Updatera jobb
            </button>
          </div>
          <div class="mt-4">
            <button @click="abort"
              class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block cursor-pointer">
              Avbryt
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>