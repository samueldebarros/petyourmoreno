<script setup>
import {ref} from 'vue'
import Pet from './Pet.vue'
import gifMoreno from './imagens/morenoPilotando.gif'

const telaAtual = ref('menu')

const scoreTotal = ref(0);

function iniciarJogo() {
  telaAtual.value = 'jogo'
}
</script>
<template>
  <div>

    <div v-if="telaAtual === 'menu'" class="menu-fundo">
      <img :src=gifMoreno class="gifDoMoreno">
      <h1 class="menu-title">PET YOUR MORENO</h1>
      <div class="menu-linha"></div>
      <div class="bolha" style="width: 200px; height: 200px; top: 10%; left: 20%;"></div>
      <div class="bolha" style="width: 150px; height: 150px; bottom: 15%; right: 10%;"></div>


      <button class="menu-botao" @click="iniciarJogo">
        🎮 JOGAR
      </button>
      <button class="menu-botao">
        ⚙️ OPÇÕES
      </button>
    </div>

    <Pet
        v-if="telaAtual === 'jogo'"
        :score="scoreTotal"
        @voltarMenu="telaAtual = 'menu'"
    />
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@500&family=Nunito:wght@400&display=swap");

.menu-fundo {
  background: linear-gradient(#219ebc, #9acbe2);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  animation: fadeIn 1s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes flutuar {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
}

.bolha {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  filter: blur(30px);
  animation: flutuar 6s ease-in-out infinite;
}

.menu-fundo::before {
  content: '';
  position: absolute;
  width: 300px;
  height: 300px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  top: 10%;
  left: -100px;
  filter: blur(50px);
}

.menu-title {
  font-family: "Fredoka", sans-serif;
  display: flex;
  justify-content: center;
  padding: 0px 0px 0px 0px;
  text-align: center;
  font-size: clamp(24px, 6vw, 50px);
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  margin-bottom: 3px;
}

.menu-botao {
  width: 200px;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 0px 0px 0px;
  font-family: "Fredoka", sans-serif;
  font-size: 20px;
  padding: 10px;
  border: 2px solid #219ebc;;
  border-radius: 10px;
  color: #023047;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  background: linear-gradient(45deg, #8ecae6, #83daf0);
  box-shadow: 4px 4px 10px rgba(2, 48, 71, 0.2);
}

.menu-botao:hover {
  background-color: #83daf0;
  transform: scale(1.05) rotate(-2deg);
  animation: pulse 0.6s infinite;
}

.menu-botao:active {
  background-color: #bcebf7;
  transform: scale(0.95);
  transform: scale(0.95);
  filter: brightness(1.1);
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.menu-linha {
  width: 60%;
  height: 2px;
  background: rgba(255, 255, 255, 0.3);
  margin: 20px auto;
  border-radius: 2px;
}

.gifDoMoreno {
  width: 350px;
  height: 250px;
  object-fit: contain;
  z-index: 2;
  display: flex;
}
</style>
