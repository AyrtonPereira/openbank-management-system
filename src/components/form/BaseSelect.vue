<script setup lang="ts">

interface Props {
  options: { value: string, label: string }[]
  placeholder?: string
}

defineProps<Props>();

const model = defineModel<unknown>();

</script>
<template>
  <select v-model="model"
    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option :value="null" selected>{{ placeholder ?? 'Selecione' }}</option>
    <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
  </select>
</template>
