<script setup>
import PetStatus from "./PetStatus.vue";
import Moreno from "./Moreno.vue";
import Background from "./Background.vue";
import PetActions from "./PetActions.vue";
import { onMounted, ref } from "vue";

const statusAtual = ref("fome");
const actionRef = ref(null);
const petRef = ref(null);

var sono = ref(100);
var fome = ref(100);
var diversao = ref(100);
var higiene = ref(100);

const emit = defineEmits(["voltarMenu"]);

function voltarParaMenu() {
  emit("voltarMenu");
}

function menosStatus(status1, status2, status3, status4) {
  status1.value -= 3;
  status2.value -= 3;
  status3.value -= 3;
  status4.value -= 3;
}

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
    <button
      class="voltar-botao"
      @click="voltarParaMenu"
      aria-label="Voltar ao menu"
    >
      ⚙️
    </button>

    <div class="pet-title">Pet Your Moreno</div>
    <div class="pet-sprite">
      <Moreno :fome="fome" :diversao="diversao" :sono="sono" :higiene="higiene">
      </Moreno>
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

    <Background :dormindo="bed"></Background>

    <PetActions ref="actionRef" :status="statusAtual" />
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
  color: white;
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

.voltar-botao {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
  color: white;
  transition: transform 0.2s ease;
}

.voltar-botao:hover {
  transform: rotate(20deg) scale(1.1);
}
</style>
