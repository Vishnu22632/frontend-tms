<template>
<div class="card">

  <!-- Toast component -->
   <Toast />

    <div class="button-container">
        <Button @click="visible=true"><span class="pi pi-plus"></span>ADD USER</Button>
    </div>

    <DataTable :value="users" tableStyle="min-width: 50rem"
    paginator
    :rows="5"
    :totalRecords="users.length"
    :rowsPerPageOptions="[5,10,20]"
    
    >
        <Column field="id" header="ID"></Column>
        <Column field="fullName" header="Full Name"></Column>
        <Column field="email" header="EMAIL"></Column>
        <Column field="password" header="PASSWORD"></Column>
        <Column field="address" header="ADDRESS"></Column>
        <Column header="ACTION">
        <template #body="slotProps">
          <Button
            icon="pi pi-trash"
            class="p-button-danger"
            @click="deleteUser(slotProps.data.id)"
          />
          <Button style="margin-left: 3px;"
            icon="pi pi-pencil"
            class="p-button-primary"
            @click="editUser(slotProps.data)"
          />

        </template>
      </Column>
    </DataTable>

    <!-- Dialog for editing/adding a user  -->
    <Dialog v-model:visible="visible" @keyup.enter="saveUser" modal header="ADD USER" :style="{ width: '35rem' }">
        
        <div class="flex items-center gap-3 mb-4">
            <label for="username" class="font-semibold w-24 text-lg">Full Name :</label>
            <InputText id="username" v-model="form.fullName" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex items-center gap-6 mb-4">
            <label for="email" class="font-semibold w-24 text-lg">Email :</label>
            <InputText id="email" v-model="form.email" class="flex-auto" autocomplete="off" />
        </div>


        <div class="flex items-center gap-4 mb-4">
            <label for="password" class="font-semibold w-24 text-lg">Password :</label>
            <InputText type="password" id="password" v-model="form.password" class="flex-auto" autocomplete="off" />
        </div>

        <div class="flex items-center gap-5 mb-4">
            <label for="address" class="font-semibold w-24 text-lg">Address :</label>
            <InputText id="address" v-model="form.address" class="flex-auto" autocomplete="off" />
        </div>


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
import {useToast} from 'primevue/usetoast';

// Initialize toast service
const toast = useToast();


const users = ref([]);

const visible = ref(false);

// create a form object to store input data
const form=ref({
    fullName: '',
    email: '',
    password: '',
    address: ''
});


// Populate form for editing
const editUser = (user)=>{
  form.value = {...user};   //   spread operator (...), Fill the form with the selected user's data
  visible.value = true;      
};



// Fetch users when component is mounted
onMounted(() => {
    UserService.getUsers().then(response => {
        users.value = response.data; // Assign the fetched data
    }).catch(error => {
        console.error('Error fetching users : ', error);
    })
});

// Save user data
const saveUser = () => {
  if (form.value.id) {
    // Update user
    UserService.updateUser(form.value.id, form.value).then(response => {
      UserService.getUsers().then(response => {
        users.value = response.data; // Reload user data
        visible.value = false;
        toast.add({ severity: 'success', summary: 'Success', detail: 'User updated successfully', life: 3000 });

      });
    }).catch(error => {
      console.error('Error updating user:', error);
      toast.add({ severity: 'error', summary: 'Error', detail: 'Error updating user', life: 3000 });
    });
  } else {
    // Create new user
    UserService.saveUser(form.value).then(response => {
      UserService.getUsers().then(response => {
        users.value = response.data; // Reload user data
        visible.value = false;
        toast.add({ severity: 'success', summary: 'Success', detail: 'User saved successfully', life: 3000 });
      });
    }).catch(error => {
      console.error('Error saving user:', error);
      toast.add({ severity: 'error', summary: 'Error', detail: 'Error saving user', life: 3000 });
    });
  }
};





// Delete user
const deleteUser = (id) => {
  if (confirm('Are you sure you want to delete this user?')) {
    UserService.deleteUser(id).then(() => {
      UserService.getUsers().then(response => {
        users.value = response.data; // Reload user data
        toast.add({ severity: 'success', summary: 'Success', detail: 'User deleted successfully', life: 3000 });
      });
    }).catch(error => {
      console.error('Error deleting user:', error);
      toast.add({ severity: 'error', summary: 'Error', detail: 'Error deleting user', life: 3000 });
    });
  }
};



</script>

<style scoped>
.button-container {
    margin: 15px 25px;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
}
</style>


