<script setup lang="ts">
// import CommentForm from '@/components/CommentForm.vue';
// const login = "kevin.hien@epitech.eu"
// const token = "a2V2aW4uaGllbkBlcGl0ZWNoLmV1OlJPT1Q="
// const AddComment = async () => {
//     try {
//         await axios.post(`http://localhost:8888/index.php/wp-json/wp/v2/comments`, {
//             content: comment.value,
//             post: 5
//         },
//             {
//                 headers: {
//                     Authorization: 'Basic ' + btoa('kevin.hien@epitech.eu:ROOT'),
//                     'Content-Type': 'application/json',
//                 }
//                 // "status": "approved",
//             });
//         // console.log();
//         router.push('/');
//     } catch (error) {
//         console.log(error);
//     }
// }
// import { onMounted } from 'vue';
// import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCommentStore } from '@/stores/commentaire';
const comment = ref('')
const router = useRouter()
const useStores = useCommentStore()
const AddComment = async () => {
    await useStores.AddComment({content: comment.value, post: 5});
    router.push('/');
};
console.log(AddComment);
</script>
<template>
    <main>
        <CommentForm />
    </main>
    <div>
        <h2>Add Comment</h2>
        <form action="" @submit.prevent="AddComment">
            <input type="text" v-model="comment" placeholder="Write your comment here ...">
            <button type="submit">Add</button>
        </form>
    </div>
</template>
