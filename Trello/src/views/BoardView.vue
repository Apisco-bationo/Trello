<template>
  <div class="container-fluid mt-4">
    <!-- Liste des catégories -->
    <div class="row flex-nowrap overflow-auto">
      <div
        class="col-12 col-md-4 mb-4"
        v-for="category in categories"
        :key="category.id"
      >
        <div class="card shadow-sm">
          <div class="card-header d-flex justify-content-between align-items-center">

            <!-- Edition du titre de la catégorie -->
            <div v-if="editCategoryId === category.id" class="w-100 d-flex">
              <input v-model="editCategoryName" class="form-control me-2"/>
              <button class="btn btn-success btn-sm" @click="updateCategory(category)">✔</button>
              <button class="btn btn-secondary btn-sm ms-1" @click="cancelCategoryEdit">✖</button>
            </div>
            <div v-else class="d-flex justify-content-between align-items-center w-100">
              <strong>{{ category.name }}</strong>
              <div>
                <button class="btn btn-sm btn-warning me-1" @click="startCategoryEdit(category)">✏️</button>
                <button class="btn btn-sm btn-danger me-1" @click="deleteCategory(category.id)">🗑️</button>
                <button class="btn btn-sm btn-primary" @click="openComments(category)">💬</button>
              </div>
            </div>
          </div>

          <div class="card-body">
            <!-- Formulaire ajout de post -->
            <div v-if="showAddForm[category.id]" class="mb-2">
              <input v-model="newPostTitle[category.id]" placeholder="Titre" class="form-control mb-1" />
              <textarea v-model="newPostContent[category.id]" placeholder="Contenu" class="form-control mb-1"></textarea>
              <button class="btn btn-success btn-sm w-100" @click="addPost(category.id)">Ajouter</button>
            </div>

            <button class="btn btn-primary btn-sm w-100 mb-2" @click="showAddForm[category.id] = !showAddForm[category.id]">
              + Carte
            </button>

            <!-- Posts -->
            <div
              v-for="post in filteredPosts(category.id)"
              :key="post.id"
              class="card mb-2"
            >
              <div class="card-body p-2">
                <!-- Edition post -->
                <div v-if="editPostId === post.id">
                  <input v-model="editPostTitle" class="form-control mb-1" />
                  <textarea v-model="editPostContent" class="form-control mb-1"></textarea>
                  <button class="btn btn-success btn-sm me-1" @click="updatePost(post)">✔</button>
                  <button class="btn btn-secondary btn-sm" @click="cancelEdit">✖</button>
                </div>

                <!-- Affichage normal -->
                <div v-else>
                  <h6>{{ post.title.rendered }}</h6>
                  <p v-html="post.content.rendered"></p>
                  <div class="d-flex justify-content-end">
                    <button class="btn btn-warning btn-sm me-1" @click="startEdit(post)">✏️</button>
                    <button class="btn btn-danger btn-sm" @click="deletePost(post.id)">🗑️</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- Ajout d'une nouvelle catégorie comme Trello -->
      <div class="col-12 col-md-4 mb-4">
        <div class="card shadow-sm p-3">
          <div v-if="addingCategory">
            <input v-model="newCategoryName" placeholder="Nom catégorie" class="form-control mb-2" />
            <button class="btn btn-success btn-sm w-100 mb-1" @click="addCategory">✔ Ajouter</button>
            <button class="btn btn-secondary btn-sm w-100" @click="addingCategory = false">✖ Annuler</button>
          </div>
          <div v-else>
            <button class="btn btn-outline-primary w-100" @click="addingCategory = true">
              + Ajouter une catégorie
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Popup Commentaires -->
    <div v-if="showComments" class="modal fade show d-block" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5>Commentaires - {{ currentCategory?.name }}</h5>
            <button type="button" class="btn-close" @click="closeComments"></button>
          </div>
          <div class="modal-body">
            <div v-for="(comment, index) in comments[currentCategory.id] || []" :key="index" class="border rounded p-2 mb-2">
              <div v-if="editingCommentId === index">
                <textarea v-model="editingCommentText" class="form-control mb-2"></textarea>
                <button class="btn btn-success btn-sm me-2" @click="updateComment(index)">✔</button>
                <button class="btn btn-secondary btn-sm" @click="cancelCommentEdit">✖</button>
              </div>
              <div v-else>
                <p>{{ comment }}</p>
                <button class="btn btn-warning btn-sm me-2" @click="startCommentEdit(index, comment)">✏️</button>
                <button class="btn btn-danger btn-sm" @click="deleteComment(index)">🗑️</button>
              </div>
            </div>
            <textarea v-model="newComment" placeholder="Ajouter un commentaire..." class="form-control mb-2"></textarea>
            <button class="btn btn-primary w-100" @click="addComment">Ajouter</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Fond sombre du modal -->
    <div v-if="showComments" class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
import api from "@/api.js";
import { ref } from "vue";

