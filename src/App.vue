<template>
  <div id="app">
    <header>
      <nav class="main-navigation">
          <ul>
            <router-link tag="li" to="/">Home</router-link>
            <router-link tag="li" to="/about">About</router-link>
          </ul>
      </nav>
    </header>
    <vue-fr>
      <div class="loading-container">
          <div class="loading-screen"></div>
      </div>
      <router-view/>
    </vue-fr>
    <footer>
      <ul>
        <li><a href="http://crawford.ml">Crawford</a></li>
        <li>•</li>
        <li><a href="https://github.com/denyncrawford/vue-flyrutes" target="_blank">Find on Github</a></li>
      </ul>
    </footer>
  </div>
</template>

<style>
@import './assets/css/main.css';
</style>
