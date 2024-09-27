<template>
<div class="card" style="font-size: 1.4em;">

    <!-- Toast component -->

    <Toast />

    <ConfirmDialog></ConfirmDialog>

    <div class="button-container">
        <Button @click="showAddUserDialog"><span class="pi pi-plus"></span>ADD USER</Button>
    </div>

    <DataTable :value="users" tableStyle="min-width: 50rem" paginator :rows="5" :totalRecords="totalRecords" lazy @page="onPageChange">

        <Column field="id" header="ID"></Column>
        <Column>
            <template #header>
                <div style="text-align: center; font-weight: bolder;">
                    Full Name:
                    <div>
                        <InputText v-model="fullNameFilter" placeholder="Filter by Full Name" @input="onFilter" />
                    </div>
                </div>
            </template>
            <template #body="slotProps">
                {{ slotProps.data.fullName }}
            </template>
        </Column>

        <Column>
                <template #header>
                    <div style="text-align: center; font-weight: bolder;">
                        Email:
                        <div>
                            <InputText v-model="emailFilter" placeholder="Filter by Email" @input="onFilter" />
                        </div>
                    </div>
                </template>
                <template #body="slotProps">
                    {{ slotProps.data.email }}
                </template>
            </Column>

        <Column>
                <template #header>
                    <div style="text-align: center; font-weight: bolder;">
                        Address:
                        <div>
                            <InputText v-model="addressFilter" placeholder="Filter by Address" @input="onFilter" />
                        </div>
                    </div>
                </template>
                <template #body="slotProps">
                    {{ slotProps.data.address }}
                </template>
            </Column>

        <Column field="password" header="PASSWORD"></Column>
        
        <Column header="ACTION">
            <template #body="slotProps">
                <Button icon="pi pi-trash" class="p-button-danger" @click="deleteUser(slotProps.data.id)" />
                <Button style="margin-left: 3px;" icon="pi pi-pencil" class="p-button-primary" @click="editUser(slotProps.data)" />

            </template>
        </Column>
    </DataTable>

    <!-- Dialog for editing/adding a user  -->
    <Dialog v-model:visible="visible" @keyup.enter="saveUser" modal header="ADD USER" :style="{ width: '35rem' }">

        <div class="flex items-center gap-3 mb-4">
            <label for="username" class="font-semibold w-24 text-lg">Full Name :</label>
            <InputText id="username" v-model="form.fullName" class="flex-auto" autocomplete="off" />
        </div>
        <p v-if="validationErrors.fullName" class="error">{{ validationErrors.fullName }}</p>

        <div class="flex items-center gap-6 mb-4">
            <label for="email" class="font-semibold w-24 text-lg">Email :</label>
            <InputText id="email" v-model="form.email" class="flex-auto" autocomplete="off" />
        </div>
        <span v-if="validationErrors.email" class="error">{{ validationErrors.email }}</span>

        <div class="flex items-center gap-4 mb-4">
            <label for="password" class="font-semibold w-24 text-lg">Password :</label>
            <InputText type="password" id="password" v-model="form.password" class="flex-auto" autocomplete="off" />
        </div>
        <span v-if="validationErrors.password" class="error">{{ validationErrors.password }}</span>

        <div class="flex items-center gap-5 mb-4">
            <label for="address" class="font-semibold w-24 text-lg">Address :</label>
            <InputText id="address" v-model="form.address" class="flex-auto" autocomplete="off" />
        </div>
        <span v-if="validationErrors.address" class="error">{{ validationErrors.address }}</span>

        <div class="flex justify-content-center gap-2 ">
            <Button type="cancel" class="text-lg" label="CANCEL" severity="secondary" @click="visible = false"></Button>
            <Button type="button" class="text-lg" label="Save" @click="saveUser"></Button>
        </div>
    </Dialog>

</div>
</template>

<script setup>
import {
    ref,
    onMounted
} from 'vue';

// import user Service 
import UserService from '../services/UserService';

// import useToast
import {
    useToast
} from 'primevue/usetoast';

// Initialize toast service
const toast = useToast();

// import useConfim
import {
    useConfirm
} from "primevue/useconfirm";
const confirm = useConfirm();

const users = ref([]);
const totalRecords = ref(0);

const fullNameFilter = ref(''); // Filter for Full Name
const emailFilter = ref(''); // Filter for Email
const addressFilter = ref(''); // Filter for Address

const dialogHeader = ref('Add User'); // Dynamic header


const visible = ref(false);

