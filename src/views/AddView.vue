<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import axios from 'axios'

const toast = useToast({
  position: 'top-right'
})

const route = useRoute()
const router = useRouter()
const api_url = 'YOUR_API_URL from'

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

const generateId = async () => {
  try {
    const response = await axios.get(api_url)
    const jobs = response.data
    if (jobs) {
      const ids = Object.keys(jobs).map(id => parseInt(id))
      const maxId = Math.max(...ids)
      return maxId + 1
    }
    else {
      return 1
    }
  } catch (error) {
    console.error('Det gick inte att lägga till jobb', error)
    return 1
  }
}

const handleSubmit = async () => {
  const jobId = await generateId()
  const newJob = {
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
    }
  }
  try {
    await axios.put(`${api_url}/${jobId}`, newJob)
    toast.success('Jobbet har lagt till')
    router.push(`/jobs/${jobId}`)
  } catch (error) {
    toast.error('Lagt till jobb misslyckades')
    console.error('Det gick inte och läggar in jobb.', error)
  }
}

</script>

<template>
  <section class="bg-green-50">
    <div class="container m-auto max-w-2xl py-24">
      <div
        class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">

        <form @submit.prevent="handleSubmit">
          <h2 class="text-3xl text-center font-semibold mb-6">Lägg in jobb</h2>

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
              placeholder="Vad gör ditt företag?" required></textarea>
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
              Lägg in jobb
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
