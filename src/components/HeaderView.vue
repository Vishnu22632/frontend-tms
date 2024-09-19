<template>
<div class="card">
    <Menubar :model="items" />
</div>
</template>

<script setup>
import {
    ref // imports ref function from vue. used to create a reactive reference to a value
} from "vue";

// To use the router programmatically
import {
    useRouter
} from "vue-router";

// Using the router to navigate programmatically
const router = useRouter();

// Defines a reactive reference named items. This array contains objects that represent the menu items for the Menubar component.
const items = ref([{
        label: 'Home',
        icon: 'pi pi-home',
        command: () => router.push('/')
    },
    {
        label: 'Users',
        icon: 'pi pi-user',
        command: () => router.push('/users')
    },
    {
        label: 'Projects',
        icon: 'pi pi-search',
        command: () => router.push('/projects')
    },
    {
        label: 'Tasks',
        icon: 'pi pi-star',
        command: () => router.push('/tasks')
    }

]);
</script>

<style scoped>

</style>
