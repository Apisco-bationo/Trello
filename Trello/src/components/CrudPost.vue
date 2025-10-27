<template>
  <div class="container py-4">
    <!-- Formulaire -->
    <div class="card shadow-sm mb-4 border-0">
      <div class="card-body">
        <h5 class="fw-bold mb-3">Créer un post</h5>
        <input v-model="newTitle" type="text" class="form-control mb-2" placeholder="Titre" />
        <textarea v-model="newContent" class="form-control mb-2" placeholder="Contenu"></textarea>
        <select v-model="selectedCategory" class="form-control mb-2">
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
        </select>
        <button @click="addNewPost" class="btn btn-primary">Publier</button>
      </div>
    </div>

    <!-- Liste posts -->
    <div class="row">
      <div v-for="post in posts" :key="post.id" class="col-md-4">
        <div class="card mb-3 p-3 shadow-sm">
          <h6>{{ post.title.rendered }}</h6>
          <div v-html="post.content.rendered" class="small text-muted"></div>
          <div class="d-flex justify-content-end mt-2">
            <button class="btn btn-sm btn-outline-primary me-1" @click="editPost(post)">✏️</button>
            <button class="btn btn-sm btn-outline-danger" @click="deletePost(post.id)">🗑️</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { ref, onMounted } from "vue";
import { usePostStore } from "@/stores/post";

const postStore = usePostStore();
const { posts, categories, fetchPosts, fetchCategories, addPost, updatePost, deletePost } = postStore;

const newTitle = ref("");
const newContent = ref("");
const selectedCategory = ref(null);

onMounted(() => {
  fetchPosts();
  fetchCategories();
});

const addNewPost = async () => {
  if (!newTitle.value || !newContent.value) return;
  await addPost({
    title: newTitle.value,
    content: newContent.value,
    categories: selectedCategory.value ? [selectedCategory.value] : []
  });
  newTitle.value = "";
  newContent.value = "";
  selectedCategory.value = null;
};

const editPost = async (post) => {
  const nouveauTitre = prompt("Nouveau titre :", post.title.rendered);
  if (!nouveauTitre) return;
  await updatePost(post.id, { title: nouveauTitre });
};
</script>
