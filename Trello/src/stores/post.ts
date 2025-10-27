// src/stores/usePostStore.js
import { ref } from "vue";
import api from "@/api.js";

export function usePostStore() {
  const posts = ref([]);
  const categories = ref([]);

  // Récupérer posts
  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts");
      posts.value = res.data;
    } catch (err) {
      console.error("Erreur fetch posts:", err);
    }
  };

  // Récupérer catégories
  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      categories.value = res.data;
    } catch (err) {
      console.error("Erreur fetch categories:", err);
    }
  };

  // Ajouter
  const addPost = async (data) => {
    try {
      const res = await api.post("/posts", {
        ...data,
        status: "publish"
      });
      posts.value.unshift(res.data);
    } catch (err) {
      console.error("Erreur ajout post:", err.response?.data || err);
    }
  };

  // Modifier
  const updatePost = async (id:number, data) => {
    try {
      const res = await api.put(`/posts/${id}`, data);
      const index = posts.value.findIndex(p => p.id === id);
      if (index !== -1) posts.value[index] = res.data;
    } catch (err) {
      console.error("Erreur modification:", err.response?.data || err);
    }
  };

  // Supprimer
  const deletePost = async (id) => {
    try {
      await api.delete(`/posts/${id}?force=true`);
      posts.value = posts.value.filter(p => p.id !== id);
    } catch (err) {
      console.error("Erreur suppression:", err.response?.data || err);
    }
  };

  return {
    posts,
    categories,
    fetchPosts,
    fetchCategories,
    addPost,
    updatePost,
    deletePost
  };
}
