<script>
import Modal from "../Modal.vue";
import { store } from "../../data/store";
export default {
  name: "FoodCard",
  components: { Modal },
  props: { food: Object },
  data: () => ({
    store,
    active: false,
    getIndex: null,
    isSelect: false,
    quantity: null,
  }),

  mounted() {
    if (localStorage.getItem("Carello")) {
      try {
        store.foodsCart = JSON.parse(localStorage.getItem("Carello"));
        store.restaurantid = Number(localStorage.getItem("Restaurant ID"));
      } catch (e) {
        localStorage.removeItem("Carello");
      }
    }
  },
  watch: {
    select() {
      console.log("select");
    },
    foodQuantity() {
      console.log("quantity");
    },
    deleteCart() {
      console.log("svuota carrello");
    },
  },
  computed: {
    returnIndex() {
      return (this.getIndex = store.foodsCart.indexOf(this.food));
    },
    select() {
      return store.foodsCart.forEach((food) => {
        if (food.id == this.food.id) this.isSelect = true;
        // else this.isSelect = false;
      });
    },
    foodQuantity() {
      return store.foodsCart.forEach((food) => {
        if (food.id == this.food.id) this.quantity = food.quantity;
      });
    },
    deleteCart() {
      if (!store.foodsCart.length) {
        this.isSelect = false;
        // localStorage.removeItem("Restaurant ID");
      }
    },
  },

  methods: {
    addFood(newFood) {
      if (store.foodsCart.length) {
        if (store.restaurantid == newFood.restaurant_id) {
          store.message = "";
          store.foodsCart.forEach((food) => {
            if (food.id == this.food.id) {
              this.removeFood(this.returnIndex);
              // food.newFood.quantity == store.quantityFood;
            }
          });
        } else {
          return (store.message = "non puoi ordinare da più ristoranti");
        }
      } else {
        store.restaurantid = newFood.restaurant_id;
      }
      if (!newFood.name && !newFood.price) return;
      newFood["quantity"] = 1;
      store.foodsCart.push(newFood);
      this.saveFood();
      // this.isSelect = true;
    },
    removeFood(food) {
      store.foodsCart.splice(food, 1);
      this.isSelect = false;
      this.saveFood();
    },
    saveFood() {
      let parsed = JSON.stringify(store.foodsCart);
      localStorage.setItem("Carello", parsed);
      let resId = store.restaurantid;
      localStorage.setItem("Restaurant ID", resId);
    },
    upQuantity() {
      store.foodsCart.forEach((food) => {
        if (food.id == this.food.id) food.quantity += 1;
      });
      this.isSelect = true;
      this.saveFood();
    },

    downQuantity() {
      // se inferiore a 0 cancella
      store.foodsCart.forEach((food, index) => {
        if (food.quantity <= 1 && food.id == this.food.id) {
          store.foodsCart.splice(index, 1);
          this.isSelect = false;
        }
        if (food.id == this.food.id) food.quantity -= 1;
      });
      this.saveFood();
    },
  },
};
</script>

<template>
  <Modal />
  <div class="title">
    <div class="food-card row d-flex align-items-center">
      <div @click="setActive()" class="custm-card col d-flex justify-content-around align-items-center gap-3"
        :class="{ active: active }">
        <div class="img-box col text-center">
          <img :src="food.image" alt="" />
        </div>
        <div class="details col">
          <h4 class="mb-4">{{ food.name }}</h4>
          <p><b>Descrizione: </b>{{ food.description }}</p>
          <p><b>Prezzo: </b>€{{ food.price }}</p>
        </div>
      </div>

      <div class="buttons col-2 d-flex flex-column align-items-center">
        <div v-if="isSelect" class="up-e-down">
          <div class="counter">
            <div @click="upQuantity()" class="btn">+</div>
            <div class="count">{{ quantity }}</div>
            <div @click="downQuantity()" class="btn" :class="!quantity ? 'clicked' : ''">
              -
            </div>
          </div>
        </div>
        <div class="cont-btn" v-if="!store.restaurantid || store.restaurantid == food.restaurant_id">
          <button v-if="isSelect" class="btn-remove" @click="removeFood(returnIndex)">
            Rimuovi
          </button>
          <button v-else class="btn-add" @click="addFood(food)">
            Aggiungi
          </button>
        </div>
        <button v-if="store.restaurantid && store.restaurantid != food.restaurant_id" class="btn-add" type="button"
          data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          Aggiungi
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../../assets/scss/style.scss" as *;
@use "../../assets/scss/partial/variables" as *;

.food-card {
  display: flex;
  margin: 25px 10px;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    transition: 0.5s;
  }

  .img-box {
    width: 100%;

    img {
      width: 250px;
      height: 150px;
      object-fit: cover;

      // &:hover {
      //   filter: grayscale(0.5);
      // }
    }
  }

  .buttons {
    label {
      margin-bottom: 5px;
    }

    input {
      width: 50px;
      border-radius: 5px;
      margin-bottom: 20px;
    }
  }
}

.active {
  border: 3px solid;
}

.custm-card {
  position: relative;
  border-radius: 10px;
  cursor: pointer;

  &.active .overlay {
    height: 30%;

    h4 {
      visibility: visible;
      color: white;
    }
  }

  &:hover .overlay {
    height: 35%;

    h4 {
      visibility: visible;
      color: white;
    }
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
  }

  .overlay {
    height: 0%;
    background-color: #11090396;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    transition: height 0.5s;
    display: flex;
    border-radius: 0 0 10px 10px;

    h4 {
      margin: 0;
      visibility: hidden;
      color: #11090300;
      transition: color 1s;
    }
  }
}

.up-e-down {
  .counter {
    margin-left: 0;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .count {
    font-size: 15px;
    padding: 0px 10px 0 10px;
    font-weight: 900;
    color: #202020;
  }
}

.btn-add {
  padding: 5px 10px;
  text-align: center;
  font-size: 15px;
  text-decoration: none;
  background-color: $orange;
  color: $white;
  border: 1px solid $dark-orange;
  border-radius: 10px;

  &:hover {
    color: $brown;
    background-color: $white;
  }
}

.btn-remove {
  padding: 5px 10px;
  text-align: center;
  font-size: 15px;
  text-decoration: none;
  background-color: red;
  color: $white;
  border: 1px solid $brown;
  border-radius: 10px;

  &:hover {
    color: red;
    background-color: $white;
  }
}

@media screen and (max-width: 1000px) {
  .food-card {
    position: relative;
  }

  .buttons {
    position: absolute;
    right: 2px;
    bottom: 10px;
  }
}

@media screen and (max-width: 780px) {
  .img-box {
    display: none;
  }
}

@media screen and (max-width: 567px) {
  .container .row .img-box {
    width: 150px;

    img {
      width: 150px;
      height: 130px;
    }
  }
}
</style>
