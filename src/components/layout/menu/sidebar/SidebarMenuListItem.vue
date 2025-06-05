<script setup lang="ts">
import { RouterLink } from 'vue-router';

interface Props {
  href: string,
  label: string,
}

defineProps<Props>();

</script>
<template>
  <li>
    <router-link :to="href"
      class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
      <span class="ms-3">{{ label }}</span>
    </router-link>
  </li>
</template>

<style lang="scss" scoped>
.is-active-route {
  background-color: #e5e7eb52;
}
</style>
