<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { BaseButton } from '@/components';
import { useOrganzationsStore } from '@/stores/organizations';
import { OrganizationsFilters, BaseBadge } from '@/components';
import BaseTable from '@/components/layout/BaseTable.vue';
import { useRouter } from 'vue-router';

const organizationsStore = useOrganzationsStore();
const router = useRouter();
const organizations = ref([])

const onUpdate = (list: any[]) => {
  organizations.value = list
}

const fields = [
  {
    key: 'OrganisationName',
    label: 'Nome',
  },
  {
    key: 'City',
    label: 'Cidade',
  },
  {
    key: 'Tags',
    label: 'Tags',
  },
  {
    key: 'Size',
    label: 'Tamanho',
  },
  {
    key: 'actions',
    label: 'Ações',
  },
]
onMounted(async () => {
  organizationsStore.getOrganizations()
})

const onClick = (id: string) => {
  router.push({ name: 'organizations.details', params: { id: id } });
}
</script>
<template>
  <div id="organization-List">
    <OrganizationsFilters class="mb-4" @update="onUpdate" />
    <BaseTable :loading="organizationsStore.isLoading" :fields="fields" :data="organizations"
      emptyMessage="Nenhuma organização encontrada">
      <template #actions="{ data }">
        <div class="p-2">
          <BaseButton class="h-6 organization-list-button" @click="onClick(data.OrganisationId)">
            Detalhes
          </BaseButton>
        </div>
      </template>
      <template #Tags="{ data }">
        <div class="flex flex-wrap gap-1">
          <BaseBadge v-for="tag in data.Tags" :key="tag" variant="primary" class="me-1" size="sm" :label="tag" />
        </div>
      </template>
    </BaseTable>
  </div>
</template>