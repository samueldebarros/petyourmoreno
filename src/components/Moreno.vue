<script setup>
import { computed } from 'vue'
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


const spriteAtual = computed(()=> {

if (props.fome<30 && props.sono<30 && props.diversao<30 && props.higiene<30 ){
    return morenoMorrendo;
}
if (props.fome<30){
    return morenoFaminto;
} 
else if (props.sono<30){
    return morenoComSono;
}
else if (props.diversao<30){
    return morenoQuerendoCarinho;
}
else if (props.higiene<30){
    return morenoFedendo;
}
else {
    return morenoPadrao;
}

});

</script>

<template>

<div class="pet-sprite">

<img :src="spriteAtual" width="600" height="800">



</div>

</template>


<style>










</style>