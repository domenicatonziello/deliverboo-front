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
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  min-height: calc(100vh - 19vh);
  // padding-bottom: 20px;
  background: linear-gradient(297.36deg,
      #ff8c42 55%,
      #feb889 55%,
      #feb07c 87.32%,
      #fcfbf7 143.55%);
}
</style>

