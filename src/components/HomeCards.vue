<script setup>
import card from '@/components/Card.vue'
import { RouterLink } from 'vue-router';
</script>

<template>
  <section class="py-4">
    <div class="container-xl lg:container m-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
        <card>
          <div class="p-4 flex flex-col items-center md:items-start">
            <h2 class="text-2xl font-bold">För utvecklare</h2>
            <p class="mt-2 mb-4 text-center md:text-left">
              Sök bland våra utvecklare-jobb och starta din karriär idag
            </p>
            <RouterLink to="/jobs"
              class="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700">
              Hitta jobb
            </RouterLink>
          </div>
        </card>
        <card bg="bg-green-100">
          <div class="p-4 flex flex-col items-center md:items-start">
            <h2 class="text-2xl font-bold">För företag</h2>
            <p class="mt-2 mb-4 text-center md:text-left">
              Annonsera din tjänst för att rekrytera den bästa utvecklaren
            </p>
            <RouterLink to="/jobs/add"
              class="inline-block bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600">
              Lägg in jobb
            </RouterLink>
          </div>
        </card>
      </div>
    </div>
  </section>
</template>