<script>
import { store } from "../../data/store";
export default {
  name: "RestaurantCard",
  props: { restaurant: Object },
  data: () => ({
    store,
    active: false,
  }),
  computed: {},
  methods: {
    setActive() {
      this.active = !this.active;
    },
  },
  created() { },
};
</script>

<template>
  <router-link :to="'restaurants/' + restaurant.id" @click="setActive()" class="card-restaurant"
    :class="{ active: active }">
    <img :src="restaurant.logo" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">{{ restaurant.name }}</h5>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
.active {
  border: 2px solid blue;
}

.card-restaurant {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  height: 150px;

  &:hover .card-body {
    h5 {
      visibility: visible;
      transition: 0.5s;
    }
  }

  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
    border-radius: 10px;
  }

  &:hover img {
    transform: scale(1.2);
    filter: brightness(0.6);
  }

  .card-body {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -25%);

    h5 {
      color: white;
      visibility: hidden;
      font-size: 15px;
    }
  }
}
</style>
