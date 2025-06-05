<script setup>
import backgroundPadrao from "./backgrounds/backgroundPadrao.png";
import backgroundDormir from "./backgrounds/backgroundDormir.png";
import { computed } from "vue";
import PetActions from "./PetActions.vue";

const props = defineProps({
  dormindo: Boolean,
});

const fundoAtual = computed(() => {
  return props.dormindo ? backgroundDormir : backgroundPadrao;
});
</script>

<template>
  <transition name="fade">
    <img :src="fundoAtual" :key="fundoAtual" alt="Background" class="fundo" />
  </transition>
</template>

<style>
.fundo {
  position: absolute;
  z-index: -1;
  display: flex;
  justify-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
