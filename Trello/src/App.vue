<template>
  <header>
    <!-- Bootstrap CSS -->
  </header>

  <RouterView />
  <div id="app" class="bg-light min-vh-100">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Twp - Trello Clone</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Accueil</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Fonctionnalités</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Tarifs</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">À propos</a>
            </li>
          </ul>
          <form class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Rechercher"
              aria-label="Search"
              v-model="search"
            />
            <button class="btn btn-outline-success" type="submit">Rechercher</button>
          </form>
        </div>
      </div>
    </nav>
    <RouterView :search="search" />
    <CrudCategorie/>
    <BoardView/>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import './assets/main.css'
import { RouterView } from 'vue-router'
import BoardView from './views/BoardView.vue'
import CrudCategorie from './components/CrudCategorie.vue'
const search = ref('')
</script>
