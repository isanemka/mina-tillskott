<script setup>
import { ref, onMounted } from 'vue';
import Combobox from './components/Combobox.vue';
import { useNuxtApp } from '#app';

// Reactive variables
const userId = ref(null); // User ID from Supabase
const userSupplements = ref([]); // List of user supplements
const showForm = ref(false); // Control form visibility

// Data for adding a new supplement
const newSupplement = ref({
  name: '',
  form: 'Piller',
  dosage: 1,
  time_of_day: 'Morgon',
  notification: false,
  stock_size: 0,
  low_stock_alert: false,
});

async function fetchUserSupplements() {
  const { $supabase } = useNuxtApp();

  try {
    // Fetch user data
    const { data: user, error: userError } = await $supabase.auth.getUser();

    if (userError || !user) {
      console.error('User not authenticated:', userError);
      return;
    }

    userId.value = user.user.id;

    // Fetch user supplements
    const { data, error } = await $supabase
      .from('user_supplements')
      .select('*')
      .eq('user_id', userId.value);

    if (error) {
      console.error('Error fetching user supplements:', error.message);
      return;
    }

    userSupplements.value = data;
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Lägg till ett nytt tillskott för användaren
async function addUserSupplement(selectedSupplement = null) {
  const { $supabase } = useNuxtApp();

  try {
    const supplementData = selectedSupplement
      ? {
          name: selectedSupplement.name,
          form: newSupplement.value.form,
          dosage: newSupplement.value.dosage,
          time_of_day: newSupplement.value.time_of_day,
          notification: newSupplement.value.notification,
          stock_size: newSupplement.value.stock_size,
          low_stock_alert: newSupplement.value.low_stock_alert,
          user_id: userId.value,
        }
      : { ...newSupplement.value, user_id: userId.value };

    const { error } = await $supabase
      .from('user_supplements')
      .insert(supplementData);

    if (error) throw error;

    // Add the new supplement to the list
    userSupplements.value.push(supplementData);

    // Reset the form
    newSupplement.value = {
      name: '',
      form: 'Piller',
      dosage: 1,
      time_of_day: 'Morgon',
      notification: false,
      stock_size: 0,
      low_stock_alert: false,
    };
    showForm.value = false; // Close the form
    alert('Tillskott tillagt!');
  } catch (error) {
    console.error('Error adding user supplement:', error);
  }
}

onMounted(fetchUserSupplements);
</script>

<template>
  <div class="font-lato">
    <!-- Search component -->
    <Combobox />

    <!-- List of user suppelemets -->
    <div v-if="userSupplements.length > 0" class="mt-4">
      <h2 class="text-lg font-bebas-neue font-bold">Mina tillskott</h2>
      <ul>
        <li
          v-for="supplement in userSupplements"
          :key="supplement.id"
          class="mb-2 bg-gray-900 p-4 rounded shadow"
        >
          <h3 class="text-md font-semibold">{{ supplement.name }}</h3>
          <p>Form: {{ supplement.form }}</p>
          <p>Dosering: {{ supplement.dosage }}</p>
          <p>Tidpunkt: {{ supplement.time_of_day }}</p>
        </li>
      </ul>
    </div>

    <!-- If user does not have any supplements -->
    <div v-else class="mt-4 text-center">
      <p class="text-gray-500">Du har inga tillskott tillagda.</p>
      <button
        @click="showForm = true"
        class="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600"
      >
        Lägg till nytt tillskott
      </button>
    </div>

    <!-- Form for adding new supplement -->
    <div v-if="showForm" class="mt-4 p-4 bg-primary rounded shadow">
      <h3 class="text-lg font-semibold text-white">Lägg till nytt tillskott</h3>
      <form @submit.prevent="addUserSupplement" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-white">Tillskott:</label>
          <input
            id="name"
            type="text"
            v-model="newSupplement.name"
            class="w-full rounded border px-2 py-1"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-white">Form:</label>
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
          <label for="dosage" class="block text-sm font-medium text-white">Dosering:</label>
          <input
            id="dosage"
            type="number"
            min="1"
            v-model="newSupplement.dosage"
            class="w-full rounded border px-2 py-1"
          />
        </div>

        <div>
          <label for="timeOfDay" class="block text-sm font-medium text-white">Tidpunkt:</label>
          <select id="timeOfDay" v-model="newSupplement.time_of_day" class="w-full rounded border px-2 py-1">
            <option value="Morgon">Morgon</option>
            <option value="Lunch">Lunch</option>
            <option value="Kväll">Kväll</option>
          </select>
        </div>

        <div>
          <label for="notification" class="block text-sm font-medium text-white">Notis:</label>
          <input type="checkbox" v-model="newSupplement.notification" />
        </div>

        <button
          type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Spara
        </button>
      </form>
    </div>
  </div>
</template>