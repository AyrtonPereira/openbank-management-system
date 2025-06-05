<script lang="ts" setup>
import { computed } from "vue";
import { BaseTableSkeleton } from "@/components";

const props = defineProps({
  fields: Array,
  data: Array,
  emptyMessage: String,
  loading: Boolean,
  noPages: { type: Boolean, default: false },
  loadingMore: { type: Boolean, default: false },
  clickable: { type: Boolean, default: false },
  routerProps: { type: String },
  routerName: { type: String },
});

const colsNumber = computed(() => {
  return props.fields.length ?? 5;
})
const redirect = (row) => {
  let props = {};
  for (let prop of props.routerProps) {
    Object.keys(prop).filter((item) => {
      props[item] = row[prop[item]];
    });
  }
  this.$router.push({
    name: props.routerName,
    params: props,
  });
};
</script>
<template>
  <transition>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg" v-if="!loading">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr class="">
            <th v-for="field in props.fields" scope="col" class="px-6 py-3">
              {{ field.label }}
            </th>
          </tr>
        </thead>
        <tbody class="">
          <tr v-for="(row, key) in data" :key="key" :class="`text-sm d-flex justify-center relative ${clickable &&
            'px-6 py-4 font-medium whitespace-nowrap dark:text-white'
            } border-b bg-white/80 text-gray-900`" @click="clickable && redirect(row)">
            <template v-for="field in props.fields">
              <slot :name="`${field.key}`" :data="row">
                <td class="py-2 px-2">
                  <span :class="`inline-flex text-xs leading-5 rounded uppercase tracking-wide pr-2`">
                    {{ row[field.key] }}
                  </span>
                </td>
              </slot>
            </template>
          </tr>
          <tr v-if="noPages && !data.length == 0">
            <td :colspan="fields.length" class="text-sm py-5 text-center">
              Não há outros registros
            </td>
          </tr>
          <tr v-if="loadingMore">
            <td :colspan="fields.length" class="text-sm py-5 text-center">
              <span role="status" class="spinner-border">
                <span class="sr-only">Loading...</span>
              </span>
            </td>
          </tr>
          <tr v-if="data.length == 0">
            <td :colspan="fields.length" class="text-sm py-5 text-center">
              {{ emptyMessage }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <BaseTableSkeleton v-else :cols="colsNumber" :rows="10" class="text-left text-sm w-full border-collapse mt-2" />
  </transition>
</template>
<style lang="scss" scoped>
.spinner-border {
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  vertical-align: text-bottom;
  border: 0.25em solid;
  border-right: 0.25em solid transparent;
  border-radius: 50%;
  -webkit-animation: spinner-border 0.65s linear infinite;
  animation: spinner-border 0.65s linear infinite;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@keyframes spinner-border {
  to {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
  }
}
</style>
