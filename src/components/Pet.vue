<script setup>
import { onMounted, ref, nextTick, watch, onUnmounted } from "vue";
import PetStatus from "./PetStatus.vue";
import Moreno from "./Moreno.vue";
import Background from "./Background.vue";
import PetActions from "./PetActions.vue";
import Store from "./Store.vue";
import MiniGame from "./MiniGame.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Variaveis e funções da Loja ----------------------------------------

const storeStatus = ref(0);
const itemEquipado = ref({ imagem: "lemon", nome: "Limão" });

function comprarProduto(index, qtd) {
  if (score.value >= produtos.value[index].preco) {
    produtos.value[index].owned += qtd;
    score.value -= produtos.value[index].preco;
  } else {
    alert("Você não tem moedas suficientes para comprar este item.");
  }
}

const produtos = ref([
  { nome: "Limão", imagem: "lemon", preco: 5, owned: 0 },
  { nome: "Pão", imagem: "bread-slice", preco: 10, owned: 0 },
  { nome: "Cookie", imagem: "cookie", preco: 15, owned: 0 },
  { nome: "Sorvete", imagem: "ice-cream", preco: 20, owned: 0 },
  { nome: "Pizza", imagem: "pizza-slice", preco: 25, owned: 0 },
  { nome: "Hamburguer", imagem: "burger", preco: 30, owned: 0 },
  { nome: "Moto", imagem: "motorcycle", preco: 999, owned: 0 },
]);

//-------------------------------------------------------------------------

// Variaveis e funções do Minigame e controle de Janelas

const mostrandoMiniGame = ref(false);
const score = ref(0);
const emit = defineEmits(["voltarMenu", "entrarMiniGame"]);
const gameOver = ref(false);

function atualizarScore(novaPontuacao) {
  score.value += novaPontuacao;
}

function entrarMiniGame() {
  mostrandoMiniGame.value = true;
}

function voltarParaMenu() {
  emit("voltarMenu");
}

function handleGameOver() {
  gameOver.value = true;
}

function reiniciarJogo() {
  window.location.reload();
}

//-----------------------------------------------------------------------------

// Variaveis e funções do Pet e seus Status

const statusAtual = ref("fome");
const actionRef = ref(null);
const petRef = ref(null);
const isHovering = ref(false);

const sono = ref(100);
const fome = ref(100);
const diversao = ref(100);
const higiene = ref(100);

function menosStatus(status1, status2, status3, status4) {
  status1.value -= 1;
  status2.value -= 1;
  status3.value -= 1;
  status4.value -= 1;
}

setInterval(() => menosStatus(sono, fome, diversao, higiene), 1500);

// Função das ações com o Pet

function setupPetListeners() {
  const actionEl = actionRef.value?.actionItem;
  const petEl = petRef.value?.morenoPet;

  if (!actionEl || !petEl) {
    console.error("Referências não carregadas:", { actionEl, petEl });
    return;
  }

  actionEl.addEventListener("dragstart", (event) => {
    console.log(itemEquipado);
  });
  petEl.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  petEl.addEventListener("dragenter", () => {
    isHovering.value = true;
  });

  petEl.addEventListener("dragleave", () => {
    isHovering.value = false;
  });

  petEl.addEventListener("drop", (event) => {
    event.preventDefault();
    isHovering.value = false;

    switch (statusAtual.value) {
      case "fome":
        const alimento = produtos.value.find(
          (p) => p.imagem === itemEquipado.value.imagem
        );
        if (alimento && alimento.owned > 0 && fome.value < 100) {
          somComendo();
          alimento.owned--;
          fome.value += alimento.preco * 2;
        } else {
          somNah();
        }
        break;
      case "sono":
        somDormindo();
        sono.value += 10;
        break;
    }
  });
}

// Aumenta o status de diversão e higiene quando o Pet está sendo interagido

setInterval(() => {
  if (isHovering.value) {
    switch (statusAtual.value) {
      case "diversao":
        diversao.value += 1;
        if (diversao.value > 100) {
          diversao.value = 100;
        }
        break;
      case "higiene":
        higiene.value += 1;
        if (higiene.value > 100) {
          higiene.value = 100;
        }
        break;
    }
  }
}, 100);

//-----------------------------------------------------------------------------
// Sons e musica

let musicaFundo;

function clickAbrir() {
  const audio = new Audio(
    new URL("./Sons/OpenClick.mp3", import.meta.url).href
  );
  audio.play();
}

function somComendo() {
  const audio = new Audio(new URL("./Sons/comendo.mp3", import.meta.url).href);
  audio.play();
}

