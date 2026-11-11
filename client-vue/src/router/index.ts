import { createRouter, createWebHistory } from 'vue-router'
import AddPost from '../views/AddPost.vue'
import EditPost from '../views/EditPost.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Post from '../views/Post.vue'
import Posts from '../views/Posts.vue'
import Register from '../views/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/posts', name: 'posts', component: Posts },
    { path: '/:id', name: 'post', component: Post },
    { path: '/:id/edit', name: 'edit-post', component: EditPost },
    { path: '/new', name: 'add-post', component: AddPost },
    { path: '/register', name: 'register', component: Register },
    { path: '/login', name: 'login', component: Login },
  ]
})

export default router