<script>
import axios from 'axios';
const baseUri = 'http://127.0.0.1:8000/api/';
export default {
    name: 'TypologyPage',
    data: () => ({
        restaurants: [],
        filterRestaurants: []
    }),
    computed: {
        // getRestaurant() {
        //     const restaurant = this.restaurants.filter(restaurant => restaurant.typologies.id === params.id);
        //     console.log(restaurant);
        // }
    },
    methods: {
        fetchRestaurants() {
            axios.get(baseUri + 'restaurants/')
                .then((res) => {

                    this.restaurants = res.data;

                    this.filterRestaurants = this.restaurants.filter(restaurant => {
                        restaurant.typologies.filter(typology => typology.id == 2)
                    })
                    console.log(this.filterRestaurants);
                    // this.restaurants.forEach(restaurant, i )
                    // {
                    // if (restaurant.typologies === params.id)
                    //     restaurant = this.filterRestaurants
                    // }
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
        <router-link :to="{ name: '' }" v-for="restaurant in filterRestaurants" :key="restaurant.id">
            <li>{{ restaurant.name }}</li>
            <!-- <li v-for="restaurant in typology.restaurants" :key="restaurant.id">{{ restaurant.name }}</li> -->
        </router-link>
    </div>
</template>

<style lang="scss" scoped></style>