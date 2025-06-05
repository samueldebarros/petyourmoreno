<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const emit = defineEmits(['back']);
const score = ref(0);
const timeLeft = ref(30);
const motos = ref([]);
const gameOver = ref(false);

let intervalId;
let timerId;

function spawnMoto() {
  const id = Date.now();
  const left = Math.random() * 90;
  const top = Math.random() * 80;
  const isBroken = Math.random() < 0.2; // porcentagem de chance de aparecer bicicletas

  motos.value.push({ id, left, top, isBroken });

  setTimeout(() => {
    motos.value = motos.value.filter(m => m.id !== id);
  }, 2000);
}

function handleClick(id, isBroken) {
  if (isBroken) {
    gameOver.value = true;
    clearInterval(intervalId);
    clearInterval(timerId);
    return;
  }

  score.value++;
  motos.value = motos.value.filter(m => m.id !== id);
}

onMounted(() => {
  intervalId = setInterval(spawnMoto, 700);
  timerId = setInterval(() => {
    if (timeLeft.value > 0 && !gameOver.value) {
      timeLeft.value--;
    } else {
      clearInterval(intervalId);
      clearInterval(timerId);
    }
  }, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
  clearInterval(timerId);
});
</script>

<template>
  <div class="mini-game-fundo">
    <div class="mini-game-header">
      <h2>Mini Game - Pegue as Motos!</h2>
      <p>Tempo restante: {{ timeLeft }}s</p>
      <p>Pontuação: {{ score }}</p>
    </div>

    <div class="mini-game-area">
      <img
        v-for="moto in motos"
        :key="moto.id"
        :src="moto.isBroken
          ? 'https://cdn-icons-png.flaticon.com/512/3199/3199975.png'
          : 'https://cdn-icons-png.flaticon.com/512/2829/2829065.png'"
        alt="moto"
        class="moto"
        :class="{ broken: moto.isBroken }"
        :style="{ top: moto.top + '%', left: moto.left + '%' }"
        @click="handleClick(moto.id, moto.isBroken)"
      />
    </div>

    <div v-if="timeLeft === 0 && !gameOver" class="mini-game-end">
      <h3>Fim de jogo!</h3>
      <p>Você pegou {{ score }} motos. Moreno ficou feliz!</p>
      <button class="menu-botao" @click="emit('back')">Voltar ao Menu</button>
    </div>

    <div v-if="gameOver" class="mini-game-end game-over">
      <h3>Game Over!</h3>
      <p>Moreno não gosta de bicicletas 😖</p>
      <button class="menu-botao" @click="emit('back')">Voltar ao Menu</button>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@500&display=swap");

.mini-game-fundo {
  background-color: #219ebc;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  font-family: 'Fredoka', sans-serif;
  color: white;
  text-align: center;
}

.mini-game-header {
  padding-top: 20px;
}

.mini-game-area {
  position: relative;
  width: 100%;
  height: 80%;
  background: #8ecae6;
  overflow: hidden;
}

.moto {
  position: absolute;
  width: 50px;
  height: 50px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.moto:hover {
  transform: scale(1.2);
}

.broken {
  filter: grayscale(100%) brightness(0.6);
}

.mini-game-end {
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  padding: 20px;
  border-radius: 12px;
}

.game-over h3 {
  color: #ff4d4d;
}
</style>