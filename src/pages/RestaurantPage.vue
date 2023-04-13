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
        subtotal: 0,
        shipment_price: 0,

    }),
    components: { FoodCard, CartContent },
    computed: {
        getTotalPrice() {
            this.subtotal = Number(this.shipment_price);
            store.foodsCart.forEach(food => {
                this.subtotal += Number(food.price);
            });
            this.subtotal = this.subtotal.toFixed(2);
        }

    },
    methods: {
        fetchRestaurants() {
            axios.get(baseUri + 'restaurants/' + this.$route.params.id)
                .then((res) => {
                    this.menu = res.data.foods
                    this.name = res.data.restaurant.name
                    this.shipment_price = res.data.restaurant.shipment_price
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
                    <div class="container h-100 d-flex justify-content-center">

                        <div class="row p-3 h-100">
                            <cart-content v-for="foodCart in store.foodsCart" :foodCart="foodCart"></cart-content>
                            <!-- total price -->
                            <div v-if="store.foodsCart.length >= 1" class="row p-0 align-items-end h-50">
                                <hr>

                                <div class="col-8">
                                    Shipment price:
                                </div>
                                <div class="col-4 text-end">€ <span>{{ this.shipment_price }}</span></div>
                                <div class="col-6 py-2">
                                    Subtotal:
                                </div>
                                <div class="col-6 text-end py-2">€ <span>{{ this.subtotal }}</span></div>
                            </div>
                            <div v-else class="d-flex align-items-center">Carello Vuoto</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>




    </div>
</template>

<style lang="scss" scoped>
.cart {
    background-color: #fff;
    // struttura
    min-height: 50px;
    width: 220px;

    // stile
    border-radius: 20px;
    border: 2px solid black;

    * {
        font-size: 11px;
    }
}
</style>