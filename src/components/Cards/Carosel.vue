<script>
import { store } from "../../data/store";

export default {
  name: "Carosel",
  data: () => ({
    store,
    active: false,
  }),

  methods: {
    GetScroll() {
      const container = document.getElementById("container-carousel");
      let scrollLine = document.querySelector(".scroll");

      container.addEventListener("wheel", (e) => {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
        scrollLine.getElementsByClassName.width =
          container.scrollLeft / 2 + "px";
      });
    },
    setActive() {
      this.active = !this.active;
      const getIndex = store.currentTypology.indexOf(this.typology.id);

      if (this.active) {
        store.currentTypology.push(this.typology.id);
      } else {
        store.currentTypology.splice(getIndex, 1);
      }
    },
  },
  mounted() {
    this.GetScroll();
  },
};
</script>

<template>
  <div class="scroll"></div>
  <div id="container-carousel" class="container-carosel snap-inline">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.scroll {
  position: absolute;
  height: 5px;
  width: 0;
  background-color: white;
  top: 0;
  left: 0;
}
.snap-inline {
  scroll-snap-type: mandatory inline;
  scroll-padding-inline: 2rem;
}
.snap-inline > * {
  scroll-snap-align: start;
}
.container-carosel {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 22%;
  gap: 10px;
  overflow-x: hidden;
  overscroll-behavior: contain;
}

@media screen and (max-width: 1000px) {
  .container-carosel {
    grid-auto-columns: 50%;
  }
}

@media screen and (max-width: 500px) {
  .container-carosel {
    grid-auto-columns: 100%;
  }
}
</style>
