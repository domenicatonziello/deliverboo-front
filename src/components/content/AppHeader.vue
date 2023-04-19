<script>
import { store } from "../../data/store";

export default {
  name: "AppHeader",

  data: () => ({
    store,
    isActive: false,
  }),
  computed: {
    totQuantity() {
      store.quantityCart = 0;
      return store.foodsCart.forEach((food) => {
        store.quantityCart += food.quantity;
      });
    },
  },
  methods: {
    setActiveCart() {
      store.cart = !store.cart;
      if (store.cart) {
        this.isActive = true;
      } else {
        this.isActive = false;
      }
    },
  },
  watch: {
    totQuantity() {
      console.log("carrello");
    },
  },
};
</script>

<template>
  <header>
    <nav class="navbar h-100 navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <router-link class="cont-logo" :to="'/'">
          <div class="logo">Delive<span>Boo</span></div>
        </router-link>
        <div
          class="collapse navbar-collapse flex-grow-0"
          id="navbarSupportedContent"
        >
          <ul class="navbar-nav p-0 me-auto">
            <li class="nav-item mx-3">
              <router-link :to="'/'"> Home </router-link>
            </li>
            <li class="nav-item mx-3">
              <a href="http://127.0.0.1:8000/register">Registrati</a>
            </li>
            <li class="nav-item mx-3">
              <a href="http://127.0.0.1:8000/login">Login</a>
            </li>
            <li v-if="store.ristorante" class="nav-item mx-3">
              <a href="#" @click="setActiveCart" class="conteiner-cart">
                <font-awesome-icon
                  icon="fa-solid fa-cart-shopping "
                  class="text-white"
                />
                <div
                  class="cart-count d-flex align-items-center justify-content-center"
                  :class="store.foodsCart.length ? 'd-flex' : 'd-none'"
                >
                  <span>{{ store.quantityCart }}</span>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <section class="nav-mobile">
    <div>
      <router-link :to="'/'">
        <i class="fa-solid fa-house">
          <p>Home</p>
        </i></router-link
      >
    </div>
    <div>
      <a href="http://127.0.0.1:8000">
        <i class="fa-solid fa-user">
          <p>Login</p>
        </i>
      </a>
    </div>
    <div v-if="!store.ristorante" class="other">
      <router-link :to="'/other'">
        <i class="fa-solid fa-circle-up">
          <p>Altro</p>
        </i>
      </router-link>
    </div>
    <div v-if="store.ristorante">
      <a
        href="#"
        @click="setActiveCart"
        :class="{ active: isActive }"
        class="conteiner-cart"
      >
        <i class="fa-solid fa-cart-shopping">
          <p>Carrello</p>
        </i>
        <div
          class="cart-count d-flex align-items-center justify-content-center"
          :class="store.foodsCart.length ? 'd-flex' : 'd-none'"
        >
          <span>{{ store.quantityCart }}</span>
        </div>
      </a>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "../../assets/scss/partial/variables.scss" as *;

header {
  width: 100%;
  height: 100px;
  position: static;
  top: 0;
  right: 0;
  left: 0;
  // background: linear-gradient(
  //   297.36deg,
  //   #ff8c42 44.61%,
  //   #feb889 44.61%,
  //   #feb07c 87.32%,
  //   #fcfbf7 143.55%
  // );
  z-index: 1;

  ul {
    list-style-type: none;
    flex-direction: row;
    justify-content: center;
    margin: 2rem 0;
  }

  .cont-logo {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .logo {
    color: white;
    // margin-left: 60px;
    font-size: 35px;
    font-weight: bold;

    span {
      color: #ff6807;
    }
  }

  a {
    text-decoration: none;
    font-size: 18px;
    color: white;
  }

  .active {
    background: none;
  }
}

.nav-mobile {
  display: none;
}

.conteiner-cart {
  position: relative;

  .cart-count {
    // structure
    background-color: #0032f9;
    height: 13px;
    width: 13px;
    border-radius: 50%;
    // position
    position: absolute;
    top: -5px;
    right: -3px;
    // count
    font-size: 10px;
    font-weight: bold;
  }
}

@media screen and (max-width: 1000px) {
  .nav-mobile {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 80px;
    z-index: 2;
    background-color: $white;
    justify-content: space-around;
    padding: 10px;
    // box-shadow: 0px -5px 14px -3px $orange;
    border-top: 1px solid $orange;

    i {
      font-size: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    a {
      text-decoration: none;
      color: $orange;
    }
    .cart-count {
      background-color: #0032f9;
      height: 20px;
      width: 20px;
      border-radius: 50%;
      position: absolute;
      top: -5px;
      right: -3px;
      font-size: 12px;
      font-weight: bold;
    }
  }

  .nav-mobile > * {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &:hover {
      transform: scale(1.2);
      transition: 0.4s;
    }

    & > * {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    p {
      margin: 0;
    }
  }

  .other {
    cursor: pointer;
  }
}

.active {
  background-color: $secondary-bg;
  border-radius: 10px;

  & > * {
    color: white;
    padding: 8px;
  }
}

@media screen and (max-width: 550px) {
  header {
    .logo {
      font-size: 40px;
    }
  }
}
</style>
