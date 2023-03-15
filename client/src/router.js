import Vue from 'vue'
import VueRouter from 'vue-router'
import result from "@/components/result.vue"

Vue.use(VueRouter)

const routes = [
    {
        path: '/result',
        name: 'result',
        component: result
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
