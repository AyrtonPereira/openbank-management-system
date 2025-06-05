<script lang="ts" setup>
import { BaseTable } from '@/components';

interface Props {
  endpoints: any[]
}
defineProps<Props>();

const tableFields = [
  {
    key: 'ApiDiscoveryId',
    label: 'ID'
  },
  {
    key: 'ApiEndpoint',
    label: 'Endpoint'
  }
]
</script>
<template>
  <h3 id="organization-discovery-apis-endpoints" class="text-xl font-semibold text-gray-900 sm:text-2xl">Endpoints</h3>
  <BaseTable :fields="tableFields" :data="endpoints" emptyMessage="Nenhum endpoint encontrado" />
</template>