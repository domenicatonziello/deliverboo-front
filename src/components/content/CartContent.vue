<script>
import { store } from "../../data/store";

export default {
  name: "CartContent",
  data: () => ({ store, tot_price: 0 }),
  props: { foodCart: Object },
  emits: {},
  computed: {
    getPrice() {
      this.tot_price = Number(
        this.foodCart.price * this.foodCart.quantity
      ).toFixed(2);
    },
  },
  watch: {
    getPrice() {},
  },
};
</script>

<template>
  <!-- food Cart -->
  <div class="container-food-cart">
    <div class="food-cart my-3">
      <div class="food-cont">{{ foodCart.name }} (€{{ foodCart.price }})</div>

      <div class="food-price">
        <div class="counter">
          <div class="count">Quantità: {{ foodCart.quantity }}</div>
        </div>
        <div class="price">
          € <span>{{ tot_price }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../../assets/scss/partial/variables.scss" as *;

.container-food-cart {
  display: flex;
  border-top: 1px solid $white;

  .food-cont {
    display: block;
  }

  .food-cart {
    width: 100%;
    padding: 10px 5px 10px 5px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    .clicked,
    &:hover {
      background-color: rgba(181, 118, 0, 0.537);
    }
  }

  .counter {
    margin-left: 0;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .food-price {
    display: flex;
    align-items: center;
  }
}

.btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 900;
  color: #202020;
  cursor: pointer;
}

.count {
  font-size: 15px;
  padding: 0px 10px 0 10px;
  font-weight: 900;
  color: #202020;
}

@media screen and (max-width: 992px) {
  .container-food-cart {
    display: flex;
    border-top: 1px solid $white;

    .counter {
      margin-right: 20px;

      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .food-cart {
      width: 100%;
      padding: 10px 5px 10px 5px;

      display: flex;
      justify-content: space-between;

      &:hover {
        background-color: rgba(181, 118, 0, 0.537);
      }
    }

    .food-price {
      display: flex;
      align-items: center;
    }
  }
}
</style>
