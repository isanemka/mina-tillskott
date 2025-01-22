<template>
  <div class="flex justify-center">
    <div class="relative w-full max-w-md">
      <Combobox as="div" v-model="searchQuery">
        <div
          class="relative w-full cursor-default overflow-hidden rounded bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
        >
          <ComboboxInput
            class="w-full py-2 pl-3 pr-10 text-sm leading-5 text-gray-700 focus:ring-1"
            :displayValue="(supplement) => supplement"
            @change="searchQuery = $event.target.value"
          />
          <ComboboxButton
            class="absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <ChevronDownIcon
              class="h-5 w-5 text-gray-400"
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
              Hittar inget som matchar
            </div>

            <ComboboxOption
              v-for="supplement in filteredSupplements"
              :key="supplement.id"
              :value="supplement.name"
              v-slot="{ selected, active }"
            >
              <li
                class="relative cursor-default select-none py-2 pl-10 pr-4"
                :class="{
                  'bg-teal-600 text-white': active,
                  'text-gray-900': !active,
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
                  :class="{ 'text-white': active, 'text-teal-600': !active }"
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
import { ref, computed, onMounted } from 'vue';
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue';
import { CheckIcon, ChevronDownIcon } from '@heroicons/vue/20/solid';

const supplements = ref([]);
const searchQuery = ref('');

const filteredSupplements = computed(() => {
  if (!searchQuery.value) {
    return supplements.value;
  }
  return supplements.value.filter((supplement) =>
    supplement.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

async function fetchSupplements() {
  try {
    const response = await fetch('/api/supplements');
    if (!response.ok) throw new Error('Failed to fetch supplements');
    const data = await response.json();
    supplements.value = data;
  } catch (error) {
    console.error('Error fetching supplements:', error);
  }
}

onMounted(fetchSupplements);
</script>