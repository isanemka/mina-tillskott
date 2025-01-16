<template>
  <div>
    <h2>Inställningar</h2>
    <form>
      <label>
        <input type="checkbox" v-model="notificationsEnabled" />
        Aktivera pushnotiser
      </label>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const notificationsEnabled = ref(false);
</script>