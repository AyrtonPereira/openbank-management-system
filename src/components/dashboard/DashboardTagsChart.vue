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
import { computed } from 'vue';
import { Bar } from 'vue-chartjs'
import { BaseSkeleton } from '@/components'

const organizationsStore = useOrganzationsStore();
const { organizationsList, isLoading } = storeToRefs(organizationsStore);

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip)


const computedTags = computed(() => {
  if (!organizationsList.value) return [];
  const tagList = {}
  organizationsList.value.forEach((organization) => {
    if (organization.Tags.length > 0) {
      organization.Tags.forEach((tag: string) => {
        if (!tagList[tag]) {
          tagList[tag] = 1;
        } else {
          tagList[tag] += 1;
        }
      })
    }
  });
  return tagList
})

const computeChartLabels = computed(() => {
  if (!organizationsList.value) return [];
  return Object.keys(computedTags.value)
})

const computedChartData = computed(() => {
  if (!organizationsList.value) return [];
  return Object.values(computedTags.value)
})

const computedChartDataSets = computed(() => {
  return {
    labels: computeChartLabels.value,
    datasets: [
      {
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
    legend: {
      display: false
    },
    title: {
      display: true,
      text: 'Quantidade de Tags ',
      font: { size: '20px' },
      color: 'white'
    },
  }
}

</script>
<template>
  <div id="dashboard-tags-chart" v-if="!isLoading" class="p-5 border rounded bg-gray-800 h-96 shadow-md">
    <Bar :data="computedChartDataSets" :options="options" />
  </div>
  <BaseSkeleton v-else class="h-64" />
</template>