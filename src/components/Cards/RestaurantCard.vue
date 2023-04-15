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
  <div class="card" style="width: 17rem;">
    <img :src="restaurant.logo" class="card-img-top" :alt="restaurant.name">
    <div class="card-body">
      <h5 class="card-title text-center">{{ restaurant.name }}</h5>
      <h6 class="text-center"><i class="fa-solid fa-location-dot" style="color: #FB0000;"></i> {{ restaurant.address }}
      </h6>
      <div class="d-flex justify-content-around mt-3">
        <p><i class="fa-solid fa-utensils" style="color: #0C7CEC;"></i> {{ restaurant.min_order }}</p>
        <p><i class="fa-solid fa-truck-fast" style="color: #FF8D43;"></i> {{ restaurant.shipment_price }}</p>
      </div>
    </div>
    <router-link :to="'restaurants/' + restaurant.id" @click="setActive()" class="card-restaurant"
      :class="{ active: active }" style="text-decoration: none; color: inherit;">
      <button class="btn cust-btn">ordina</button>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
@use '../../assets/scss/partial/variables.scss' as *;

.card {
  background-color: rgba(255, 234, 216, 0.904);
  height: 100%;
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
</style>
