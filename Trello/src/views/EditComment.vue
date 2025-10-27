<script setup lang="ts">
// import CommentForm from '@/components/CommentForm.vue';
// import axios from 'axios';
// const route = useRoute()
// // const router = useRouter()
// const id = route.params.id
// const comment = ref('')
// const fetchComments = async () => {
//     const res = await axios.get(`http://localhost:8888/index.php/wp-json/wp/v2/comments/${id}`,
//         {
//             headers: {
//                 Authorization: 'Basic ' + btoa('kevin.hien@epitech.eu:ROOT'),
//                 'Content-Type': 'application/json',
//             }
//         }
//     )
//     // console.log(res)
//     comment.value = res.data.content.rendered
// }
// const updateComment = async () => {
//     const res = await axios.put(`http://localhost:8888/index.php/wp-json/wp/v2/comments/${id}`, {
//         content: comment.value,
//         posts: 5
//     },
//         {
//             headers: {
//                 Authorization: 'Basic ' + btoa('kevin.hien@epitech.eu:ROOT'),
//                 'Content-Type': 'application/json',
//             }
//         }
//     )
//     console.log(res)
//     // console.log(comment);
    
//     // router.push('/')
// }
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useCommentStore } from '@/stores/commentaire';

const comment = ref('')
const route = useRoute()
const router = useRouter()
const useStores = useCommentStore()

onMounted(async () => {
    await useStores.fetchCommentsId(+route.params.id);
    if (useStores && useStores.selectComments) {
        comment.value = useStores.selectComments.comment;
    }
})

const updateComment = async () => {
    await useStores.updateComment((+route.params.id),{
        content: comment.value
    });
    router.push('/');
}
</script>
<template>
    <main>
    </main>
    <div>
        <form action="" @submit.prevent="updateComment">
            <input v-model="comment" placeholder="exemple ...">
            <button type="submit"> Update</button>
        </form>
    </div>
</template>