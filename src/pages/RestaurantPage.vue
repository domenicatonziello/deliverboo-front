<script>
import axios from 'axios';
import FoodCard from '../components/Cards/FoodCard.vue';
const baseUri = 'http://127.0.0.1:8000/api/';
export default {
    name: 'RestaurantPage',
    data: () => ({
        menu: [],
        name: '',
    }),
    components: { FoodCard },
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

        <h1 class="my-5 text-center">Menù ristorante <span>{{ this.name }}</span></h1>
        <div class="d-flex flex-wrap pt-5 justify-content-center gap-2">
            <food-card v-for="food in menu" :key="food.id" :food="food"></food-card>
        </div>
    </div>
</template>

<style lang="">
    
</style>