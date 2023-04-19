<script>
import { store } from "../data/store";
export default {
  name: "SectionJumbotron",
  data: () => ({
    store,
  }),
};
</script>

<template>
  <section :class="{ 'full-size': store.fullSizeMain }" id="jumbotron">
    <slot></slot>
  </section>
</template>

<style lang="scss">
#jumbotron {
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  min-height: calc(100vh - 19vh);
  // min-height: 100vh;
  // padding-bottom: 20px;
  // background: linear-gradient(297.36deg,
  //     #ff8c42 55%,
  //     #feb889 55%,
  //     #feb07c 87.32%,
  //     #fcfbf7 143.55%);
  // padding-bottom: 2rem;
}

#jumbotron.full-size {
  min-height: calc(100vh - 11vh);
}
</style>
