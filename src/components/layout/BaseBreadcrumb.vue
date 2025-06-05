<script setup lang="ts">
import { useRoute } from 'vue-router';
import { HomeIcon, ChevronRightIcon } from '@heroicons/vue/24/solid';
const routes = useRoute();

const isActualPath = (path: string) => {
  return path === routes.name
}

</script>
<template>
  <nav class="flex" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">

      <li v-for="(route, index) in routes.matched" :key="route.name" class="inline-flex items-center">
        <component :is="isActualPath(route.name) ? 'span' : 'router-link'" :to="route.path"
          class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-black transition-all">
          <HomeIcon v-if="index === 0" class="w-4 h-4 me-2" aria-hidden="true" />
          <ChevronRightIcon v-else class="w-4 h-4 me-2 rtl:rotate-180" aria-hidden="true" />
          {{ route.meta.title }}
        </component>
      </li>
    </ol>
  </nav>
</template>