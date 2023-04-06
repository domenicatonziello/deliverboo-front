<script>
import axios from 'axios';
const baseUri = 'http://127.0.0.1:8000/api/';
export default {
    name: 'TypologyPage',
    data: () => ({
        typologies: [],
    }),
    computed: {
        // getRestaurant() {
        //     const restaurant = this.restaurants.filter(restaurant => restaurant.typologies.id === params.id);
        //     console.log(restaurant);
        // }
    },
    methods: {
        fetchRestaurants() {
            axios.get(baseUri + 'typologies/' + this.$route.params.id)
                .then((res) => { this.typologies = res.data.restaurants })
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
        <router-link :to="{ name: '' }" v-for="restaurant in typologies" :key="restaurant.id">
            <li>{{ restaurant.name }}</li>
            <!-- <li v-for="restaurant in typology.restaurants" :key="restaurant.id">{{ restaurant.name }}</li> -->
        </router-link>
    </div>
</template>

<style lang="scss" scoped></style>