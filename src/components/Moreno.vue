<script setup>
import { computed, ref } from "vue";
import morenoComSono from "./morenoSprites/morenoComSono.png";
import morenoFaminto from "./morenoSprites/morenoFaminto.png";
import morenoQuerendoCarinho from "./morenoSprites/morenoQuerendoCarinho.png";
import morenoFedendo from "./morenoSprites/morenoFedendo.png";
import morenoPadrao from "./morenoSprites/morenoFeliz.png";
import morenoMorrendo from "./morenoSprites/morenoMorrendo.png";

const morenoPet = ref(null);
defineExpose({ morenoPet });

const props = defineProps({
  fome: Number,
  sono: Number,
  higiene: Number,
  diversao: Number,
});

const spriteAtual = computed(() => {
  if (
    props.fome < 30 &&
    props.sono < 30 &&
    props.diversao < 30 &&
    props.higiene < 30
  ) {
    return morenoMorrendo;
  }
  if (props.fome < 30) {
    return morenoFaminto;
  } else if (props.sono < 30) {
    return morenoComSono;
  } else if (props.diversao < 30) {
    return morenoQuerendoCarinho;
  } else if (props.higiene < 30) {
    return morenoFedendo;
  } else {
    return morenoPadrao;
  }
});
</script>

<template>


  
  <div class="container-sprite">
    <transition name="fade" mode="out-in">
    <img class="pet-sprite"
      :src="spriteAtual"
      :key="spriteAtual"
      width="600"
      height="800"
      alt="Sprite"
      ref="morenoPet"
    />
    </transition>
    </div>

</template>


<style>

.fade-enter-active, .fade-leave-active{
  transition: opacity 0.05s ease;
}

.fade-enter-from, .fade-leave-to{
  opacity: 0;
}

.fade-enter-to, .fade-leave-from{
  opacity: 1;
}

.container-sprite{
  width: 120%;
  height: 120%;
  position: absolute;
  display: flex; 
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.pet-sprite {
  top: 0;
  left: 0;
  object-fit: contain;
}

</style>
