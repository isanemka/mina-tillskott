<template>
  <div class="font-lato">
    <h2>Historik</h2>
    <p>Här kan du se tidigare intagna tillskott.</p>
    <ul>
      <li v-for="log in history" :key="log.id">
        {{ log.date }}: {{ log.supplement }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const history = ref([
  { id: 1, date: '2025-01-15', supplement: 'Vitamin D' },
  { id: 2, date: '2025-01-14', supplement: 'Kreatin' },
]);
</script>