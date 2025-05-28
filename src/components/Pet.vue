<script setup>
import PetStatus from "./PetStatus.vue";
import Moreno from "./Moreno.vue";
import { onMounted, ref } from "vue";
import PetActions from "./PetActions.vue";

const statusAtual = ref("fome");
var sono = ref(100);
var fome = ref(100);
var diversao = ref(100);
var higiene = ref(100);

function menosStatus(status1, status2, status3, status4) {
  status1.value -= 8;
  status2.value -= 8;
  status3.value -= 8;
  status4.value -= 8;
  console.log(statusAtual);
}

const actionRef = ref(null);
const petRef = ref(null);

onMounted(() => {
  setInterval(() => menosStatus(sono, fome, diversao, higiene), 3000);

  const actionEl = actionRef.value.actionItem;
  const petEl = petRef.value.morenoPet;

  actionEl.addEventListener("dragstart", (event) => {});

  petEl.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  petEl.addEventListener("drop", (event) => {
    event.preventDefault();
    if (statusAtual.value === "fome") {
      fome.value += 20;
    }
    if (statusAtual.value === "diversao") {
      diversao.value += 20;
    }
    if (statusAtual.value === "higiene") {
      higiene.value += 20;
    }
    if (statusAtual.value === "sono") {
      sono.value += 20;
    }
  });
});
</script>

<template>
  <div class="pet-fundo">
    <div class="pet-title">Pet Your Moreno</div>
    <div class="pet-sprite">
      <Moreno
        :fome="fome"
        :diversao="diversao"
        :sono="sono"
        :higiene="higiene"
        ref="petRef"
      ></Moreno>
    </div>
    <div class="pet-status">
      <PetStatus :value="fome" icon="burger" @click="statusAtual = 'fome'" />
      <PetStatus
        :value="diversao"
        icon="gamepad"
        @click="statusAtual = 'diversao'"
      />
      <PetStatus
        :value="higiene"
        icon="shower"
        @click="statusAtual = 'higiene'"
      />
      <PetStatus :value="sono" icon="bed" @click="statusAtual = 'sono'" />
    </div>
    <div>
      <PetActions ref="actionRef" :status="statusAtual" />
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
  font-size: large;
}

.pet-status {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 90vh;
  gap: 20px;
}

.pet-sprite {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
