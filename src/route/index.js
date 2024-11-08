import { createRouter, createWebHistory } from "vue-router"
import rdnidx from "../components/rdn.vue"
import bkbox from "../components/blackbox.vue"


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "rdnidx",
            component: rdnidx,
        },
        {
            path: "/bkbox/:paircode",
            name: "bkbox",
            component: bkbox,
        },
    ],
})

export default router
