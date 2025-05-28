<script setup>
import PetStatus from "./PetStatus.vue";
import Moreno from "./Moreno.vue"
import { onMounted, ref } from "vue";
import background from "./backgrounds";

var sono = ref(100);
var fome = ref(100);
var diversao = ref(100);
var higiene = ref(100);

function menosStatus(status1, status2, status3, status4) {
  status1.value -= 8;
  status2.value -= 8;
  status3.value -= 8;
  status4.value -= 8;
}

onMounted(() => {
  setInterval(() => menosStatus(sono, fome, diversao, higiene), 3000);
});


</script>

<template>
  <div class="pet-fundo">
    <div class="background">
      <img src="backgroundPadrao.png" >
    </div>
    <div class="pet-title">Pet Your Moreno</div>
    <div class="pet-sprite">
    <Moreno :fome="fome" :diversao="diversao" :sono="sono" :higiene="higiene"></Moreno>
    </div>
    <div class="pet-status">
      <PetStatus :value="fome" icon="burger" />
      <PetStatus :value="diversao" icon="gamepad" />
      <PetStatus :value="higiene" icon="shower" />
      <PetStatus :value="sono" icon="bed" />
    </div>
    </div>
    
    
 
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@500&family=Nunito:wght@400&display=swap");

.pet-fundo {
  background-color: #219ebc;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
}

.pet-title {
  font-family: "Fredoka", sans-serif;
  padding: 10px;
  font-size: 40px;
}

.pet-status {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 90vh;
  gap: 20px;
}

.pet-sprite{
  position:absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
