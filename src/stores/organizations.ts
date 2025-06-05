import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { registryService } from '@/services'

export const useOrganzationsStore = defineStore('organizations', () => {
  const organizationsList = ref([]);
  const isLoading = computed(() => organizationsList.value === null || organizationsList.value.length === 0);
  const getOrganizations = async () => {
    organizationsList.value = []
    const data = await registryService.getOrganizations();
    organizationsList.value = data;
  }

  const getOrganizationData = (organizationId: string) => {
    return organizationsList.value.find(organization => organization.OrganisationId === organizationId)
  }

  return { organizationsList, getOrganizations, getOrganizationData, isLoading }
})
