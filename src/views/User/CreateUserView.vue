<script setup lang="ts">
import DefaultCard from '@/components/Forms/DefaultCard.vue';
import InputGroup from '@/components/Forms/InputGroup.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { createUser, uploadAvatar } from '@/http/user-api';
import { ref } from 'vue';
import AlertSuccess from '@/components/Alerts/AlertSuccess.vue';

// Define the reactive user data
const userData = ref({
    name: '',
    phone_number: '',
    email: '',
    password: '',
    role: '', // Uncomment if you're using SelectGroupTwo for role or any other field
    avatar_file_name: '',

});
const showAlert = ref(false);
const alertTitle = ref('');
const alertMessage = ref('');

// Define a reactive variable for the avatar file
const avatarFile = ref<File | null>(null);

// Handle file input change
const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
        avatarFile.value = target.files[0];
    }
};

// Handle form submission
const handleSubmit = async () => {
    // Validation check
    if (!userData.value.name || !userData.value.phone_number || !userData.value.email || !userData.value.password) {
        console.error('Please fill in all required fields.');
        return;
    }

    try {
        // First, create the user
        console.log('User data being sent:', userData.value);
        const response = await createUser(userData.value); // Assuming the response contains the created user's ID

        console.log('User created successfully');
        console.log(response.data.id);
        // If an avatar is selected, upload it
        if (avatarFile.value) {
            const formData = new FormData();
            formData.append('avatar', avatarFile.value);
            await uploadAvatar(response.data.id, formData); // Pass user ID and form data
            console.log('Avatar uploaded successfully');
        }
        // Show success alert
    showAlert.value = true;
    alertTitle.value = 'User Created Successfully';
    alertMessage.value = 'The user and avatar were successfully created and uploaded.';

    // Clear form
    userData.value = { name: '', phone_number: '', email: '', password: '', role: '', avatar_file_name: '' };

    } catch (error) {
        console.error('Error creating user or uploading avatar:', error);
    }
};
</script>

<template>
    <DefaultLayout>
        <!-- Alert component -->
      <AlertSuccess v-if="showAlert" :title="alertTitle" :message="alertMessage" />
        <DefaultCard cardTitle="User Form">
            <form @submit.prevent="handleSubmit">
                <div class="p-6.5">
                    <div class="mb-4.5 flex flex-col xl:flex-row">
                        <!-- Bind data using v-model -->
                        <InputGroup v-model="userData.name" label="Name" type="text" placeholder="Enter your user name"
                            customClasses="w-full" />
                    </div>

                    <InputGroup v-model="userData.phone_number" label="Phone" type="text"
                        placeholder="Enter your phone number" customClasses="mb-4.5" required />

                    <InputGroup v-model="userData.email" label="Email" type="email"
                        placeholder="Enter your email address" customClasses="mb-4.5" required />

                    <InputGroup v-model="userData.password" label="Password" type="password"
                        placeholder="Enter your password" customClasses="mb-4.5" />

                    <!-- Uncomment if you want to use the select component -->
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
                    <!-- File upload input End -->
                    <button type="submit"
                        class="flex w-full justify-center rounded bg-primary p-3 mt-6 font-medium text-gray hover:bg-opacity-90">
                        Submit
                    </button>

                </div>
            </form>
        </DefaultCard>
    </DefaultLayout>
</template>
