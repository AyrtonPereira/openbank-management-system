<script lang="ts" setup>
import { isValidState } from '@/helpers';
import { useOrganzationsStore } from '@/stores/organizations';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, type ChartData } from 'chart.js'
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { Pie } from 'vue-chartjs'
import { BaseSkeleton } from '@/components';

const organizationsStore = useOrganzationsStore();
const { organizationsList, isLoading } = storeToRefs(organizationsStore);

ChartJS.register(ArcElement, Tooltip, Legend, Title)

const computedStates = computed(() => {
  if (!organizationsList.value) return null;
  const citiesArray = organizationsList.value.reduce((cities, item) => {
    const dataCity = item.City;
    const sanitizeCity = dataCity.split(",")[1]?.trim();
    if (isValidState(sanitizeCity)) {
      if (!cities[sanitizeCity]) {
        cities[sanitizeCity] = 1;
      } else {
        cities[sanitizeCity] += 1;
      }
    }
    return cities;
  }, {});

  return citiesArray
})

const computeChartLabels = computed(() => {
  if (!computedStates.value) return [];
  return Object.keys(computedStates.value);
})

const computedChartData = computed(() => {
  if (!computedStates.value) return [];
  return Object.values(computedStates.value);
})

const chartConfig = computed(() => {
  return {
    labels: computeChartLabels.value,
    datasets: [
      {
        backgroundColor: [
          '#f2739b', '#00D8FF', '#c53e44', '#1288bf', '#f075c5', '#3080d5',
          '#70d20a', '#f59a04', '#95b92f', '#735acd', '#6ee5e9', '#de5a12',
          '#246562', '#a7e94e', '#52be59', '#6da1ae', '#cc7827', '#c853a3',
          '#2789fe', '#5cfd6e', '#462fb7', '#bb155f', '#dc4dbb', '#f076d9',
          '#9e0037', '#e9409d', '#840cc0'],
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
      text: 'Organizações por Cidade',
      font: { size: '20px' },
      color: 'white'
    },
  }

}

</script>
<template>
  <div id="dashboard-cities-chart" v-if="!isLoading && computedStates"
    class="p-5 border rounded bg-gray-800  shadow-md">
    <Pie :data="chartConfig" :options="options" />
  </div>
  <BaseSkeleton v-else class="h-64" />
</template>