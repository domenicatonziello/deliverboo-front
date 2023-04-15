<script>
import { store } from "../../data/store";
export default {
  name: "TypologyCard",
  props: { typology: Object },

  data: () => ({
    store,
    active: false,
  }),
  methods: {
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
};
</script>

<template>
  <div @click="setActive()" class="box" :class="{ active: active }">
    <img :src="typology.image" :alt="typology.name" />
    <div class="overlay">
      <h4>{{ typology.name }}</h4>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.active {
  border: 3px solid rgb(255, 0, 0);
}

.box {
  height: 120px;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  cursor: pointer;



  &:hover .overlay {
    h4 {
      visibility: visible;
      transition: 0.5s;
    }
  }

  img {
    height: 100%;
    width: 100%;
    border-radius: 10px;
    object-fit: cover;
    transform: scale(1.2);
    filter: brightness(0.6);
  }

  &:hover img {
    transform: scale(1.2);
    filter: brightness(0.6);
  }

  .overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -25%);

    h4 {
      color: white;
      margin: 0;
      font-size: 20px;
      visibility: visible;
    }
  }
}
</style>
