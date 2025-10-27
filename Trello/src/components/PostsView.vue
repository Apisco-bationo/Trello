<template>
  <div class="container-fluid mt-4">
    <!-- Formulaire ajout -->
    <div class="card shadow-sm mb-4 border-0">
      <div class="card-body">
        <h5 class="fw-bold mb-3">Ajouter un Post</h5>
        <input v-model="newTitle" type="text" class="form-control mb-2" placeholder="Titre" />
        <textarea v-model="newContent" class="form-control mb-2" placeholder="Contenu"></textarea>
        <button @click="addNewPost" class="btn btn-primary">Publier</button>
      </div>
    </div>

    <div class="row">
      <!-- Colonne par catégorie -->
      <div
        class="col-12 col-md-4 mb-4"
        v-for="category in categories"
        :key="category.id"
      >
        <h4 class="mb-3">{{ category.name }}</h4>

        <CrudPost
          v-for="post in posts.filter(p => p.categories.includes(category.id))"
          :key="post.id"
          :post="post"
          :categories="categories"
          @comment="openComments"
          @edit="editPost"
          @delete="deletePostHandler"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { usePostStore } from "../stores/usePostStore";
import CrudPost from "./CrudPost.vue";
import axios from "axios";

const postStore = usePostStore();
const { posts, fetchPosts, addPost, updatePost, deletePost } = postStore;

// Formulaire ajout
const newTitle = ref("");
const newContent = ref("");

// Catégories dynamiques
const categories = ref([]);

const fetchCategories = async () => {
  const res = await axios.get("http://localhost:2000/wp-json/wp/v2/categories");
  categories.value = res.data;
};

onMounted(() => {
  fetchPosts();
  fetchCategories();
});

const addNewPost = async () => {
  if (!newTitle.value || !newContent.value) return;
  await addPost({
    title: newTitle.value,
    content: newContent.value,
    categories: [categories.value[0]?.id] // par défaut 1ère catégorie
  });
  newTitle.value = "";
  newContent.value = "";
  fetchPosts();
};

const openComments = (post) => {
  alert("Ouvrir commentaires pour: " + post.title.rendered);
};

const editPost = async (post) => {
  const nouveauTitre = prompt("Nouveau titre :", post.title.rendered);
  const nouveauContenu = prompt("Nouveau contenu :", post.content.rendered);
  if (!nouveauTitre || !nouveauContenu) return;
  await updatePost(post.id, { title: nouveauTitre, content: nouveauContenu });
  fetchPosts();
};

const deletePostHandler = async (post) => {
  if (confirm("Supprimer ce post ?")) {
    await deletePost(post.id);
    fetchPosts();
  }
};
</script>
