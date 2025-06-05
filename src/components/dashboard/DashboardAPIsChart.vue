<script lang="ts" setup>
import { useOrganzationsStore } from '@/stores/organizations';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';
import { Bar } from 'vue-chartjs'
import { BaseSkeleton } from '@/components';

const organizationsStore = useOrganzationsStore();
const { organizationsList, isLoading } = storeToRefs(organizationsStore);

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip)

const discoveryApis = ref({});

const getApiDiscoveryEndpoints = (list: any) => {
  list.forEach((server: any) => {
    if (!discoveryApis.value[server.ApiFamilyType]) {
      discoveryApis.value[server.ApiFamilyType] = server.ApiDiscoveryEndpoints?.length ?? 0;
    } else {
      discoveryApis.value[server.ApiFamilyType] += server.ApiDiscoveryEndpoints?.length ?? 0;
    }
  })
}

const getApiResources = (list: any) => {
  list.forEach((server: any) => {
    if (server.ApiResources?.length > 0) {
      getApiDiscoveryEndpoints(server.ApiResources)
    }
  })
}

const getInformationAmount = () => {
  if (!organizationsList.value) return 0;
  organizationsList.value.forEach(organization => {
    if (organization.AuthorisationServers?.length > 0) {
      getApiResources(organization.AuthorisationServers)
    }
  })
}

const computeChartLabels = computed(() => {
  if (!discoveryApis.value) return [];
  return Object.keys(discoveryApis.value);
})

const computedChartData = computed(() => {
  if (!discoveryApis.value) return [];
  return Object.values(discoveryApis.value);
})

const computedChartDataSets = computed(() => {
  return {
    labels: computeChartLabels.value,
    datasets: [
      {
        label: 'Principal',
        color: '#fff',
        backgroundColor: '#f87979',
        data: computedChartData.value
      }
    ]
  }
})

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: 'APIs por Tipo',
      font: { size: '20px' },
      color: 'white'
    },
  }
}

watch(() => isLoading.value, () => getInformationAmount())
</script>
<template>
  <div id="dashboard-api-chart" v-if="!isLoading" class="p-5 border rounded bg-gray-800 h-96 shadow-md">
    <Bar :data="computedChartDataSets" :options="options" />
  </div>
  <BaseSkeleton v-else class="h-64" />
</template>