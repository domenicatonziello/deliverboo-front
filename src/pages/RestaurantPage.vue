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
        this.subtotal += Number(food.price * food.quantity);
      });
      this.subtotal = this.subtotal.toFixed(2);
      let tot_price = this.subtotal;
      localStorage.setItem("Tot Price", tot_price);
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
      // (store.restaurantid = null), localStorage.removeItem("Restaurant ID");
    },
    resetCart() {
      store.cart = false
    }
  },
  created() {
    store.isLoading = true;
    this.fetchRestaurants();
    store.fullSizeMain = true;
    store.ristorante = true;
  },
  watch: {
    getTotalPrice() { },
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
          <span>{{ name }} </span>
        </h1>

        <!-- Restaurant Elements-->
        <div class="row d-flex flex-wrap pt-3 restaurant-card justify-content-between gap-2">
          <!-- Restaurant Details-->
          <div class="col-3 details">
            <div class="img-box mb-3">
              <img :src="logo" alt="logo" />
            </div>
            <ul class="text">
              <li>
                <div id="description">
                  {{ description }}
                </div>
              </li>
              <li>
                <font-awesome-icon :icon="['fas', 'phone']" class="icon" />
                <a href="#"> {{ phone_number }}</a>
              </li>
              <li>
                <font-awesome-icon :icon="['fas', 'cart-shopping']" class="icon" />
                Ordine Minimo: <small> €{{ min_order }} </small>
              </li>
              <li>
                <font-awesome-icon :icon="['fas', 'truck-fast']" class="icon" />
                Spedizione: <small> €{{ shipment_price }} </small>
              </li>
              <li>
                <p>
                  <font-awesome-icon :icon="['fas', 'location-dot']" class="icon" />
                  {{ address }}
                </p>
                <div class="map">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d179077.24358987078!2d9.017039295041839!3d45.46815344694175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786c1493f1275e7%3A0x3cffcd13c6740e8d!2sMilano%20MI!5e0!3m2!1sit!2sit!4v1681718621223!5m2!1sit!2sit"
                    style="border: 0" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
                  </iframe>
                </div>
              </li>
            </ul>
          </div>

          <!-- Restaurant Menu-->
          <div class="col menu text-start">
            <h1 class="text-center mb-5">Menu</h1>
            <food-card v-for="food in menu" :key="food.id" :food="food"></food-card>
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
            <div class="text-order">il tuo ordine</div>
            <div class="">
              <cart-content v-for="foodCart in store.foodsCart" :foodCart="foodCart">
              </cart-content>
              <!-- total price -->
              <div v-if="store.foodsCart.length >= 1" class="row p-0 align-items-end h-100">
                <div class="border-cart"></div>
                <div class="final-order">
                  <div>
                    Spedizione:<span>€ {{ shipment_price }}</span>
                  </div>
                  <div>
                    Totale ordine:<span>€ {{ subtotal }}</span>
                  </div>
                </div>
                <div class="empty-cart d-flex justify-content-between">
                  <button @click="cartEmpty()" class="btn btn-danger m-2">
                    Svuota carrello
                  </button>

                  <router-link :to="'/payment'" class="btn btn-success m-2" @click="resetCart()"> Procedi all'ordine
                  </router-link>
                </div>
              </div>
              <div v-else class="d-flex justify-content-center align-items-center text-white">
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
  .details {
    background-color: white;
    max-height: 850px;
    overflow-y: scroll;

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
      padding: 0;
      list-style-type: none;

      li {
        font-size: 17px;

        .icon {
          font-size: 13px;
          color: $primary-bg;
          margin-right: 3px;
        }

        .map {
          width: 100%;
        }

        .map>* {
          width: 100%;
        }
      }

      h6 {
        // font-size: 0.8rem;
        margin-bottom: 0.8rem;
      }
    }

    .text>* {
      margin-bottom: 1rem;

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
    max-height: 850px;
    overflow-y: scroll;
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
  .restaurant-card .details .img-box {
    padding: 40px;
    margin-bottom: 0;
  }

  .cart {
    min-width: 80%;
  }

  .restaurant-card {
    .details {
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

  .details .text #description {
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
