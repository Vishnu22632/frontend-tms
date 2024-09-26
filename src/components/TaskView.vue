<template>
    <div style="margin: 60px;;">

        <label for="username">UserName: </label>
        <input id="username" type="text" ref="inputRef" />

    </div>
</template>

<script setup>

import { ref,onMounted } from 'vue';

const inputRef = ref("vishnu");

console.log(inputRef.value);

onMounted(()=>{
    console.log(inputRef.value);
    inputRef.value.focus();
})

</script>

<style scoped>

</style>