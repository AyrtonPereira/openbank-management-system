<script setup lang="ts">
import { BaseSelect, BaseInput, BaseButton, BaseSkeleton } from '@/components'
import { isValidState, STATE_DICTIONARY } from '@/helpers';
import { useOrganzationsStore } from '@/stores/organizations';
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';
import { TrashIcon } from '@heroicons/vue/20/solid';

interface Emits {
  (e: 'update', value: any[]): void
}

const emit = defineEmits<Emits>();

const organizationsStore = useOrganzationsStore();
const { organizationsList, isLoading } = storeToRefs(organizationsStore);

const stateFilter = ref<string | null>(null);
const flagsFilter = ref<string | null>(null);
const nameFilter = ref<string | null>(null);

const computedTags = computed(() => {
  if (!organizationsList.value) return [];
  const tagsArray = organizationsList.value.reduce((tags, item) => {
    if (item.Tags.length > 0) {
      item.Tags.forEach((tag: string) => {
        if (!tags.includes(tag)) {
          tags.push(tag)
        }
      })
    }

    return tags
  }, []);
  return tagsArray.sort();
})

const tagsOptions = computed(() => {
  if (!computedTags.value) return [];
  return computedTags.value.map(tag => {
    return {
      label: tag,
      value: tag
    }
  })
})

const onFilterStates = (list: any[]) => {

  return list.filter((item: any) => {
    const dataCity = item.City;
    const sanitizeCity = dataCity.split(",")[1]?.trim();
    if (isValidState(sanitizeCity) && stateFilter.value.includes(sanitizeCity)) {
      return true
    }
    return false
  })
}
const onAplyFilter = () => {
  let filteredOrganizations = organizationsList.value;

  if (stateFilter.value) {
    filteredOrganizations = onFilterStates(filteredOrganizations)
  }

  if (nameFilter.value) {
    const regex = new RegExp(`(?=${nameFilter.value})\\w+`, 'gi');
    filteredOrganizations = filteredOrganizations.filter((item: any) => {
      return regex.test(item.OrganisationName)
    })
  }

  if (flagsFilter.value) {
    filteredOrganizations = filteredOrganizations.filter((item: any) => {
      return item.Tags.includes(flagsFilter.value)
    })
  }

  filteredOrganizations.sort((a, b) => a - b)
  emit('update', filteredOrganizations)
}

const onResetFilters = () => {
  stateFilter.value = null;
  flagsFilter.value = null;
  nameFilter.value = null;
  onAplyFilter();
}

watch(
  () => [stateFilter.value, nameFilter.value, flagsFilter.value, isLoading.value],
  onAplyFilter,
  { immediate: true }
)

</script>
<template>
  <div v-if="!organizationsStore.isLoading"
    class="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 md:rounded-lg">
    <div class="flex flex-col md:flex-row items-center justify-between p-4 space-y-3 md:space-y-0 md:space-x-4">
      <BaseInput id="organization-filter-name-input" v-model="nameFilter" class="w-full md:max-w-xs"
        placeholder="Nome da Organização" />
      <div class="flex flex-col md:flex-row w-full rounded-md shadow-sm md:w-auto gap-2" role="group">
        <BaseSelect id="organization-filter-state-select" v-model="stateFilter" :options="STATE_DICTIONARY"
          :placeholder="`Selecione o Estado`" />
        <BaseSelect id="organization-filter-tags-select" v-model="flagsFilter" :options="tagsOptions"
          :placeholder="`Selecione a Tag`" />
        <BaseButton id="organization-filter-reset-button" class="bg-red-500 hover:bg-red-600" @click="onResetFilters">
          <TrashIcon size="20px" class="w-5 h-5" />
        </BaseButton>
      </div>
    </div>
  </div>
  <BaseSkeleton class="h-20 mb-5" v-else />
</template>