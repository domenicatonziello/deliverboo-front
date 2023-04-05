<script>
import NotFoundPage from './pages/NotFoundPage.vue';
import AppHeader from './components/content/AppHeader.vue'
import SectionJumbotron from './components/SectionJumbotron.vue';
export default {
  name: 'DeliverBoo',
  components: { AppHeader, NotFoundPage, SectionJumbotron }
}
</script>

<template>
  <section-jumbotron>
    <app-header></app-header>
    <routerView />
  </section-jumbotron>
</template>


<style lang="scss">
@use './assets/scss/style' as *;
@use './assets/scss/partial/variables' as *;
</style>