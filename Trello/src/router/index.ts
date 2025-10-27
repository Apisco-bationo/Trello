import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import App from '@/App.vue'
import AddComment from '@/views/AddComment.vue'
import EditComment from '@/views/EditComment.vue'
// import BoardView from '../views/BoardView.vue'
import CrudPost from '@/components/CrudPost.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView,
    // },
    // {
    //   path: '/',
    //   name: 'BoardView',
    //   component: BoardView,
    // },

    {
      path: '/add',
      name: 'add',
      component: AddComment,
    },
    // {
    //   path: '/edit/:id',
    //   name: 'edit',
    //   component: EditComment,
    // },

    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
    {
      path: '/crudpost',
      name: 'CrudPost',
      component: () => import('../views/BoardView.vue'),
    },

    {
      path: '/categorie',
      name: 'categorie',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/CrudCategorie.vue'),
    },
  ],
})

export default router
