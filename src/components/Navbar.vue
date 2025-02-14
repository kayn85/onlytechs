<script setup>
import logo from '@/assets/img/logo.png'
import { RouterLink } from 'vue-router';

</script>

<template>
  <nav class="bg-slate-900 border-b border-slate-500 sticky top-0 z-50">
    <div class="mx-auto max-w-5xl px-2 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-center">
        <div
          class="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
          <!-- Logo -->
          <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
            <img class="h-10 w-auto" :src="logo" alt="Only Techs" />
            <span class="hidden md:block text-white text-2xl font-bold ml-2">
              Only Techs
            </span>
          </RouterLink>
          <div class="md:ml-auto">
            <div class="flex space-x-2">
              <RouterLink to="/" active-class="bg-green-500 text-white"
                class="text-white font-bold hover:bg-green-600 hover:text-white px-3 py-2 rounded-md transition-all duration-150">
                Hem
              </RouterLink>
              <RouterLink to="/jobs" active-class="bg-green-500 text-white"
                class="text-white font-bold hover:bg-green-600 hover:text-white px-3 py-2 rounded-md transition-all duration-150">
                Hitta jobb
              </RouterLink>
              <RouterLink to="/jobs/add" active-class="bg-green-500 text-white"
                class="text-white font-bold hover:bg-green-600 hover:text-white px-3 py-2 rounded-md transition-all duration-150">
                Lägg in jobb
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>

</template>