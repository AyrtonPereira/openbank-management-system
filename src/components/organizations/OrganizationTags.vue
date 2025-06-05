<script lang="ts" setup>
import { BaseBadge } from '@/components';

interface Props {
  tags: string[]
}
defineProps<Props>();
</script>
<template>
  <h3 class="text-xl font-semibold text-gray-900 sm:text-2xl">Tags</h3>
  <div v-if="tags?.length > 0" class="flex flex-wrap gap-1">
    <BaseBadge v-for="tag in tags" :key="tag" variant="primary" class="me-1" size="base" :label="tag" />
  </div>
  <span v-else class="text-lg font-semibold text-gray-500 sm:text-lg">Sem Tags</span>
</template>