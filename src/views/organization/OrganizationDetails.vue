<script lang="ts" setup>
import { useOrganzationsStore } from '@/stores/organizations';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { OrganizationInfo, OrganizationTags, OrganizationAuthorizationServerList } from '@/components';

const route = useRoute();
const router = useRouter();
const organizationsStore = useOrganzationsStore();

const organizationId = route.params.id

const organization = ref(organizationsStore.getOrganizationData(organizationId));

onMounted(() => {
  if (!organization.value) {
    router.push({ name: 'organizations.list' });
  }
})
</script>

<template>
  <div id="organization-details" v-if="organization" class="flex flex-col gap-4 pb-20">
    <OrganizationInfo :organization="organization" />
    <OrganizationTags :tags="organization.Tags" />
    <OrganizationAuthorizationServerList :servers="organization.AuthorisationServers" />
  </div>
</template>