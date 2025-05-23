<script setup></script>

<template>
  <div>
    <div class="menu-fundo">
      <h1 class="menu-title">PET YOUR MORENO</h1>
      <div>
        <button class="menu-botao">JOGAR</button>
        <button class="menu-botao">OPÇÕES</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@500&family=Nunito:wght@400&display=swap");

.menu-fundo {
  background-color: #219ebc;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
}

.menu-title {
  font-family: "Fredoka", sans-serif;
  display: flex;
  justify-content: center;
  padding: 15svh 0;
  font-size: 50px;
  text-align: center;
  font-size: clamp(24px, 6vw, 50px);
}

.menu-botao {
  width: 200px;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 15px auto;
  font-family: "Fredoka", sans-serif;
  font-size: 20px;
  padding: 10px;
  border: none;
  border-radius: 10px;
  background-color: #8ecae6;
  color: #023047;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.menu-botao:hover {
  background-color: #83daf0;
  transform: scale(1.05);
}

.menu-botao:active {
  background-color: #bcebf7;
  transform: scale(0.95);
}
</style>
