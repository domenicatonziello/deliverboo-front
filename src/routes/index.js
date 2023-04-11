import { createRouter, createWebHistory } from "vue-router";

// PAGES
import HomePage from '../pages/HomePage.vue';
import TypologyPage from '../pages/TypologyPage.vue';
import RestaurantPage from '../pages/RestaurantPage.vue';



// ROUTES

const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
    routes: [
        { path: '/', name: 'home', component: HomePage },
        { path: '/typologies/:id', name: 'typology', component: TypologyPage },
        { path: '/restaurants/:id', name: 'restaurant', component: RestaurantPage },

    ]
});

export { router };