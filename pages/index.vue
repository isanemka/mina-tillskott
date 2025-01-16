<template>
  <div class="font-lato">
    <h2 class="text-xl font-bold font-bebas-neue">Dagens Tillskott</h2>
    <ul>
      <li v-for="supplement in supplements" :key="supplement.id" class="flex items-center space-x-4">
        <input type="checkbox" v-model="supplement.taken" class="rounded border-gray-300" />
        <span>{{ supplement.name }}</span>
        <span class="text-sm text-gray-500">{{ supplement.time }}</span>
      </li>
    </ul>

    <div class="mt-6">
      <h3 class="text-lg font-semibold">Lägg till nytt tillskott</h3>
      <form @submit.prevent="addSupplement" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium">Namn:</label>
          <input
            id="name"
            type="text"
            v-model="newSupplement.name"
            placeholder="T.ex. Omega-3"
            required
            class="w-auto rounded border border-gray-300 px-2 py-1"
          />
        </div>

        <div>
          <label for="time" class="block text-sm font-medium">Tid:</label>
          <input
            id="time"
            type="time"
            v-model="newSupplement.time"
            required
            class="rounded border border-gray-300 px-2 py-1"
          />
        </div>

        <button
          type="submit"
          class="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Lägg till
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const supplements = ref([
  { id: 1, name: 'Vitamin D', time: '08:00', taken: false },
  { id: 2, name: 'Kreatin', time: '12:00', taken: false },
]);

const newSupplement = ref({
  name: '',
  time: '',
  pill: false,
  pills: 0,
  powder: false,
  scoups: 0,
  liquid: false,
  ml: 0,
  notification: false,
});

function addSupplement() {
  if (newSupplement.value.name && newSupplement.value.time) {
    supplements.value.push({
      id: supplements.value.length + 1, 
      name: newSupplement.value.name,
      time: newSupplement.value.time,
      taken: false,
    });
    newSupplement.value.name = '';
    newSupplement.value.time = '';
  }
}
</script>