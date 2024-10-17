<script setup lang="ts">
import DefaultCard from '@/components/Forms/DefaultCard.vue';
import InputGroup from '@/components/Forms/InputGroup.vue';
import SelectGroupTwo from '@/components/Forms/SelectGroup/SelectGroupTwo.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { ref, onMounted } from 'vue';
import { getUserByID, updateUser } from '@/http/user-api'; // Assuming these APIs exist
import { useRoute } from 'vue-router'; // To get the user ID from the URL

// Fetch the route to get the user ID
const route = useRoute();
const userId = route.params.id; // Adjust according to your router configuration

// Define the reactive user data
const userData = ref({
    name: '',
    phone_number: '',
    email: '',
    password: '',
    role: '', // Uncomment if you're using SelectGroupTwo for role
    avatar_file_name: '',
});

// Fetch the user data when the component is mounted
onMounted(async () => {
    try {
        const response = await getUserByID(String(userId)); // Fetch the user data
        console.log(response);
        userData.value = {
            name: response.data.name || '', // Set default empty strings to avoid undefined issues
            phone_number: response.data.phone_number || '',
            email: response.data.email || '',
            password: '', // Leave password empty unless user wants to update it
            role: response.data.role || '', // Uncomment if you're using roles
            avatar_file_name: response.data.avatar_file_name || '',
        };
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
});

// Handle form submission for updating the user
const handleSubmit = async () => {
    // Validation check
    if (!userData.value.name || !userData.value.phone_number || !userData.value.email) {
        console.error('Please fill in all required fields.');
        return;
    }

    try {
        console.log('User data being updated:', userData.value);
        await updateUser(String(userId), userData.value); // Call the updateUser API
        console.log('User updated successfully');
    } catch (error) {
        console.error('Error updating user:', error);
    }
};
</script>
<template>
    <DefaultLayout>
        <DefaultCard cardTitle="Update User">
            <form @submit.prevent="handleSubmit">
                <div class="p-6.5">
                    <div class="mb-4.5 flex flex-col xl:flex-row">
                        <!-- Bind data using v-model -->
                        <InputGroup v-model="userData.name" label="Name" type="text" placeholder="Enter user name"
                            customClasses="w-full" />
                    </div>

                    <InputGroup v-model="userData.phone_number" label="Phone" type="text"
                        placeholder="Enter phone number" customClasses="mb-4.5" required />

                    <InputGroup v-model="userData.email" label="Email" type="email" placeholder="Enter email address"
                        customClasses="mb-4.5" required />

                    <InputGroup v-model="userData.password" label="Password" type="password"
                        placeholder="Leave empty to keep current password" customClasses="mb-4.5" />

                    <!-- Uncomment if you want to use the select component for role -->
                    <!-- <SelectGroupTwo v-model="userData.role" /> -->
                    <DefaultCard cardTitle="Avatar upload">
                        <div class="flex flex-col gap-5.5 p-6.5">
                            <div>
                                <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Attach file
                                </label>
                                <input type="file" @change="handleFileChange"
                                    class="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary" />
                            </div>
                        </div>
                    </DefaultCard>
                    
                    <button type="submit"
                        class="flex w-full justify-center rounded bg-primary p-3 mt-6 font-medium text-gray hover:bg-opacity-90">
                        Update
                    </button>
                </div>
            </form>
        </DefaultCard>
    </DefaultLayout>
</template>
