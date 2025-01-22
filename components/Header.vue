<template>
  <Disclosure as="nav" class="bg-primary">
    <div class="mx-auto px-2 font-bebas-neue">
      <div class="relative flex h-16 items-center justify-between">
        <div class="flex flex-1 items-center justify-center">
          <div class="flex shrink-0 items-center">
            <img class="h-16 w-auto" src="../assets/logo.png" alt="Mina Tillskott Logo" />
          </div>
          <div class="absolute inset-y-0 right-0 flex items-center pr-2">
            
            <!-- Profile dropdown -->
            <Menu as="div" class="relative ml-3">
              <div>
                <MenuButton class="relative flex rounded-full">
                  <UserIcon class="h-10 w-auto" />
                  <span class="absolute -inset-1.5" />
                  <span class="sr-only">Open user menu</span>
                </MenuButton>
              </div>
              <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <MenuItem v-slot="{ active }">
                    <a href="/profile" :class="[active ? 'bg-gray-100 outline-none' : '', 'block px-4 py-2 text-sm text-gray-700']">Min profil</a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <a href="/settings" :class="[active ? 'bg-gray-100 outline-none' : '', 'block px-4 py-2 text-sm text-gray-700']">Inställningar</a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <a href="/history" :class="[active ? 'bg-gray-100 outline-none' : '', 'block px-4 py-2 text-sm text-gray-700']">Historik</a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <a href="./" :class="[active ? 'bg-gray-100 outline-none' : '', 'block px-4 py-2 text-sm text-gray-700']">Logga ut</a>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  </Disclosure>
</template>

<script setup>
import { Disclosure, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { UserIcon } from '@heroicons/vue/24/outline'
</script>

<style>
.bg-primary {
  background-color: #2698FD;
}
</style>