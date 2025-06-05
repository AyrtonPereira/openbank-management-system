<script lang="ts" setup>

interface Props {
  value: number,
  label: string
}

defineProps<Props>()
</script>
<template>
  <div class="border rounded bg-gray-800 text-white p-4 text-center shadow-md">
    <span class="text-5xl font-bold">{{ value }}</span>
    <p>{{ label }}</p>
  </div>
</template>