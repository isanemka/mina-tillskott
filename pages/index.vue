<template>
  <div class="font-lato w-full max-w-5xl mx-auto p-4">
    <!-- List of user supplements -->
    <div class="mt-4 grid gap-4">
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
          <p>Notifikation: {{ supplement.notification ? 'Ja' : 'Nej' }}</p>
          <p>Lagersaldo: {{ supplement.stock_size }}</p>
          <p>Lågt lagersaldo: {{ supplement.low_stock_alert ? 'Ja' : 'Nej' }}</p>
        </li>
      </ul>
    </div>

    <!-- If user does not have any supplements -->
    <div v-if="!userHasSupplements" class="mt-4 text-center">
      <p class="text-gray-500">Du har inte lagt till några tillskott.</p>
    </div>

    <div>
      <button 
        v-if="!showAddSupplementForm"
        @click="showAddSupplementForm = !showAddSupplementForm" 
        class="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600"
      >
        Lägg till nytt tillskott
      </button>
    </div>
    <!-- Form for adding new supplement -->
    <div 
      v-if="showAddSupplementForm"
      class="mt-4">
      <SupplementForm 
        :supplements="allSupplements"
        :handleShowAddSupplementForm="handleShowAddSupplementForm"
        @submitSupplement="createAndAddNewSupplement"
        @addExistingSupplement="addExistingSupplement"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SupplementForm from '../components/SupplementForm.vue';
import { useNuxtApp } from '#app';

const userId = ref(null);
const allSupplements = ref([]);
const userSupplements = ref([]);
const showAddSupplementForm = ref(false);
let userHasSupplements = false;

const newSupplement = ref({
  name: '',
  form: 'Piller',
  dosage: 1,
  time_of_day: 'Morgon',
  notification: false,
  stock_size: 0,
  low_stock_alert: false,
});

// Function to fetch user supplements from the database
async function fetchUserSupplements() {
  const { $supabase } = useNuxtApp();

  try {
    const { data: user, error: userError } = await $supabase.auth.getUser();

    if (userError || !user) {
      console.error('User not authenticated:', userError);
      return;
    }

    userId.value = user.user.id;

    const { data, error } = await $supabase
      .from('user_supplements')
      .select('*')
      .eq('user_id', userId.value);

    if (error) {
      console.error('Error fetching user supplements:', error.message);
      return;
    }

    userSupplements.value = data;

    if (data.length > 0) {
      userHasSupplements = true;
    }
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Function to add an existing supplement to the user's supplements
async function addExistingSupplement(selectedSupplement, userDetails) {
  const { $supabase } = useNuxtApp();

  try {
    const userId = (await $supabase.auth.getUser()).data?.user?.id;
    if (!userId) throw new Error('Användare inte inloggad.');

    const payload = {
      ...userDetails,
      user_id: userId,
      name: selectedSupplement.name,
    };

    const { data, error: insertError } = await $supabase
      .from('user_supplements')
      .insert(payload)
      .select()
      .single();

    if (insertError) throw insertError;

    userSupplements.value.push(data);
    alert(`Tillskottet "${selectedSupplement.name}" har lagts till!`);
  } catch (error) {
    console.error('Error adding existing supplement:', error.message);
    alert('Misslyckades med att lägga till tillskottet.');
  }
}

// Function to create and add a new supplement to the user's supplements
async function createAndAddNewSupplement(newSupplementDetails) {
  const { $supabase } = useNuxtApp();

  try {
    const userId = (await $supabase.auth.getUser()).data?.user?.id;
    if (!userId) throw new Error('Användare inte inloggad.');

    const payload = {
      ...newSupplementDetails,
      user_id: userId,
    };

    const { data, error: insertError } = await $supabase
      .from('user_supplements')
      .insert(payload)
      .select()
      .single();

    if (insertError) throw insertError;

    userSupplements.value.push(data);
    alert(`Det nya tillskottet "${newSupplementDetails.name}" har skapats och lagts till!`);
  } catch (error) {
    console.error('Error creating and adding new supplement:', error.message);
    alert('Misslyckades med att skapa och lägga till tillskottet.');
  }
}

// Function to handle showing the add supplement form
function handleShowAddSupplementForm(value) {
  showAddSupplementForm.value = value;
}

onMounted(async () => {
  await fetchUserSupplements();
  const { $supabase } = useNuxtApp();
  const { data, error } = await $supabase.from('supplements').select('*');
  if (error) {
    console.error('Error fetching supplements:', error.message);
    return;
  }
  allSupplements.value = data;
});
</script>