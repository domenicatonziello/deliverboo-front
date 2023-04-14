<script>
import { store } from "../data/store";
import axios from "axios";
import FoodCard from "../components/Cards/FoodCard.vue";
import CartContent from "../components/content/CartContent.vue";
const baseUri = "http://127.0.0.1:8000/api/";
export default {
  name: "RestaurantPage",
  data: () => ({
    store,
    menu: [],
    name: "",
    subtotal: 0,
    shipment_price: 0,
  }),
  components: { FoodCard, CartContent },
  computed: {
    getTotalPrice() {
      this.subtotal = Number(this.shipment_price);
      store.foodsCart.forEach((food) => {
        this.subtotal += Number(food.price);
      });
      this.subtotal = this.subtotal.toFixed(2);
    },
  },
  methods: {
    fetchRestaurants() {
      axios
        .get(baseUri + "restaurants/" + this.$route.params.id)
        .then((res) => {
          this.menu = res.data.foods;
          this.name = res.data.restaurant.name;
          this.shipment_price = res.data.restaurant.shipment_price;
          // console.log(res.data.restaurant.name)
          // console.log(this.menu)
          // console.log(this.$route.params.id)
        })
        .catch((err) => {
          console.error(err);
        })
        .then((res) => {
          store.isLoading = false;
        });
    },
    closeCart() {
      store.cart = false;
    },
  },
  created() {
    store.isLoading = true;
    this.fetchRestaurants();
  },
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div :class="!store.cart ? 'col-12' : 'col-9'">
        <h1 class="my-5 text-center">
          Menù ristorante <span>{{ this.name }}</span>
        </h1>
        <div class="d-flex flex-wrap pt-5 justify-content-center gap-2">
          <food-card
            v-for="food in menu"
            :key="food.id"
            :food="food"
          ></food-card>
        </div>
      </div>
      <div class="col-3 cart-container" v-if="store.cart">
        <div class="cart">
          <div class="mt-1">
            <span @click="closeCart()" class="close px-3 mx-0">x</span>
          </div>
          <div class="container">
            <div class="text-order">il tuo ordine</div>
            <div class="">
              <cart-content
                v-for="foodCart in store.foodsCart"
                :foodCart="foodCart"
              >
              </cart-content>
              <!-- total price -->
              <div
                v-if="store.foodsCart.length >= 1"
                class="row p-0 align-items-end h-100"
              >
                <div class="border-cart"></div>
                <div class="final-order">
                  <div>
                    Spedizione:<span>€ {{ this.shipment_price }}</span>
                  </div>
                  <div>
                    Totale ordine:<span>€ {{ this.subtotal }}</span>
                  </div>
                </div>
              </div>
              <div
                v-else
                class="d-flex justify-content-center align-items-center text-white"
              >
                Il carello è Vuoto
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/scss/partial/variables.scss" as *;
.cart-container {
  position: relative;
}
.cart {
  position: absolute;
  right: -200px;
  top: 10px;
  background-color: #fff;
  min-height: 50px;
  box-shadow: 5px 5px 5px $brown;
  background-color: $light-orange;
  .text-order {
    font-size: 20px;
    text-align: center;
    margin-bottom: 5px;
    color: $brown;
  }

  // stile
  border-radius: 20px;
  border: 2px solid black;
}

.close {
  display: none;
}
.final-order {
  display: flex;
  justify-content: space-between;
  align-content: end;
  padding-bottom: 10px;
}

@media screen and (max-width: 1750px) {
  .cart {
    right: -10px;
  }
}

@media screen and (max-width: 1000px) {
  .cart-container {
    position: initial;
  }
  .cart {
    min-height: 90vh;
    border: 0px;
    box-shadow: 5px 5px 5px $brown;
    position: absolute;
    top: 30px;
    right: 10px;
    left: 10px;

    .border-cart {
      border-bottom: 5px solid $light-brown;
      border-radius: 20px;
      margin-top: 10px;
      margin-bottom: 10px;
      padding-left: 10px;
      padding-right: 10px;
    }

    .text-order {
      font-size: 50px;
      text-align: center;
      margin-bottom: 20px;
      color: $brown;
    }

    .close {
      display: inline-block;
      font-size: 30px;
      cursor: pointer;
      color: #fff;
      &:hover {
        transform: scale(1.2);
        transition: 0.5s;
      }
    }
  }

  .final-order {
    display: flex;
    justify-content: space-between;
  }
}
</style>
