<script>
import { store } from '../data/store';
import axios from 'axios';
import FoodCard from '../components/Cards/FoodCard.vue';
import CartContent from '../components/content/CartContent.vue';
const baseUri = 'http://127.0.0.1:8000/api/';
export default {
    name: 'RestaurantPage',
    data: () => ({
        store,
        menu: [],
        name: '',
    }),
    components: { FoodCard, CartContent },
    methods: {
        fetchRestaurants() {
            axios.get(baseUri + 'restaurants/' + this.$route.params.id)
                .then((res) => {
                    this.menu = res.data.foods
                    this.name = res.data.restaurant.name
                    // console.log(res.data.restaurant.name)
                    // console.log(this.menu)
                    // console.log(this.$route.params.id)

                })

                .catch((err) => { console.error(err) })
        },
    },
    created() {
        this.fetchRestaurants()
    }

}
</script>

<template>
    <div class="container">
        <div class="row">
            <div :class="!store.cart ? 'col-12' : 'col-10'">
                <h1 class="my-5 text-center">Menù ristorante <span>{{ this.name }}</span></h1>
                <div class="d-flex flex-wrap pt-5 justify-content-center gap-2">
                    <food-card v-for="food in menu" :key="food.id" :food="food"></food-card>
                </div>
            </div>
            <div class="col-2" v-if="store.cart">
                <div class="cart">
                    <cart-content :foodCart="store.foodsCart"></cart-content>
                </div>
            </div>

        </div>




    </div>
</template>

<style lang="scss">
.cart {
    background-color: #fff;
    // struttura
    min-height: 50px;
    width: 220px;

    // stile
    border-radius: 20px;
    border: 2px solid black;
}
</style>