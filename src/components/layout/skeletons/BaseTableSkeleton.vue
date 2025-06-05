<script lang="ts" setup>
import { onMounted, ref } from 'vue';
interface Props {
  rows: number;
  cols: number;
}

const props = defineProps<Props>();

const colsArray = ref([]);
const rowsArray = ref([]);

onMounted(() => {
  let c, r;
  for (c = 1; c <= props.cols; c++) {
    colsArray.value.push({ col: props.cols });
  }
  for (r = 1; r <= props.rows; r++) {
    rowsArray.value.push({ row: props.rows });
  }
})
</script>
<template>
  <div class="border rounded-lg overflow-hidden">
    <table class="animate-pulse w-full">
      <thead class="bg-gray-700">
        <tr class="w-full">
          <th v-for="col in colsArray" :key="col" :class="`w-1/${col.col} md:pr-14 py-2 pl-3 border-b`">
            <div :class="`h-4 bg-gray-200 rounded`"></div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rowsArray" :key="row" class="w-full rounded">
          <td v-for="col in colsArray" :key="col" :class="`w-1/${col.col} md:pr-24 py-2 pl-3 order-b`">
            <div :class="`h-4 bg-gray-200 rounded`"></div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
