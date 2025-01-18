<script setup>
import { ref, computed } from 'vue';

// A list of available supplements
const availableSupplements = [
  'Vitamin D',
  'Omega-3',
  'Magnesium',
  'Zink',
  'Multivitamin',
];

// Define supplements
const supplements = ref([
  { id: 1, name: 'Vitamin D', timeOfDay: 'Morgon', form: 'Piller', amount: 1, taken: false },
  { id: 2, name: 'Omega-3', timeOfDay: 'Lunch', form: 'Piller', amount: 2, taken: false },
  { id: 3, name: 'Magnesium', timeOfDay: 'Kväll', form: 'Pulver', amount: 1, taken: false },
]);

// Form for new supplement
const newSupplement = ref({
  name: '',
  form: 'Piller',
  amount: 1,
  timeOfDay: 'Morgon',
});

const showForm = ref(false);

function addSupplement() {
  if (newSupplement.value.name) {
    supplements.value.push({
      id: supplements.value.length + 1,
      ...newSupplement.value,
      taken: false,
    });

    // Reset form
    newSupplement.value.name = '';
    newSupplement.value.form = 'Piller';
    newSupplement.value.amount = 1;
    newSupplement.value.timeOfDay = 'Morgon';
    showForm.value = false; // Close form
  }
}

// Filter supplements based on time of day
const morningSupplements = computed(() =>
  supplements.value.filter(supplement => supplement.timeOfDay === 'Morgon')
);

const lunchSupplements = computed(() =>
  supplements.value.filter(supplement => supplement.timeOfDay === 'Lunch')
);

const eveningSupplements = computed(() =>
  supplements.value.filter(supplement => supplement.timeOfDay === 'Kväll')
);
</script>

<template>
  <div>
    <!-- Tiles  -->
    <div class="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
      <!-- Morning -->
      <div v-if="morningSupplements.length" class="p-4 bg-primary shadow rounded">
        <h2 class="text-lg font-semibold text-white mb-4">Morgon</h2>
        <div v-for="supplement in morningSupplements" :key="supplement.id" class="flex justify-between items-center font-lato mb-2">
          <span>{{ supplement.name }} ({{ supplement.form }}, {{ supplement.amount }} st)</span>
          <label>
            <input type="checkbox" v-model="supplement.taken" />
            <span class="ml-2">{{ supplement.taken ? 'Tagen' : 'Ej tagen' }}</span>
          </label>
        </div>
      </div>

      <!-- Lunch -->
      <div v-if="lunchSupplements.length" class="p-4 bg-primary shadow rounded">
        <h2 class="text-lg font-semibold text-white mb-4">Lunch</h2>
        <div v-for="supplement in lunchSupplements" :key="supplement.id" class="flex justify-between items-center font-lato mb-2">
          <span>{{ supplement.name }} ({{ supplement.form }}, {{ supplement.amount }} st)</span>
          <label>
            <input type="checkbox" v-model="supplement.taken" />
            <span class="ml-2">{{ supplement.taken ? 'Tagen' : 'Ej tagen' }}</span>
          </label>
        </div>
      </div>

      <!-- Evening -->
      <div v-if="eveningSupplements.length" class="p-4 bg-primary shadow rounded">
        <h2 class="text-lg font-semibold text-white mb-4">Kväll</h2>
        <div v-for="supplement in eveningSupplements" :key="supplement.id" class="flex justify-between items-center font-lato mb-2">
          <span>{{ supplement.name }} ({{ supplement.form }}, {{ supplement.amount }} st)</span>
          <label>
            <input type="checkbox" v-model="supplement.taken" />
            <span class="ml-2">{{ supplement.taken ? 'Tagen' : 'Ej tagen' }}</span>
          </label>
        </div>
      </div>
    </div>

    <!-- Add button -->
    <button @click="showForm = !showForm" class="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600">
      Lägg till tillskott
    </button>

    <!-- Form for adding supplements -->
    <div v-if="showForm" class="mt-4 p-4 bg-primary rounded shadow">
      <h3 class="text-lg font-semibold">Lägg till nytt tillskott</h3>
      <form @submit.prevent="addSupplement" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium">Tillskott:</label>
          <select id="name" v-model="newSupplement.name" class="w-full rounded border px-2 py-1">
            <option disabled value="">Välj ett tillskott</option>
            <option v-for="supplement in availableSupplements" :key="supplement" :value="supplement">
              {{ supplement }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium">Form:</label>
          <div class="space-x-4">
            <label>
              <input type="radio" value="Piller" v-model="newSupplement.form" /> Piller
            </label>
            <label>
              <input type="radio" value="Pulver" v-model="newSupplement.form" /> Pulver
            </label>
          </div>
        </div>

        <div>
          <label for="amount" class="block text-sm font-medium">Antal (vid varje tillfälle):</label>
          <input
            id="amount"
            type="number"
            min="1"
            v-model="newSupplement.amount"
            class="w-full rounded border px-2 py-1"
          />
        </div>

        <div>
          <label for="timeOfDay" class="block text-sm font-medium">Tidpunkt:</label>
          <select id="timeOfDay" v-model="newSupplement.timeOfDay" class="w-full rounded border px-2 py-1">
            <option value="Morgon">Morgon</option>
            <option value="Lunch">Lunch</option>
            <option value="Kväll">Kväll</option>
          </select>
        </div>

        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Spara
        </button>
      </form>
    </div>
  </div>
</template>