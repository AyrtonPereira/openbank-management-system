<script setup lang="ts">
import { DashboardCitiesChart, DashboardTagsChart, DashboardResumes, DashboardAPIsChart } from '@/components';
import { useOrganzationsStore } from '@/stores/organizations';

const organizationsStore = useOrganzationsStore();
organizationsStore.getOrganizations();

</script>
<template>
  <div id="dashboard-index" class="flex flex-col gap-6">
    <DashboardResumes />
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <DashboardTagsChart />
      <DashboardCitiesChart />
    </div>
    <div class="grid grid-cols-1 gap-4">
      <DashboardAPIsChart />
    </div>
    <div class="grid grid-cols-1">
    </div>
  </div>
</template>