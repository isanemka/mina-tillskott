<template>
  <div class="flex">
    <div class="relative w-full">
      <Combobox as="div" v-model="selectedSupplement">
        <div
          class="relative w-full cursor-default overflow-hidden rounded border bg-white text-left shadow-md sm:text-sm"
        >
          <ComboboxInput
            class="w-full py-2 pl-3 pr-10 text-sm leading-5 text-white"
            :displayValue="(supplement) => supplement ? supplement.name : ''"
            @change="searchQuery = $event.target.value"
            :placeholder="'Sök efter tillskott'"
          />
          <ComboboxButton
            class="absolute inset-y-0 right-0 flex items-center"
          >
            <ChevronDownIcon
              class="h-5 w-5 text-white"
              aria-hidden="true"
            />
          </ComboboxButton>
        </div>
        <TransitionRoot
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          @after-leave="searchQuery = ''"
        >
          <ComboboxOptions
            class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
          >
            <div
              v-if="filteredSupplements.length === 0 && searchQuery !== ''"
              class="relative cursor-default select-none px-4 py-2 text-gray-700"
            >
              Inga tillskott hittades för "{{ searchQuery }}".<br />
              <button
                @click="handleShowSupplementName"
                class="bg-blue-600 text-white px-4 py-2 mt-3 rounded hover:bg-blue-400"
              >
                Lägg till eget tillskott
              </button>
            </div>

            <ComboboxOption
              v-for="supplement in filteredSupplements"
              :key="supplement.id"
              :value="supplement"
              v-slot="{ selected }"
            >
              <li
                class="relative cursor-default select-none py-2 pl-10 pr-4"
                :class="{
                  'bg-indigo-600 text-white': selected,
                  'bg-white text-black': !selected,
                }"
              >
                <span
                  class="block truncate"
                  :class="{ 'font-medium': selected, 'font-normal': !selected }"
                >
                  {{ supplement.name }}
                </span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </TransitionRoot>
      </Combobox>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useNuxtApp } from '#app';
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue';
import { CheckIcon, ChevronDownIcon } from '@heroicons/vue/20/solid';
import { fetchSupplements } from '../utils/supabase';

const emit = defineEmits(['update:selectedSupplement']);

const supplements = ref([]);
const searchQuery = ref('');
const selectedSupplement = ref(null);
const showSupplementName = ref(false);

// Computed property to filter supplements based on search query
const filteredSupplements = computed(() => {
  if (!searchQuery.value) {
    return supplements.value;
  }
  return supplements.value.filter((supplement) =>
    supplement.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Function to load supplements from the database
async function loadSupplements() {
  try {
    supplements.value = await fetchSupplements();
  } catch (error) {
    console.error('Error fetching supplements:', error);
  }
}

// Function to handle showing the supplement name input field
function handleShowSupplementName() {
  showSupplementName.value = true;
  emit('update:selectedSupplement', null);
}

// Watcher to emit the selected supplement whenever it changes
watch(selectedSupplement, (newValue) => {
  emit('update:selectedSupplement', newValue);
});

// Load supplements when the component is mounted
onMounted(() => {
  loadSupplements();
});
</script>