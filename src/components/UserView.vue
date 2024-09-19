<template>
<div class="card">

    <div class="button-container">
        <Button @click="visible=true"><span class="pi pi-plus"></span>ADD USER</Button>
    </div>

    <DataTable :value="users" tableStyle="min-width: 50rem">
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
        </template>
      </Column>
    </DataTable>

    <!-- Dialog for editing/adding a user  -->
    <Dialog v-model:visible="visible" modal header="ADD USER" :style="{ width: '35rem' }">
        
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


        <div class="flex justify gap-2 ">
            <Button type="reset" class="text-lg" label="Reset" severity="secondary" @click="visible = false"></Button>
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

const users = ref([]);

const visible = ref(false);

// create a form object to store input data
const form=ref({
    fullName: '',
    email: '',
    password: '',
    address: ''
});


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
  UserService.saveUser(form.value).then(response => {
    
    UserService.getUsers().then(response => {
      users.value = response.data; //  user data reload
      visible.value = false; 
    });
  }).catch(error => {
    console.error('Error saving user:', error);
  });
};



// Delete user
const deleteUser = (id) => {
  if (confirm('Are you sure you want to delete this user?')) {
    UserService.deleteUser(id).then(() => {
      UserService.getUsers().then(response => {
        users.value = response.data; // Reload user data
      });
    }).catch(error => {
      console.error('Error deleting user:', error);
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
