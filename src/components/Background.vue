<script setup>
import backgroundCozinha from "./backgrounds/cozinha.png";
import backgroundDormir from "./backgrounds/quarto.png";
import backgroundDiversao from "./backgrounds/fun.png";
import backgroundBanho from "./backgrounds/banheiro.png";
import { computed } from "vue";
import PetActions from "./PetActions.vue";

const props = defineProps({
  dormindo: Boolean,
  comendo: Boolean,
  banho: Boolean,
  divertindo: Boolean,
});

const fundoAtual = computed(() => {
 
 if (props.dormindo){
  return backgroundDormir;
 } else if (props.banho){
  return backgroundBanho;
 } else if (props.divertindo){
  return backgroundDiversao;
 } else {
  return backgroundCozinha;
 }


});
</script>

<template>
  <transition name="fade">
    <img :src="fundoAtual" :key="fundoAtual" alt="Background" class="fundo" />
  </transition>
</template>

<style>
.fundo {
  widht: 1920px;
  height:1024px;
  position: absolute;
  z-index: -1;
  display: flex;
  justify-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  object-fit: cover;
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
