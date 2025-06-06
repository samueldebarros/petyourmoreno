<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Pet from "./Pet.vue";
import { onMounted, ref, computed } from "vue";

const emit = defineEmits(["equipar"]);

function comprarItem() {
  emit("comprar", 1);
}

function equiparItem() {
  emit("equipar", { nome: props.nome, imagem: props.imagem });
}

const props = defineProps({
  nome: String,
  imagem: String,
  preco: Number,
  owned: Number,
});
</script>

<template>
  <div class="store-item">
    <div class="store-item__image">
      <font-awesome-icon :icon="['fas', imagem]" />
    </div>
    <h3>{{ nome }}(x{{ owned }})</h3>
    <div class="store-item__price--container">
      <h5 class="store-item__price">Preço: {{ preco }}</h5>
      <font-awesome-icon
        style="color: rgb(202, 202, 26)"
        :icon="['fas', 'coins']"
      />
    </div>
    <button class="store-item__button" v-if="owned === 0" @click="comprarItem">
      Comprar
    </button>
    <div class="store-item__button--container" v-else>
      <button class="store-item__button" @click="comprarItem">Comprar</button>
      <button class="store-item__button" @click="equiparItem">Equipar</button>
    </div>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@500&family=Nunito:wght@400&display=swap");

.store-item {
  display: flex;
  flex-direction: column;
  width: 200px;
  min-height: 200px;
  background-color: #dad7cd;
  border-radius: 15px;
  margin: 10px;
  padding: 10px;
  gap: 5px;
  text-align: center;
  font-family: "Fredoka", sans-serif;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.store-item:hover {
  transform: scale(1.05);
  background-color: #efd8c5;
}

.store-item__image {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  font-size: 60px;
}

.store-item__button {
  height: 30px;
  border: none;
  background-color: #2a9d8f;
  border-radius: 10px;
  width: 100%;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.store-item__button:hover {
  transform: scale(1.05);
  background-color: #1e7368;
}

.store-item__price {
  margin: 0;
  font-size: 14px;
}

.store-item__price--container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 5px;
}

.store-item__button:active {
  transform: scale(0.95);
  background-color: rgb(48, 228, 48);
}

.store-item__button--container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  width: 100%;
}
</style>
