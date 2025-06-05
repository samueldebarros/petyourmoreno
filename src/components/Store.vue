<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Pet from "./Pet.vue";
import { onMounted, ref, computed } from "vue";
import StoreItem from "./StoreItem.vue";

const props = defineProps({
  storeStatus: Number,
});

const emit = defineEmits(["fechar"]);
</script>

<template>
  <div v-if="storeStatus === 1">
    <div class="store-container">
      <div class="store-header">
        <h2>Loja</h2>
        <button class="store-exit" @click="$emit('fechar')">Sair</button>
      </div>

      <div class="store">
        <StoreItem></StoreItem>
        <StoreItem></StoreItem>
        <StoreItem></StoreItem>
        <StoreItem></StoreItem>
        <StoreItem></StoreItem>
        <StoreItem></StoreItem>
        <StoreItem></StoreItem>
        <StoreItem></StoreItem>
        <StoreItem></StoreItem>
        <StoreItem></StoreItem>
        <StoreItem></StoreItem>
        <StoreItem></StoreItem>
      </div>
    </div>
  </div>
</template>

<style>
.store {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  max-height: 70vh;
  overflow-y: auto;
  padding-right: 15px;
}

.store-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  max-width: 850px;
  width: 90vw;
  background-color: rgba(49, 194, 151, 0.671);
  padding: 20px;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.store::-webkit-scrollbar {
  width: 8px;
}

.store::-webkit-scrollbar-track {
  background: transparent;
}

.store::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  border: 2px solid transparent;
  background-clip: content-box;
}

.store-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.store-header h2 {
  font-family: "Fredoka", sans-serif;
  margin: 0;
}

.store-exit {
  background-color: rgb(255, 100, 100);
  border: none;
  border-radius: 10px;
  padding: 5px 15px;
  cursor: pointer;
  font-family: "Fredoka", sans-serif;
  transition: transform 0.3s ease;
}

.store-exit:hover {
  transform: scale(1.05);
}
</style>
