<template>
  <div class="bg-gray-200 p-6 rounded shadow-lg max-w-lg mx-auto space-y-6">
    <h2 class="text-2xl font-bold text-gray-800">Lägg till ett nytt tillskott</h2>
    
    <!-- Select supplement -->
    <section v-if="!showSupplementName">
      <h3 class="text-lg text-black font-bold">Val av tillskott</h3>
      <label for="supplement" class="block text-sm font-medium text-gray-800">Välj ett tillskott:</label>
      <Combobox
        @update:selectedSupplement="handleSelectedSupplement"
      />
    </section>

    <!-- Name field for new supplement -->
    <section v-if="showSupplementName">
      <label for="name" class="block text-sm font-medium text-gray-800">Namn på tillskott:</label>
      <input
        id="name"
        type="text"
        v-model="form.name"
        placeholder="Skriv namnet på tillskottet"
        class="mt-1 w-full rounded border px-2 py-1"
      />
    </section>

    <!-- Details -->
    <section>
      <h3 class="text-lg text-black font-bold">Detaljer</h3>
      
      <div>
        <label for="form" class="block text-sm font-medium text-gray-800">Form:</label>
        <div class="text-black grid grid-cols-2 gap-2 sm:grid-cols-4">
          <label><input type="radio" value="Piller" v-model="form.form" /> Piller</label>
          <label><input type="radio" value="Pulver" v-model="form.form" /> Pulver</label>
          <label><input type="radio" value="Flytande" v-model="form.form" /> Flytande</label>
          <label><input type="radio" value="Annan" v-model="form.form" /> Annan</label>
        </div>
      </div>

      <div>
        <label for="dosage" class="block text-sm font-medium text-gray-800">Dosering:</label>
        <input
          id="dosage"
          type="number"
          v-model="form.dosage"
          :placeholder="form.form === 'Piller' ? 'Antal piller' : form.form === 'Pulver' ? 'Antal skopor' : 'Dosering'"
          class="mt-1 w-full rounded border px-2 py-1"
        />
      </div>

      <div>
        <label for="timeOfDay" class="block text-sm font-medium text-gray-800">Tidpunkt:</label>
        <select id="timeOfDay" v-model="form.time_of_day" class="w-full mt-1 rounded border px-2 py-1">
          <option value="Morgon">Morgon</option>
          <option value="Lunch">Lunch</option>
          <option value="Kväll">Kväll</option>
        </select>
      </div>

      <div>
        <label for="notification" class="block items-center text-sm font-medium text-gray-800">
          <input id="notification" type="checkbox" v-model="form.notification" class="mr-2" />
          Påminn mig att ta detta tillskott
        </label>
      </div>

      <div>
        <label for="lowStockAlert" class="block items-center text-sm font-medium text-gray-800">
          <input id="lowStockAlert" type="checkbox" v-model="form.low_stock_alert" class="mr-2" />
          Påminn mig när lagret är lågt
        </label>
      </div>

      <div v-if="form.low_stock_alert">
        <label for="stockSize" class="block text-sm font-medium text-gray-800">Lagersaldo:</label>
        <input
          id="stockSize"
          type="number"
          v-model="form.stock_size"
          placeholder="Antal i lager"
          class="mt-1 w-full rounded border px-2 py-1"
        />
      </div>
    </section>

    <!-- Submit button -->
    <button
      @click="submitForm"
      type="submit"
      class="w-full bg-blue-500 text-white px-4 py-2 rounded text-md font-medium hover:bg-blue-600 transition"
    >
      Lägg till tillskott
    </button>
    <button
      @click="props.handleShowAddSupplementForm(false), resetForm"
      type="reset"
      class="w-full bg-red-500 text-white px-4 py-2 rounded text-md font-medium hover:bg-red-600 transition"
    >
      Avbryt
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Combobox from './Combobox.vue';

const supplements = ref([]); // List of supplements
const selectedSupplement = ref(null); // User selected supplement
const showSupplementName = ref(false); // Show input for supplement name on new supplement

const form = ref({
  name: '',
  form: 'Piller',
  dosage: 1,
  time_of_day: 'Morgon',
  notification: false,
  stock_size: 0,
  low_stock_alert: false,
});

const props = defineProps({
  supplements: {
    type: Array,
    required: true,
  },
  handleShowAddSupplementForm: {
    type: Function,
    required: true,
  },
});

const emit = defineEmits(['submitSupplement', 'addExistingSupplement']);

onMounted(async () => {
  supplements.value = props.supplements;
});

function handleSelectedSupplement(selected) {
  selectedSupplement.value = selected;
  if (selected) {
    form.value.name = selected.name;
    showSupplementName.value = false;
  } else {
    form.value.name = '';
    showSupplementName.value = true;
  }
}

function submitForm() {
  if (!form.value.name || !form.value.dosage || !form.value.time_of_day) {
    alert('Alla fält måste fyllas i!');
    return;
  }

  if (selectedSupplement.value) {
    emit('addExistingSupplement', selectedSupplement.value, form.value);
    resetForm();
  } else {
    emit('submitSupplement', form.value);
    resetForm();
  }
}

function resetForm() {
  form.value = {
    name: '',
    form: 'Piller',
    dosage: 1,
    time_of_day: 'Morgon',
    notification: false,
    stock_size: 0,
    low_stock_alert: false,
  };
  selectedSupplement.value = null;
  showSupplementName.value = false;
}
</script>