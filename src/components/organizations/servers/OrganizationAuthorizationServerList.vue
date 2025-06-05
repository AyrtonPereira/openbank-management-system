<script lang="ts" setup>
import { BaseTable, BaseBadge, BaseButton, OrganizationDiscoveryAPIs } from '@/components';
import { useScrollTo } from '@/composable/useScrollTo';
import { ref } from 'vue';
interface Props {
  servers: any[]
}

defineProps<Props>();

const apisList = ref([])

const tableHeaders = [
  {
    key: 'CustomerFriendlyName',
    label: 'Nome'
  },
  {
    key: 'CustomerFriendlyDescription',
    label: 'Descrição'
  },
  {
    key: 'ApiResources',
    label: 'APIs'
  },
  {
    key: 'actions',
    label: 'Ações'
  }
]

const onShowAPIs = (data: any) => {
  apisList.value = data
  useScrollTo('organization-discovery-apis');
}
</script>
<template>
  <h3 id="organization-servers" class="text-xl font-semibold text-gray-900 sm:text-2xl">Servidores</h3>
  <BaseTable :fields="tableHeaders" :data="servers" emptyMessage="Nenhum servidor encontrado">
    <template v-slot:ApiResources="{ data }">
      <td class="p-5 flex flex-wrap justify-center items-center text-center">
        <BaseBadge v-if="data.ApiResources?.length > 0" variant="primary" class="me-1" size="base"
          :label="data.ApiResources?.length" />
        <BaseBadge v-else variant="primary" class="me-1" size="base" label="Sem APIs" />
      </td>
    </template>
    <template v-slot:actions="{ data }">
      <td class="p-2">
        <BaseButton class="h-10 text-xs" v-if="data.ApiResources?.length > 0" @click="onShowAPIs(data.ApiResources)">
          Ver APIs
        </BaseButton>
      </td>
    </template>
  </BaseTable>
  <OrganizationDiscoveryAPIs v-if="apisList.length > 0" :apis="apisList" />
</template>