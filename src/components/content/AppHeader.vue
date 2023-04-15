<script>
import { store } from "../../data/store";

export default {
  name: "AppHeader",
  data: () => ({
    store,
  }),
  methods: {
    setActiveCart() {
      store.cart = !store.cart;
    },
  },
};
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <router-link :to="'/'">
          <div class="logo">Delive<span>Boo</span></div>
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse flex-grow-0" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto">
            <li class="nav-item mx-3">
              <router-link :to="'/'"> Home </router-link>
            </li>
            <li class="nav-item mx-3">
              <a href="http://127.0.0.1:8000/register">Registrati</a>
            </li>
            <li class="nav-item mx-3">
              <a href="http://127.0.0.1:8000/login">Login</a>
            </li>
            <li class="nav-item mx-3">
              <a href="#" @click="setActiveCart" class="conteiner-cart">
                <font-awesome-icon icon="fa-solid fa-cart-shopping " class="text-white" />
                <div class="cart-count d-flex align-items-center justify-content-center"
                  :class="store.foodsCart.length ? 'd-flex' : 'd-none'">
                  <span>{{ store.foodsCart.length }}</span>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
header {

  padding: 10px;
  min-height: 12vh;
  width: 100%;
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  background: linear-gradient(297.36deg,
      #ff8c42 44.61%,
      #feb889 44.61%,
      #feb07c 87.32%,
      #fcfbf7 143.55%);
  z-index: 1;


  ul {
    list-style-type: none;
    flex-direction: row;
    justify-content: center;
    margin: 2rem 0;
  }

  .logo {
    color: white;
    // margin-left: 60px;
    font-size: 60px;
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

@media screen and (max-width: 550px) {
  header {
    .logo {
      font-size: 40px;
    }
  }
}
</style>
