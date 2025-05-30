<script setup>

import backgroundPadrao from './backgrounds/backgroundPadrao.png';
import backgroundDormir from './backgrounds/backgroundDormir.png';
import {computed} from 'vue';

const props = defineProps ({
dormindo: Boolean,
});

const fundoAtual = computed(() =>{

    return props.dormindo? backgroundDormir : backgroundPadrao

});

</script>

<template>

<div>
    <img :src="fundoAtual" alt="Background" class="fundo">
</div>

</template>

<style>

.fundo{

position: absolute;
z-index: -1;
display: flex;
justify-items: center;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
}




</style>