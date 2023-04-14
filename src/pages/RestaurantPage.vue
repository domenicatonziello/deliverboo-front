<script>
import { store } from "../data/store";
import axios from "axios";
import FoodCard from "../components/Cards/FoodCard.vue";
import CartContent from "../components/content/CartContent.vue";
const baseUri = "http://127.0.0.1:8000/api/";
export default {
    name: 'RestaurantPage',
    data: () => ({
        store,
        menu: [],
        name: '',
        address: '',
        phone_number: '',
        description: '',
        subtotal: 0,
        min_order: 0,
        shipment_price: 0,
        logo: ''

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
                    this.address = res.data.restaurant.address
                    this.phone_number = res.data.restaurant.phone_number
                    this.description = res.data.restaurant.description
                    this.min_order = res.data.restaurant.min_order
                    this.shipment_price = res.data.restaurant.shipment_price
                    this.logo = res.data.restaurant.logo
                    // console.log(res.data.restaurant.name)
                    // console.log(this.menu)
                    // console.log(this.$route.params.id)

                })
                .catch((err) => { console.error(err) })
                .then((res) => { store.isLoading = false });
        },
    },
    created() {
        store.isLoading = true
        this.fetchRestaurants()
    }

}
</script>

<template>
    <div class="container px-5">
        <div class="row d-flex justify-content-center align-items-center text-center">


            <!-- Restaurant-->
            <div :class="!store.cart ? 'col-12 mb-5' : 'col-10 mb-5'">
                <!-- Restaurant Name-->
                <h1 class="mt-5 text-center bg-white restaurant-title"> <span>{{ this.name }}</span></h1>

                <!-- Restaurant Elements-->
                <div class="row d-flex flex-wrap pt-3 restaurant-card justify-content-between gap-3">

                    <!-- Restaurant Details-->
                    <div class="col-3 description">
                        <div class="img-box"><img src="../../public/img/ristorante.webp" alt=""></div>
                        <div class="text">
                            <h5><a href="">{{ this.address }}</a></h5>
                            <h5><a href="">Numero: {{ this.phone_number }}</a></h5>
                            <h6>Minimo Ordine: €{{ this.min_order }}</h6>
                            <h6>Costo Spedizione: €{{ this.shipment_price }}</h6>
                            <p>{{ this.description }}</p>
                        </div>
                    </div>

                    <!-- Restaurant Menu-->
                    <div class="col menu">
                        <h1 class="text-center mb-5">Menù</h1>
                        <food-card v-for="food in menu" :key="food.id" :food="food"></food-card>
                    </div>


                </div>
            </div>

            <!-- Cart -->
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
            <div v-else class="d-flex justify-content-center align-items-center text-white">
                Il carello è Vuoto
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

        .text>* {
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
    border: 2px solid rgb(255, 233, 218);

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

@media screen and (max-width: 1000px) {
    .restaurant-card {
        .description {
            width: 100%;
        }

        .menu {
            width: 100%;
        }
    }
}

@media screen and (max-width: 1000px) {
    .restaurant-card {
        .description {
            width: 100%;
        }

        .menu {
            width: 100%;
        }
    }
}
</style>
