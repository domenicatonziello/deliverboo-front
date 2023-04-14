<script>
export default {
  name: "SectionJumbotron",
};
</script>

<template>
  <section id="jumbotron">
    <slot></slot>
  </section>
</template>

<style lang="scss">
#jumbotron {
  min-height: 74.4vh;
  // padding-bottom: 20px;
  background: linear-gradient(297.36deg,
      #ff8c42 55%,
      #feb889 55%,
      #feb07c 87.32%,
      #fcfbf7 143.55%);
}
</style>

