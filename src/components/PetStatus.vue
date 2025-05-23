<template>
  <div class="petStatus-container">
    <div
      v-if="value >= 30"
      class="petStatus-fillG"
      :style="{ clipPath: `inset(${100 - value}% 0 0 0)` }"
    ></div>
    <div
      v-else
      class="petStatus-fillR"
      :style="{ clipPath: `inset(${100 - value}% 0 0 0)` }"
    ></div>
    <div class="petStatus-bg"></div>

    <div class="petStatus-icon">
      <font-awesome-icon :icon="['fas', icon]" />
    </div>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const props = defineProps({
  value: { type: Number, required: true },
  icon: { type: String, default: "burger" },
});
</script>

<style scoped>
:root {
  --_statusGreen: rgb(60, 185, 60);
  --_statusRed: rgb(255, 27, 27);
}

.petStatus-container {
  position: relative;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.petStatus-container:hover {
  box-shadow: 5px 3px 7px rgba(59, 59, 59, 0.274);
  transform: scale(1.05);
}

.petStatus-container:active {
  box-shadow: 5px 3px 7px rgba(59, 59, 59, 0.274);
  transform: scale(0.95);
}

.petStatus-fillG {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 255, 0);
  transition: clip-path 0.3s ease;
  z-index: 2;
}

.petStatus-fillR {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(233, 77, 77);
  transition: clip-path 0.3s ease;
  z-index: 2;
}

.petStatus-bg {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #e0e0e0; /* cinza claro */
  z-index: 1;
}

.petStatus-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 32px;
  color: #023047;
  z-index: 3;
}
</style>
