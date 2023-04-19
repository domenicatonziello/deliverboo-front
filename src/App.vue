<script>
import { store } from "./data/store";
import NotFoundPage from "./pages/NotFoundPage.vue";
import AppHeader from "./components/content/AppHeader.vue";
import otherPage from "./pages/otherPage.vue";
import PaymentPage from "./pages/PaymentPage.vue";

import SectionJumbotron from "./components/SectionJumbotron.vue";
export default {
  name: "DeliverBoo",
  components: {
    AppHeader,
    NotFoundPage,
    SectionJumbotron,
    otherPage,
    PaymentPage,
  },
  data: () => ({
    store,
  }),
};
</script>

<template>
  <div class="bcg-gradient">
    <app-header></app-header>
    <section-jumbotron>
      <router-view> </router-view>
      <div class="loader align-items-center justify-content-center" :class="{ 'd-flex': store.isLoading }">
        <i class="fa-solid fa-spinner fa-spin fa-5xl"></i>
      </div>
    </section-jumbotron>
  </div>
</template>

<style lang="scss">
@use "./assets/scss/style" as *;
@use "./assets/scss/partial/variables" as *;

.loader {
  height: calc(100vh - 80px);
  max-width: 100vw;
  background-color: rgba(3, 3, 3, 0.13);
  position: absolute;
  top: 80px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  display: none;

  .fa-5xl {
    font-size: 150px;
    background: -webkit-linear-gradient(#ff5100, #ff9a57, #ffd1b3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.bcg-gradient {
  background: linear-gradient(297.36deg,
      #ff8c42 44.61%,
      #feb889 44.61%,
      #feb07c 87.32%,
      #fcfbf7 143.55%);
}
</style>
