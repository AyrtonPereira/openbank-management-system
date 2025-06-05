<script setup lang="ts">

interface Props {
  placeholder?: string | null,
  type?: string
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  placeholder: "Digite seu texto aqui",
  type: "text",
})

const model = defineModel<unknown>();


</script>
<template>

  <div class="relative">
    <input v-model="model" :type="type"
      class="block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:gray-blue-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
      :disabled="disabled" placeholder=" " />
    <label for="floating_filled"
      class="absolute pointer-events-none text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-gray-200 peer-focus:dark:text-gray-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
      {{ placeholder }}
    </label>
  </div>
</template>
