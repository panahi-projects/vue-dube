<script setup lang="ts">
let value = '';
</script>
<template>
  <div class="my-textbox">
    <label for="sampleText">Label:</label>
    <input id="sampleText" type="text" name="sampleTextbox" v-model="value" />
  </div>
</template>