function somNah() {
  const audio = new Audio(new URL("./Sons/Nah.mp3", import.meta.url).href);
  audio.play();
}

function somDormindo() {
  const audio = new Audio(new URL("./Sons/Thinking.mp3", import.meta.url).href);
  audio.play();
}

function somMaligno() {
  const audio = new Audio(
    new URL("./Sons/Evil Laugh.mp3", import.meta.url).href
  );
  audio.play();
}

function abrirLoja() {
  storeStatus.value = 1;
  clickAbrir();
}

//---------------------------------------------------------------------

// Onmounted (Toca a musica e inicia as interações com o Pet)

onMounted(() => {
  musicaFundo = new Audio(new URL("./Sons/TrapSong.mp3", import.meta.url).href);
  musicaFundo.loop = true;
  musicaFundo.volume = 0.5;
  musicaFundo.play();
  setupPetListeners();
});

// OnUnmounted (Para a musica)

onUnmounted(() => {
  if (musicaFundo) {
    musicaFundo.pause();
    musicaFundo = null;
  }
});

// Watch reativa as ações do Pet quando o minigame é fechado

watch(mostrandoMiniGame, async (novoValor) => {
  if (!novoValor) {
    await nextTick();
    setupPetListeners();
  }
});

defineProps({
  score: {
    type: Number,
    default: 0,
  },
});
</script>

<template>
  <div v-if="!mostrandoMiniGame">
    <div class="pet-fundo">
      <button
        class="voltar-botao"
        @click="voltarParaMenu"
        aria-label="Voltar ao menu"
      >
        ⚙️
      </button>

      <div class="pet-title">Pet Your Moreno</div>

      <button class="minigame-botao" @click="entrarMiniGame">
        🎮 Minigame
      </button>

      <div class="score-marker">
        <font-awesome-icon :icon="['fas', 'coins']" />
        {{ score }}
      </div>
      <div class="pet-sprite">
        <Moreno
          :fome="fome"
          :diversao="diversao"
          :sono="sono"
          :higiene="higiene"
          ref="petRef"
          @morreu="handleGameOver"
        />
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

      <Background
        :dormindo="statusAtual === 'sono'"
        :banho="statusAtual === 'higiene'"
        :divertindo="statusAtual === 'diversao'"
      />

      <div v-if="gameOver" class="game-over-overlay">
        <div class="game-over-content">
          <h1>VOCÊ ASSASSINOU MORENO</h1>
          <button @click="reiniciarJogo">Reiniciar</button>
        </div>
      </div>
    </div>

    <PetActions
      ref="actionRef"
      :status="statusAtual"
      :item-equipado="itemEquipado"
    />

    <div class="store-icon">
      <font-awesome-icon :icon="['fas', 'store']" @click="abrirLoja" />
    </div>

    <Store
      v-if="storeStatus === 1"
      :storeStatus="storeStatus"
      :produtos="produtos"
      @equiparItem="itemEquipado = $event"
      @comprar="comprarProduto"
      @fechar="storeStatus = 0"
    ></Store>
  </div>

  <MiniGame
    v-else
    @voltar="mostrandoMiniGame = false"
    @score="atualizarScore"
  />
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
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: contain;
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
  z-index: 1001;
}

.voltar-botao:hover {
  transform: rotate(20deg) scale(1.1);
}

.game-over-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.game-over-content {
  text-align: center;
  background: #333;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 0 10px #fff;
}

.game-over-content h1 {
  font-size: 48px;
  margin-bottom: 20px;
}

.game-over-content button {
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  background: #fff;
  color: #333;
  border: none;
  border-radius: 10px;
  transition: transform 0.2s ease;
}

.game-over-content button:hover {
  transform: scale(1.1);
}

.store-icon {
  position: fixed;
  font-size: 60px;
  bottom: 10px;
  left: 40px;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.store-icon:hover {
  transform: scale(1.05);
}

.store-icon:active {
  transform: scale(0.95);
}

.score-marker {
  position: absolute;
  top: 10px;
  left: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-weight: bold;
  font-size: 20px;
  padding: 10px 20px;
  border-radius: 12px;
  border: 2px solid white;
  z-index: 1000;
  font-family: "Fredoka", sans-serif;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
}

.minigame-botao {
  position: absolute;
  top: 70px;
  right: 10px;
  padding: 10px 20px;
  font-size: 18px;
  background: #add8e6;
  border: none;
  border-radius: 12px;
  color: white;
  cursor: pointer;
  font-family: "Fredoka", sans-serif;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease;
  z-index: 1001;
  color: black;
}

.minigame-botao:hover {
  transform: scale(1.1);
}

.minigame-botao:active {
  transform: scale(0.95);
}
</style>
