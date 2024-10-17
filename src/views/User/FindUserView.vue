<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import DefaultCard from '@/components/Forms/DefaultCard.vue';
import InputGroup from '@/components/Forms/InputGroup.vue';
import { ref, onMounted } from 'vue';
import { getUserByID } from '@/http/user-api'; // Make sure this API exists
import { useRoute } from 'vue-router'; // To get the user ID from the URL

// Fetch the route to get the user ID
const route = useRoute();
const userId = route.params.id; // Adjust according to your router configuration

// Define the reactive user data
const userData = ref({
    name: '',
    phone_number: '',
    email: '',
    password: '', // Password should be empty unless user changes it
    role: '', // Optional field if using roles
});

// Fetch the user data when the component is mounted
onMounted(async () => {
    try {
        const response = await getUserByID(String(userId)); // Fetch the user data by ID
        console.log(response);
        userData.value = {
            name: response.data.name,
            phone_number: response.data.phone_number,
            email: response.data.email,
            role: response.data.role_id, // If using role
        };
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
});
</script>
<template>
    <DefaultLayout>
        <DefaultCard cardTitle="User Details">
            <div class="p-6.5">
                <div class="mb-4.5 flex flex-col " disabled>
                    <!-- Bind data using v-model and make it readonly -->
                    <div>
                        <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                            Name
                        </label>
                        <input v-model="userData.name" type="text" disabled
                            class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-black" />
                    </div>
                </div>

                <div>
                    <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                        Phone Number
                    </label>
                    <input v-model="userData.phone_number" type="text"  disabled
                        class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-black" />
                </div>

                <div>
                    <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                        Email
                    </label>
                    <input v-model="userData.email" type="text"  disabled
                        class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-black" />
                </div>
                <div>
                    <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                        Role
                    </label>
                    <input v-model="userData.role" type="text"  disabled
                        class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-black" />
                </div>

            </div>
        </DefaultCard>
    </DefaultLayout>
</template>