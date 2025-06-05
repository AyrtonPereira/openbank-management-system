<script lang="ts" setup>

interface Props {
  type?: string | null,
  label?: string | null,
  loading?: boolean | null,
  blocked?: boolean | null,
  disabled?: boolean | null,
}

withDefaults(defineProps<Props>(), {
  type: "primary",
  loading: false,
  blocked: false,
  disabled: false,
});

const buttonPills = {
  primary:
    "text-white border-transparent bg-slate-600 hover:bg-slate-700 focus:ring-slate-500",
  secondary:
    "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-slate-500",
  danger:
    "border-red-300 bg-white text-red-700 hover:bg-red-100 focus:ring-slate-500",
};
</script>
<template>
  <button :disabled="loading || blocked" :class="`items-center transition-all duration-200 flex justify-center rounded-md border py-2 
  px-4 text-sm font-medium focus:outline-none focus:ring-2  focus:ring-offset-2 ${buttonPills[type]}
    ${loading ? 'opacity-20 animate-pulse pointer-events-none' : ''} 
    ${blocked ? 'pointer-events-none opacity-20' : ''}`">
    <slot>{{ label }}</slot>
  </button>
</template>
