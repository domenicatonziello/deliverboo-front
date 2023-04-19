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
  created() {},
};
</script>

<template>
  <div class="card">
    <img :src="restaurant.logo" class="card-img-top" :alt="restaurant.name" />
    <div class="card-body">
      <h5 class="card-title text-center">{{ restaurant.name }}</h5>
      <h6 class="text-center">
        <i class="fa-solid fa-location-dot" style="color: #fb0000"></i>
        {{ restaurant.address }}
      </h6>
      <div class="d-flex justify-content-around mt-3">
        <p>
          <i class="fa-solid fa-utensils" style="color: #0c7cec"></i>
          {{ restaurant.min_order }}
        </p>
        <p>
          <i class="fa-solid fa-truck-fast" style="color: #ff8d43"></i>
          {{ restaurant.shipment_price }}
        </p>
      </div>
    </div>
    <router-link
      :to="'restaurants/' + restaurant.id"
      @click="setActive()"
      class="card-restaurant"
      :class="{ active: active }"
      style="text-decoration: none; color: inherit"
    >
      <button class="btn cust-btn">ordina</button>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
@use "../../assets/scss/partial/variables.scss" as *;

.card {
  background-color: rgba(255, 234, 216, 0.904);
  width: 19%;
  height: 330px;
  position: relative;
  padding: 0;
  margin-bottom: 2rem;

  img {
    height: 180px;
    width: 100%;
  }

  .cust-btn {
    width: 40%;
    position: absolute;
    bottom: -20px;
    left: 30%;
    right: 30%;
    background-color: rgb(255, 140, 66);
    color: white;
    font-weight: bold;
  }
}

footer {
  background-color: white;
}

@media screen and (max-width: 1400px) {
  .card {
    width: 20%;
  }
}
@media screen and (max-width: 1200px) {
  .card {
    width: 25%;
  }
}
@media screen and (max-width: 1000px) {
  .card {
    width: 40%;
  }
}
@media screen and (max-width: 780px) {
  .card {
    width: 50%;
  }
}
@media screen and (max-width: 600px) {
  .card {
    width: 60%;
  }
}
</style>
