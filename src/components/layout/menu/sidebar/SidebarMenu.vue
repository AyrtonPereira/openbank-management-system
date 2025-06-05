<script lang="ts" setup>
import { SidebarMenuList } from '@/components'

interface Props {
  open: boolean
}

defineProps<Props>();

const routes = [
  {
    href: '/dashboard',
    label: 'Dashboard',
  },
  {
    href: '/organizations',
    label: 'Organizações',
  }
]
</script>
<template>
  <aside class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r
     border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" :class="{ 'translate-x-0': open }">
    <SidebarMenuList :list="routes" />
  </aside>
</template>