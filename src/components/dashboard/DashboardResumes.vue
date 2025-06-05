<script lang="ts" setup>
import { DashboardResumesItem, BaseSkeleton } from '@/components'
import { useOrganzationsStore } from '@/stores/organizations';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';

const organizationsStore = useOrganzationsStore();
const { organizationsList } = storeToRefs(organizationsStore);

const organizationsQuantity = ref(0);
const serversQuantity = ref(0);
const ApisQuantity = ref(0);
const endpointsQuantity = ref(0);

const getApiDiscoveryEndpoints = (list: any) => {
  list.forEach((server: any) => {
    if (server.ApiDiscoveryEndpoints?.length > 0) {
      endpointsQuantity.value += server.ApiDiscoveryEndpoints.length
    }
  })
}

const getApiResources = (list: any) => {
  list.forEach((server: any) => {
    if (server.ApiResources?.length > 0) {
      ApisQuantity.value += server.ApiResources.length
      getApiDiscoveryEndpoints(server.ApiResources)
    }
  })
}

const getInformationAmount = () => {
  if (!organizationsList.value) return 0;
  organizationsQuantity.value = organizationsList.value.length
  organizationsList.value.forEach(organization => {
    if (organization.AuthorisationServers?.length > 0) {
      serversQuantity.value += organization.AuthorisationServers.length
      getApiResources(organization.AuthorisationServers)
    }
  })
}

watch(() => organizationsStore.isLoading, () => {
  getInformationAmount()
})
</script>
<template>
  <div id="dashboard-resumes" v-if="!organizationsStore.isLoading" class="w-full grid grid-cols-2 gap-2 md:grid-cols-4">
    <DashboardResumesItem id="dashboard-resume-organization" label="Organizações" :value="organizationsQuantity" />
    <DashboardResumesItem id="dashboard-resume-servers" label="Servidores" :value="serversQuantity" />
    <DashboardResumesItem id="dashboard-resume-apis" label="APIs" :value="ApisQuantity" />
    <DashboardResumesItem id="dashboard-resume-endpoints" label="Endpoints" :value="endpointsQuantity" />
  </div>
  <BaseSkeleton v-else class="h-32" />
</template>