// create a form object to store input data
const form = ref({
    fullName: '',
    email: '',
    password: '',
    address: ''
});

// validationErrors object to store message for each field 
const validationErrors = ref({
    fullName: '',
    email: '',
    password: '',
    address: ''
});

// create a validation function 
const validationForm = () => {
    let isValid = true;

    // Reset error messages
    validationErrors.value = {
        fullName: '',
        email: '',
        password: '',
        address: ''
    };

    // Full Name validation
    if (!form.value.fullName.trim()) {
        validationErrors.value.fullName = 'Full Name is required';
        isValid = false;
    }

    // Email validation
    if (!form.value.email.trim()) {
        validationErrors.value.email = 'Email is required';
        isValid = false;
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.value.email)) {
        validationErrors.value.email = 'Invalid email format';
        isValid = false;
    }

    // Password validation
    if (!form.value.password.trim()) {
        validationErrors.value.password = 'Password is required';
        isValid = false;
    }

    // Address validation
    if (!form.value.address.trim()) {
        validationErrors.value.address = 'Address is required';
        isValid = false;
    }

    return isValid;
};

// Load users with filters
const loadUsers = (page = 0, rows = 5) => {
    const combinedFilter = `${fullNameFilter.value || ''} ${emailFilter.value || ''} ${addressFilter.value || ''}`.trim();
    UserService.getUsers(page, rows, combinedFilter)
        .then(response => {
            users.value = response.data.content;
            totalRecords.value = response.data.totalElements;
        })
        .catch(error => {
            console.error('Error fetching users: ', error);
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error fetching users',
                life: 3000
            });
        });
};
onMounted(() => {
    loadUsers();
});

// Handle page change event
const onPageChange = (event) => {
    loadUsers(event.page, event.rows);

};

// Handle filter input and reload users
const onFilter = () => {
    loadUsers(0, 5); // Reset to first page when applying a filter
};

// Show add user dialog
const showAddUserDialog = () => {
    form.value = {
        fullName: '',
        email: '',
        password: '',
        address: ''
    };

    // Reset form
    dialogHeader.value = 'Add User';
    visible.value = true;
};

// Populate form for editing
const editUser = (user) => {
    form.value = {
        ...user
    }; //   spread operator (...), Fill the form with the selected user's data
    visible.value = true;
};

// Save user data

const saveUser = () => {

    if (!validationForm()) {
        // if form is invalidateTypeCache, don't proceed
        toast.add({
            severity: 'warn',
            summary: 'Validation Failed',
            detail: 'please fill alll the required fields',
            life: 3000
        });
        return;
    }

    confirm.require({
        message: 'Are you sure you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Save'
        },
        accept: () => {
            if (form.value.id) {
                // Update user
                UserService.updateUser(form.value.id, form.value).then(() => {
                    loadUsers(); // Reload users
                    visible.value = false;
                    toast.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'User updated successfully',
                        life: 3000
                    });
                }).catch(error => {
                    console.error('Error updating user:', error);
                    toast.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Error updating user',
                        life: 3000
                    });
                });
            } else {
                // Create new user
                UserService.saveUser(form.value).then(() => {
                    loadUsers(); // Reload user data
                    visible.value = false;
                    toast.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'User saved successfully',
                        life: 3000
                    });

                }).catch(error => {
                    console.error('Error saving user:', error);
                    toast.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Error saving user',
                        life: 3000
                    });
                });
            }
        },
        reject: () => {
            toast.add({
                severity: 'error',
                summary: 'Rejected',
                detail: 'You have rejected',
                life: 3000
            });
        }
    });
};

// Delete user

const deleteUser = (id) => {
    confirm.require({
        message: 'Are you sure you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Delete',
            severity: 'danger'
        },
        accept: () => {
            UserService.deleteUser(id).then(() => {

                loadUsers(); // Reload user data
                toast.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'User deleted successfully',
                    life: 3000
                });

            }).catch(error => {
                console.error('Error deleting user:', error);
                toast.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Error deleting user',
                    life: 3000
                });
            });
        },
        reject: () => {
            toast.add({
                severity: 'error',
                summary: 'Rejected',
                detail: 'You have rejected',
                life: 3000
            });
        }
    });
};
</script>

<style scoped>
.button-container {
    margin: 15px 25px;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
}

.error {
    color: red;
    font-size: 0.875rem;
    margin-top: -0.75rem;
    margin-bottom: 0.75rem;
    display: block;
}
</style>
