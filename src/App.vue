<template>
<div id="app">

    <!-- Custom header component -->
    <HeaderView /> 

    <!-- where the routed component will render -->
    <router-view />

</div>
</template>

<script setup>
import HeaderView from './components/HeaderView.vue';
</script>

<style scoped>

</style>
