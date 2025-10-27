<script setup lang="ts">
import { onMounted } from 'vue';
// import axios from 'axios';

// const comments = ref([])

// const fetchComments = async () => {
//   const res = await axios.get(`http://localhost:8888/wp-json/wp/v2/comments`,
//     {
//       headers: {
//         Authorization: 'Basic ' + btoa('kevin.hien@epitech.eu:ROOT'),
//         'Content-Type': 'application/json',
//       }
//     }
//   )
//   comments.value = res.data
//   console.log(comments.value);
// }

// const deleteComment = async (id: number) => {
//   await axios.delete(`http://localhost:8888/index.php/wp-json/wp/v2/comments/${id}`,
//     {
//       headers: {
//         Authorization: 'Basic ' + btoa('kevin.hien@epitech.eu:ROOT'),
//         'Content-Type': 'application/json',
//       }
//     }
//   );
//   fetchComments()
// }

// onMounted(fetchComments)
// import { useRoute } from 'vue-router';
// const route = useRoute;
// const id = route.params.id

import { useCommentStore } from '@/stores/commentaire';

const useStores = useCommentStore()

onMounted(() => {
  useStores.fetchComments()
})

const deleteComment = (id: number) => {
  useStores.deleteComment(id)
}

</script>

<template>
  <main>
    <TheWelcome />
    <CommentList />
  </main>
  <div>
    <h2> Lists comments </h2>
    <router-link to="/add">Add New</router-link>
    <ul>
      <li v-for="comment in useStores.comments" :key="comment.id">
        <p v-html="comment.content.rendered"></p>
        <router-link :to="`/edit/${comment.id}`">Edit</router-link>
        <button @click="deleteComment(comment.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>