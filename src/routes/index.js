import { createRouter, createWebHistory } from "vue-router";

// importare le pagine

const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
    routes: [
        // inserire rotte
    ]
});

export { router };