<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Pet from "./Pet.vue";
import { onMounted, ref, computed } from "vue";

const actionItem = ref(null);
defineExpose({ actionItem });

const props = defineProps({
  status: String,
  itemEquipado: Object,
});
const actionImage = computed(() => {
  if (
    props.status === "fome" &&
    props.itemEquipado &&
    props.itemEquipado.imagem
  ) {
    return props.itemEquipado.imagem;
  }
  switch (props.status) {
    case "diversao":
      return "hand";
    case "higiene":
      return "soap";
    case "sono":
      return "bed";
    default:
      return "lemon";
  }
});
</script>

<template>
  <div id="action" ref="actionItem" draggable="true">
    <font-awesome-icon :icon="['fas', actionImage]" />
  </div>
</template>

<style>
#action {
  position: fixed;
  bottom: 20px;
  right: 50px;
  font-size: 50px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

#action:hover {
  transform: scale(1.05);
}

#action:active {
  cursor: grab;
}
</style>
