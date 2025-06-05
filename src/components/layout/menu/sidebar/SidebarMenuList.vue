<script setup lang="ts">
import { SidebarMenuListItem } from '@/components'

export interface SidebarItem {
  href: string,
  label: string
}

interface Props {
  list: SidebarItem[]
}

defineProps<Props>();
</script>
<template>
  <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
    <ul class="space-y-2 font-medium">
      <SidebarMenuListItem v-for="(item, index) in list" :key="index" :href="item.href" :label="item.label" />
    </ul>
  </div>
</template>