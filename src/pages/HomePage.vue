<script>
import { store } from '../data/store'
import axios from 'axios';
import TypologyCard from '../components/Cards/TypologyCard.vue'
import RestaurantCard from '../components/Cards/RestaurantCard.vue'

const baseUri = 'http://127.0.0.1:8000/api/';
export default {
    name: 'HomePage',
    components: { TypologyCard, RestaurantCard },
    data: () => ({
        store,
        typologies: [],

    }),
    computed: {

    },
    methods: {
        fetchTypologies() {
            axios.get(baseUri + 'typologies')
                .then((res) => { this.typologies = res.data; })
                .catch((err) => { console.error(err) })
        },
        newArray() {
            this.typologies.forEach(typology => {
                if (store.currentTypology.includes(typology.id)) {
                    typology.restaurants.forEach(restaurant => {
                        if (!store.restaurants.includes(restaurant)) {
                            store.restaurants.push(restaurant);
                        }
                    });
                }
                store.restaurants.forEach(restaurant => {
                    if (!store.currentTypology.includes(restaurant.pivot.typology_id))
                        store.restaurants.splice(restaurant, 1);
                });
            });
        }
    },
    created() {
        this.fetchTypologies();
    }

}
</script>

<template>
    <div class="container">
        <div class="d-flex flex-wrap pt-5 justify-content-center gap-2">
            <typology-card @click="newArray()" v-for="typology in typologies" :key="typology.id"
                :typology="typology"></typology-card>
        </div>

        <div class="d-flex justify-content-center gap-2 mt-5" v-for="typology in store.currentTypology" :key="typology.id">

        </div>
        <div class="d-flex justify-content-center gap-2 mt-5">
            <restaurant-card v-for="restaurant in store.restaurants" :key="restaurant.id"
                :restaurant="restaurant"></restaurant-card>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>