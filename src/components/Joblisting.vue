<script setup>
import { defineProps, ref, computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  job: {
    type: Object,
    required: true
  }
})

const visaHelaBeskrivning = ref(false)

const toggleHelaBeskrivning = () => {
  visaHelaBeskrivning.value = !visaHelaBeskrivning.value
}

const stympadBeskrivning = computed(() => {
  let beskrivning = props.job.beskrivning
  if (!visaHelaBeskrivning.value) {
    beskrivning = beskrivning.substring(0, 90) + '...'
  }
  return beskrivning
})
</script>

<template>
  <div class="bg-white rounded-xl shadow-md relative">
    <div class="p-4">
      <div class="mb-6">
        <div class="text-gray-600 my-2">{{ job.företag.namn }}</div>
        <h3 class="text-xl font-bold">{{ job.title }}</h3>
      </div>

      <div class="mb-5">
        <div>
          {{ stympadBeskrivning }}
        </div>
        <button @click="toggleHelaBeskrivning"
          class="text-green-500 hover:text-green-600 mb-5">
          {{ visaHelaBeskrivning ? 'Visa mindre' : 'Visa mer' }}
        </button>
      </div>
      <h3 class="text-green-500 mb-2">{{ job.typ }} </h3>
      <h3 class="text-green-500 mb-2">{{ job.lön }} / Månad</h3>

      <div class="border border-gray-100 mb-5"></div>

      <div class="flex flex-col lg:flex-row justify-between mb-4">
        <div class="text-orange-700 mb-3">
          <i class="pi pi-map-marker text-orange-700"></i>
          {{ job.plats }}
        </div>
        <div class="flex justify-center lg:justify-end">
          <RouterLink :to="'/jobs/' + job.id"
            class="h-[36px] bg-black hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-center text-sm">
            Välj jobb
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>