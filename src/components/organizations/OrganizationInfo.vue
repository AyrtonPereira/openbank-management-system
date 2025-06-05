<script lang="ts" setup>
import { BaseInput } from '@/components';
interface Props {
  organization: any
}

defineProps<Props>();
</script>
<template>
  <h3 class="text-xl font-semibold text-gray-900 sm:text-2xl">Informações</h3>
  <div class="grid grid-cols-1 md:grid-flow-col gap-2">
    <BaseInput class="md:col-span-2" v-model="organization.OrganisationName" disabled
      placeholder="Nome da Organização" />
    <BaseInput v-model="organization.RegistrationNumber" disabled placeholder="Número de Registro" />
    <BaseInput v-model="organization.RegistrationId" disabled placeholder="ID de Registro" />
  </div>
  <div class="grid grid-cols-1 md:grid-flow-col gap-2">
    <BaseInput class="md:col-span-3" v-model="organization.AddressLine1" disabled placeholder="Endereço" />
    <BaseInput v-model="organization.AddressLine2" disabled placeholder="Bairro" />
    <BaseInput v-model="organization.City" disabled placeholder="Cidade - UF" />
    <BaseInput v-model="organization.Country" disabled placeholder="País" />
  </div>
</template>