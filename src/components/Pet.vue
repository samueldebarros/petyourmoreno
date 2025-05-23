<script setup>
import PetStatus from "./PetStatus.vue";
import { onMounted, ref } from "vue";

let sono = ref(100);
let fome = ref(100);
let diversao = ref(100);
let higiene = ref(100);

function menosStatus(status1, status2, status3, status4) {
  status1.value -= 1;
  status2.value -= 1;
  status3.value -= 1;
  status4.value -= 1;
}

onMounted(() => {
  setInterval(() => menosStatus(sono, fome, diversao, higiene), 3000);
});
</script>

<template>
  <div class="pet-fundo">
    <div class="pet-title">Pet Your Moreno</div>

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
}

.pet-title {
  font-family: "Fredoka", sans-serif;
  padding: 10px;
  font-size: large;
}

.pet-status {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 90vh;
  gap: 20px;
}
</style>
