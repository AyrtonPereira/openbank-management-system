<script lang="ts" setup>
interface Props {
  label: string
  size: string,
}

defineProps<Props>();
</script>
<template>
  <span
    :class="{ 'text-xs': size === 'xs', 'text-sm': size === 'sm', 'text-base': size === 'md', 'text-lg': size === 'lg' }"
    class="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
    {{ label }}
  </span>
</template>