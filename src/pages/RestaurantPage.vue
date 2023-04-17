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
    address: "",
    phone_number: "",
    description: "",
    subtotal: 0,
    min_order: 0,
    shipment_price: 0,
    logo: "",
  }),
  components: { FoodCard, CartContent },
  computed: {
    getTotalPrice() {
      this.subtotal = Number(this.shipment_price);
      store.foodsCart.forEach((food) => {
        this.subtotal += Number(food.newFood.price * food.quantity);
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
          this.address = res.data.restaurant.address;
          this.phone_number = res.data.restaurant.phone_number;
          this.description = res.data.restaurant.description;
          this.min_order = res.data.restaurant.min_order;
          this.shipment_price = res.data.restaurant.shipment_price;
          this.logo = res.data.restaurant.logo;
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
    cartEmpty() {
      (store.foodsCart = []), localStorage.removeItem("Carello");
    },
  },
  created() {
    store.isLoading = true;
    this.fetchRestaurants();
    store.fullSizeMain = true;
    store.ristorante = true;
  },
};
</script>

<template>
  <div class="container p-5">
    <div class="row d-flex justify-content-center text-center cart-position">
      <!-- Restaurant-->
      <div class="col-12 mb-5" :class="store.cart ? 'restaurant-detail' : ''">
        <!-- Restaurant Name-->
        <h1 class="text-center bg-white restaurant-title">
          <span>{{ this.name }}</span>
        </h1>

        <!-- Restaurant Elements-->
        <div
          class="row d-flex flex-wrap pt-3 restaurant-card justify-content-between gap-2"
        >
          <!-- Restaurant Details-->
          <div class="col-3 description">
            <div class="img-box">
              <img :src="this.logo" alt="" />
            </div>
            <div class="text">
              <h5>
                <a href="">{{ this.address }}</a>
              </h5>
              <h5>
                <a href="">Numero: {{ this.phone_number }}</a>
              </h5>
              <h6>Minimo Ordine: €{{ this.min_order }}</h6>
              <h6>Costo Spedizione: €{{ this.shipment_price }}</h6>
              <p>{{ this.description }}</p>
            </div>
          </div>

          <!-- Restaurant Menu-->
          <div class="col menu">
            <h1 class="text-center mb-5">Menù</h1>
            <food-card
              v-for="food in menu"
              :key="food.id"
              :food="food"
            ></food-card>
          </div>
        </div>
      </div>

      <!-- Cart -->
      <div class="cart-container" v-if="store.cart">
        <div class="cart">
          <div class="container">
            <div class="mt-1 text-end">
              <span @click="closeCart()" class="close px-3 mx-0">x</span>
            </div>
            <div class="text-order"><b>Il tuo ordine</b></div>
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
                <div class="final-order mt-3">
                  <div>
                    Spedizione:<span>€ {{ this.shipment_price }}</span>
                  </div>
                  <div>
                    Totale ordine:<span>€ {{ this.subtotal }}</span>
                  </div>
                </div>
                <div class="empty-cart d-flex justify-content-start mb-4">
                  <button @click="cartEmpty()" class="btn btn-danger m-2">
                    Svuota carello
                  </button>
                </div>
              </div>
              <div
                v-else
                class="d-flex justify-content-center align-items-center text-white my-5"
              >
                Il carrello è vuoto
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "./../assets/scss/style.scss" as *;
@use "./../assets/scss/partial/variables" as *;

.restaurant-title {
  border-radius: 1.5rem;
  border: 8px solid rgb(255, 233, 218);

  padding: 1rem;
}

.restaurant-detail {
  filter: blur(3px);
}

.restaurant-card {
  .description {
    background-color: white;

    padding: 2rem;
    border-radius: 1.5rem;
    border: 8px solid rgb(255, 233, 218);

    .img-box {
      width: 100%;

      img {
        width: 100%;
      }
    }

    .text {
      h5 {
        font-size: 1.2rem;
      }

      h6 {
        font-size: 0.8rem;
        margin-bottom: 0.8rem;
      }

      p {
        margin-top: 1.5rem;
      }
    }

    .text > * {
      margin-bottom: 1.5rem;

      a {
        color: black;
        text-decoration: none;
        cursor: pointer;

        &:hover {
          color: grey;
        }
      }
    }
  }

  .menu {
    background-color: white;

    padding: 2rem;
    border-radius: 1.5rem;
    border: 8px solid rgb(255, 233, 218);
  }
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

.cart-position {
  position: relative;
}

.cart {
  background-color: #fff;
  min-height: 100px;
  min-width: 50%;
  box-shadow: 5px 5px 5px $brown;
  background-color: $light-orange;
  display: flex;
  z-index: 1;
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);

  .text-order {
    font-size: 20px;
    text-align: center;
    margin-bottom: 5px;
    color: $brown;
  }

  // stile
  border-radius: 1.5rem;
  border: 8px solid rgb(255, 233, 218);
}

.final-order {
  display: flex;
  justify-content: space-between;
  align-content: end;
  padding-bottom: 10px;
}

.bgcart {
  background: opacity($color: #0000008e);
}

@media screen and (max-width: 1000px) {
  .cart {
    min-width: 80%;
  }

  .restaurant-card {
    .description {
      width: 100%;
    }

    .menu {
      width: 100%;
    }
  }
}

@media screen and (max-width: 567px) {
  .cart {
    min-width: 90%;
  }
}
</style>
