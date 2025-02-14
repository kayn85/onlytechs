<script setup>
import { RouterLink } from 'vue-router'
import NotFound from '@/assets/img/404.jpg'
</script>

<template>
  <section class="flex justify-center items-center h-auto pt-10 pb-10 w-full">
    <div class="text-center">
      <h1 class="text-4xl mb-2">404 Error</h1>

      <img class="mx-auto w-65 h-65 sm:w-65 sm:h-65 md:w-128 md:h-128"
        :src="NotFound" alt="Not Found Page" />
      <p class="text-xl mb-5">
        Här finns det inga jobb
      </p>
      <RouterLink to="/"
        class="text-white bg-green-500 hover:bg-green-600 rounded-md px-3 py-2 mt-4 pb">
        Gå tillbaka
      </RouterLink>
    </div>
  </section>
</template>
