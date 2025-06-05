<script lang="ts" setup>
import { BaseTable, OrganizationDiscoveryAPIsEndpoints, BaseButton, BaseBadge } from '@/components';
import { useScrollTo } from '@/composable/useScrollTo';
import { ref } from 'vue';

interface Props {
  apis: any[]
}
defineProps<Props>();

const endpointList = ref([]);

const tableFields = [
  {
    key: 'ApiFamilyType',
    label: 'Tipo'
  },
  {
    key: 'CertificationStatus',
    label: 'Status da Certificação'
  },
  {
    key: 'CertificationStartDate',
    label: 'Data de Início da Certificação'
  },
  {
    key: 'CertificationExpirationDate',
    label: 'Data de Fim da Certificação'
  },
  {
    key: 'endpoints',
    label: 'Endpoints'
  },
  {
    key: 'actions',
    label: 'Ações'
  }
]

const onSelectEndpoint = (list: any) => {
  endpointList.value = list
  useScrollTo('organization-discovery-apis-endpoints');
}
</script>
<template>
  <h3 id="organization-discovery-apis" class="text-xl font-semibold text-gray-900 sm:text-2xl">APIs</h3>
  <BaseTable class="max-h-96 shadow-lg" :fields="tableFields" :data="apis" emptyMessage="Nenhum servidor encontrado">
    <template v-slot:actions="{ data }">
      <td class="p-2">
        <BaseButton class="h-10 text-xs" @click="onSelectEndpoint(data.ApiDiscoveryEndpoints)">Ver Endpoints
        </BaseButton>
      </td>
    </template>
    <template v-slot:endpoints="{ data }">
      <td class="p-5 flex flex-wrap justify-center items-center text-center">
        <BaseBadge v-if="data.ApiDiscoveryEndpoints?.length > 0" variant="primary" class="me-1" size="base"
          :label="data.ApiDiscoveryEndpoints?.length" />
        <BaseBadge v-else variant="primary" class="me-1" size="base" label="Sem Endpoints" />
      </td>
    </template>
  </BaseTable>
  <OrganizationDiscoveryAPIsEndpoints v-if="endpointList.length > 0" :endpoints="endpointList" />
</template>