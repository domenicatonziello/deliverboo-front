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
        newArray() {
            this.store.currentTypology.forEach(typology => {
                console.log(typology);
            });

        }
    },
    methods: {
        fetchTypologies() {
            axios.get(baseUri + 'typologies')
                .then((res) => { this.typologies = res.data; })
                .catch((err) => { console.error(err) })
        }
    },
    created() {
        this.fetchTypologies(),
            this.newArray
    }

}
</script>

<template>
    <div class="container">
        <div class="d-flex flex-wrap pt-5 justify-content-center gap-2">
            <typology-card v-for="typology in typologies" :key="typology.id" :typology="typology"></typology-card>
        </div>

        <div class="d-flex justify-content-center gap-2 mt-5" v-for="typology in store.currentTypology" :key="typology.id">
            <restaurant-card v-for="restaurant in typology.restaurants" :key="restaurant.id"
                :restaurant="restaurant"></restaurant-card>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>