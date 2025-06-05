<script setup lang="ts">
import { TopbarMenu, SidebarMenu, BaseBreadcrumb } from '@/components';
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
const route = useRoute();

const openMenu = ref(false);

const onOpenMenu = () => {
  openMenu.value = !openMenu.value
}

watch(() => route.path, () => {
  openMenu.value = false
})
</script>
<template>
  <TopbarMenu @toggleSidebar="onOpenMenu" />
  <SidebarMenu :open="openMenu" />
  <main class="p-4 mt-16 sm:ml-64 sm:mt-14 flex flex-col gap-6">
    <div class="flex flex-col gap-2 pb-5 border-b">
      <h1 v-if="route.meta?.title" class="text-xl font-semibold text-gray-900 sm:text-2xl">
        {{ route.meta?.title }}
      </h1>
      <BaseBreadcrumb />
    </div>

    <RouterView />
  </main>
</template>