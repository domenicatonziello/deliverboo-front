<script>
import NotFoundPage from './pages/NotFoundPage.vue';
import AppHeader from './components/content/AppHeader.vue'
import AppJumbotron from './components/content/AppJumbotron.vue'
import SectionJumbotron from './components/SectionJumbotron.vue';
export default {
  name: 'DeliverBoo',
  components: { AppHeader, AppJumbotron, NotFoundPage, SectionJumbotron }
}
</script>

<template>
  <section-jumbotron>
    <app-header></app-header>
    <AppJumbotron></AppJumbotron>

    <routerView />
  </section-jumbotron>
</template>


<style lang="scss"></style>