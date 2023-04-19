<script>
import { store } from "../data/store";
import axios from "axios";
import AppFooter from "../components/content/AppFooter.vue";
import TypologyCard from "../components/Cards/TypologyCard.vue";
import AppJumbotron from "../components/content/AppJumbotron.vue";
import RestaurantCard from "../components/Cards/RestaurantCard.vue";
import Carosel from "../components/Cards/Carosel.vue";

const baseUri = "http://127.0.0.1:8000/api/";
export default {
  name: "HomePage",
  components: {
    TypologyCard,
    AppFooter,
    RestaurantCard,
    Carosel,
    AppJumbotron,
  },
  data: () => ({
    store,
    typologies: [],
    id_typologies: "",
  }),
  computed: {
    filterCheck() {
      if (store.currentTypology.length <= 0) {
        this.allRestaurants();
      }
    },
    getString() {
      return (this.id_typologies = allRestaurants().toString());
    },
  },
  watch: {
    filterCheck() { },
  },
  methods: {
    refreshCity() {
      store.currentTypology = [];
      store.restaurants = [];
      store.addedCity = false;
      // store.city = ;
    },
    fetchTypologies() {
      store.isLoading = true;

      axios
        .get(baseUri + "typologies")
        .then((res) => {
          this.typologies = res.data;
        })
        .catch((err) => {
          console.error(err);
        })
        .then((res) => {
          store.isLoading = false;
        });
    },
    allRestaurants() {
      axios
        .get(baseUri + "restaurants")
        .then((res) => {
          store.restaurants = res.data;
        })
        .catch((err) => {
          console.error(err);
        })
        .then((res) => {
          store.isLoading = false;
        });
    },
    onClick() {
      if (store.currentTypology.length > 0) {
        store.isLoading = true;
        axios
          .get(
            baseUri + "restaurants/?types=" + store.currentTypology.toString()
          )
          .then((res) => {
            store.restaurants = res.data;
          })
          .catch((err) => {
            console.error(err);
          })
          .then((res) => {
            store.isLoading = false;
          });
      } else {
        store.restaurants = [];
      }
    },
  },

  created() {
    store.currentTypology = [];
    this.fetchTypologies();
    this.allRestaurants();
    store.fullSizeMain = false;
    store.ristorante = false;
  },
};
</script>

<template>
  <AppJumbotron />
  <!-- tipologie -->
  <section id="typology" v-if="store.addedCity" class="pb-6">
    <div class="container">
      <p>
        <i class="fa-solid fa-location-dot" style="color: #000000"></i>
        <strong>{{ store.city }}</strong>
        <button @click="refreshCity" class="ms-2 change">
          Cambia indirizzo
        </button>
      </p>
    </div>
    <div class="container">
      <h2 class="mb-4">Le nostre tipologie</h2>
      <p class="mb-2 indication">
        Scrolla e seleziona le tipologie che vuoi
        <i class="fa-solid fa-arrow-right-long fa-beat fa-sm ms-2" style="color: #6e6e6e"></i>
      </p>
      <carosel>
        <typology-card @click="onClick()" v-for="typology in typologies" :key="typology.id"
          :typology="typology"></typology-card>
      </carosel>

      <div v-if="store.restaurants.length > 0" class="row justify-content-center gap-2 mt-5">
        <restaurant-card v-for="restaurant in store.restaurants" :key="restaurant.id"
          :restaurant="restaurant"></restaurant-card>
      </div>
      <div v-if="store.restaurants.length < 1" class="mt-5 py-3 text-center">
        <h3>Non ci sono ristoranti per le tipologie selezionate</h3>
      </div>
    </div>
  </section>
  <div class="footer">
    <app-footer></app-footer>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/scss/partial/variables.scss" as *;

.change {
  border: 0;
  background-color: rgb(255, 140, 66);
  border-radius: 15px;
  font-weight: bold;
  font-size: 13px;
  color: #ffffff;

  &:hover {
    // background-color: rgb(233, 117, 9);
    color: #000;
  }
}

#typology {
  min-height: 65vh;
  background-color: rgb(255, 233, 218);
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding-top: 50px;
  padding-bottom: 100px;

  h2 {
    text-shadow: 2px 1px 2px $brown;
    color: $primary-bg;
    font-size: 40px;
  }

  .indication {
    font-weight: 400;
    color: #505152;
    font-style: oblique;
  }
}

@media screen and (max-width: 1000px) {
  .footer {
    display: none;
  }
}
</style>
