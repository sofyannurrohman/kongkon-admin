<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import TableThree from '@/components/Tables/TableThree.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { getAllUsers, removeUser } from '@/http/user-api'
import type { User } from '@/model/User'
import AlertSuccess from '@/components/Alerts/AlertSuccess.vue'

// Page title and error handling
const pageTitle = ref('User Tables')
const error = ref<string | null>(null);

// Success alert state
const showAlert = ref(false);
const alertMessage = ref('');

// Data for the table
const customerData = ref<User[]>([]);

// Fetch the data on component mount
onMounted(async () => {
  try {
    const response = await getAllUsers();
    customerData.value = response.data;
    console.log(customerData.value);
  } catch (err) {
    error.value = 'An error occurred while fetching data';
    console.error(err);
  }
});

// Define columns for the user table
const customerColumns = ref([
  { label: 'ID', field: 'id' },
  { label: 'Name', field: 'name' },
  { label: 'Phone Number', field: 'phone_number' },
  { label: 'Email', field: 'email' },
  { label: 'Role', field: 'role_id' },
]);

// Define route functions for dynamic actions
const editRoute = (id: string) => `/users/edit/${id}`;
const viewRoute = (id: string) => `/users/view/${id}`;
const deleteRoute = (id: string) => `/users/${id}`;
// Function to handle user deletion
const handleDeleteUser = async (id: string) => {
  try {
    const response = await removeUser(id);
    console.log(response.data.message);
    customerData.value = customerData.value.filter(user => user.id !== id); // Remove user from table
    alertMessage.value = response.data.message;
    showAlert.value = true; // Show success alert
  } catch (err) {
    console.error('Error deleting user:', err);
  }
};
</script>

<template>
  <DefaultLayout>
    <!-- Success Alert -->
    <!-- Breadcrumb Start -->
    <BreadcrumbDefault :pageTitle="pageTitle" />
    <!-- Breadcrumb End -->
    <AlertSuccess v-if="showAlert" :message="alertMessage" />

    <div class="flex flex-col gap-10">
      <!-- Pass the dynamic routes and data to the TableThree component -->
      <TableThree :columns="customerColumns" :tableData="customerData" :editRoute="editRoute" :viewRoute="viewRoute"
        :deleteRoute="deleteRoute" @delete="handleDeleteUser" />
    </div>
  </DefaultLayout>
</template>
