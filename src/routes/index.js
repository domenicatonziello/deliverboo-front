import { createRouter, createWebHistory } from "vue-router";

// PAGES
import HomePage from "../pages/HomePage.vue";
import RestaurantPage from "../pages/RestaurantPage.vue";
import OtherPage from "../pages/OtherPage.vue";
import PaymentPage from "../pages/PaymentPage.vue";
import ConfirmPaymentPage from '../pages/ConfirmPaymentPage.vue';

// ROUTES

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  linkExactActiveClass: "active",
  routes: [
    { path: "/", name: "home", component: HomePage },
    { path: "/restaurants/:id", name: "restaurant", component: RestaurantPage },
    { path: "/other", name: "other", component: OtherPage },
    { path: "/payment", name: "payment", component: PaymentPage },
    { path: "/confirmOrder", name: "confirmOrder", component: ConfirmPaymentPage },
  ],
});

export { router };
