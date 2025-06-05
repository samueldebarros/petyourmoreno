<script setup>
import { computed, watch } from 'vue'
import morenoComSono from './morenoSprites/morenoComSono.png'
import morenoFaminto from './morenoSprites/morenoFaminto.png'
import morenoQuerendoCarinho from './morenoSprites/morenoQuerendoCarinho.png'
import morenoFedendo from './morenoSprites/morenoFedendo.png'
import morenoPadrao from './morenoSprites/morenoFeliz.png'
import morenoMorrendo from './morenoSprites/morenoMorrendo.png'

const props = defineProps({
  fome: Number,
  sono: Number,
  higiene: Number,
  diversao: Number,
})

const emit = defineEmits(['morreu'])

const spriteAtual = computed(() => {
  if (props.fome <= 0 && props.sono <= 0 && props.diversao <= 0 && props.higiene <= 0) {
    return morenoMorrendo
  }
  if (props.fome < 30) {
    return morenoFaminto
  } else if (props.sono < 30) {
    return morenoComSono
  } else if (props.diversao < 30) {
    return morenoQuerendoCarinho
  } else if (props.higiene < 30) {
    return morenoFedendo
  } else {
    return morenoPadrao
  }
})

watch(() => [props.fome, props.sono, props.diversao, props.higiene], ([fome, sono, diversao, higiene]) => {
  if (fome <= 0 && sono <= 0 && diversao <= 0 && higiene <= 0) {
    emit('morreu')
  }
})
</script>

<template>



  <div class="container-sprite">
    <img class="pet-sprite"
      :src="spriteAtual"
      width="600"
      height="800"
      alt="Sprite"
      ref="morenoPet"
    />
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