export default {
  setup() {
    const categories = ref([]);
    const posts = ref([]);
    const showAddForm = ref({});
    const newPostTitle = ref({});
    const newPostContent = ref({});
    const editPostId = ref(null);
    const editPostTitle = ref("");
    const editPostContent = ref("");

    // Catégories
    const addingCategory = ref(false);
    const newCategoryName = ref("");
    const editCategoryId = ref(null);
    const editCategoryName = ref("");

    // Commentaires
    const showComments = ref(false);
    const currentCategory = ref(null);
    const comments = ref({}); // {catId: [ "texte1", "texte2"... ]}
    const newComment = ref("");
    const editingCommentId = ref(null);
    const editingCommentText = ref("");

    // Charger données
    const fetchData = async () => {
      try {
        const resCats = await api.get("/categories");
        categories.value = resCats.data;

        const resPosts = await api.get("/posts");
        posts.value = resPosts.data;
      } catch (err) {
        console.error(err);
      }
    };

    // Ajout catégorie
    const addCategory = async () => {
      if (!newCategoryName.value) return;
      try {
        const res = await api.post("/categories", { name: newCategoryName.value });
        categories.value.push(res.data);
        newCategoryName.value = "";
        addingCategory.value = false;
      } catch (err) {
        console.error(err);
      }
    };

    // Modifier catégorie
    const startCategoryEdit = (category) => {
      editCategoryId.value = category.id;
      editCategoryName.value = category.name;
    };
    const cancelCategoryEdit = () => {
      editCategoryId.value = null;
      editCategoryName.value = "";
    };
    const updateCategory = async (category) => {
      try {
        const res = await api.put(`/categories/${category.id}`, { name: editCategoryName.value });
        const idx = categories.value.findIndex((c) => c.id === category.id);
        if (idx !== -1) categories.value[idx] = res.data;
        cancelCategoryEdit();
      } catch (err) {
        console.error(err);
      }
    };
    const deleteCategory = async (catId) => {
      try {
        await api.delete(`/categories/${catId}`);
        categories.value = categories.value.filter((c) => c.id !== catId);
      } catch (err) {
        console.error(err);
      }
    };

    // Posts
    const filteredPosts = (catId) => posts.value.filter((p) => p.categories.includes(catId));
    const addPost = async (catId) => {
      if (!newPostTitle.value[catId]) return;
      try {
        const res = await api.post("/posts", {
          title: newPostTitle.value[catId],
          content: newPostContent.value[catId] || "",
          status: "publish",
          categories: [catId],
        });
        posts.value.push(res.data);
        newPostTitle.value[catId] = "";
        newPostContent.value[catId] = "";
        showAddForm.value[catId] = false;
      } catch (err) {
        console.error(err);
      }
    };
    const startEdit = (post) => {
      editPostId.value = post.id;
      editPostTitle.value = post.title.rendered;
      editPostContent.value = post.content.rendered;
    };
    const cancelEdit = () => {
      editPostId.value = null;
      editPostTitle.value = "";
      editPostContent.value = "";
    };
    const updatePost = async (post) => {
      try {
        const res = await api.put(`/posts/${post.id}`, {
          title: editPostTitle.value,
          content: editPostContent.value,
        });
        const idx = posts.value.findIndex((p) => p.id === post.id);
        if (idx !== -1) posts.value[idx] = res.data;
        cancelEdit();
      } catch (err) {
        console.error(err);
      }
    };
    const deletePost = async (postId) => {
      try {
        await api.delete(`/posts/${postId}`);
        posts.value = posts.value.filter((p) => p.id !== postId);
      } catch (err) {
        console.error(err);
      }
    };

    // Commentaires
    const openComments = (category) => {
      currentCategory.value = category;
      if (!comments.value[category.id]) comments.value[category.id] = [];
      showComments.value = true;
    };
    const closeComments = () => {
      showComments.value = false;
      currentCategory.value = null;
      newComment.value = "";
    };
    const addComment = () => {
      if (!newComment.value) return;
      comments.value[currentCategory.value.id].push(newComment.value);
      newComment.value = "";
    };
    const startCommentEdit = (id, text) => {
      editingCommentId.value = id;
      editingCommentText.value = text;
    };
    const cancelCommentEdit = () => {
      editingCommentId.value = null;
      editingCommentText.value = "";
    };
    const updateComment = (id) => {
      comments.value[currentCategory.value.id][id] = editingCommentText.value;
      cancelCommentEdit();
    };
    const deleteComment = (id) => {
      comments.value[currentCategory.value.id].splice(id, 1);
    };

    fetchData();

    return {
      categories, posts, showAddForm, newPostTitle, newPostContent,
      editPostId, editPostTitle, editPostContent,
      addingCategory, newCategoryName, editCategoryId, editCategoryName,
      filteredPosts, addPost, startEdit, cancelEdit, updatePost, deletePost,
      addCategory, startCategoryEdit, cancelCategoryEdit, updateCategory, deleteCategory,
      showComments, currentCategory, comments, newComment,
      editingCommentId, editingCommentText,
      openComments, closeComments, addComment,
      startCommentEdit, cancelCommentEdit, updateComment, deleteComment
    };
  },
};
</script>
