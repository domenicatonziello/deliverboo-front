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
        typologies: []
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
        <div class="slider-container d-flex justify-content-center">
            <div class="slider-content d-flex align-items-center">
                <i class="fa-solid fa-arrow-left"></i>
                <div class="carousel d-flex">
                    <typology-card @click="newArray()" v-for="typology in typologies" :key="typology.id"
                        :typology="typology"></typology-card>
                </div>
                <i class="fa-solid fa-arrow-right"></i>
            </div>
        </div>
        <div class="d-flex justify-content-center gap-2 mt-5">
            <restaurant-card v-for="restaurant in store.restaurants" :key="restaurant.id"
                :restaurant="restaurant"></restaurant-card>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.slider-container {
    padding: 3rem;

    .slider-content {
        margin: 0 10px;
        max-width: 1200px;

        .fa-solid {
            cursor: pointer;
            margin-left: 1rem;
            margin-right: 1rem;
            background-color: white;
            border-radius: 30px;
            padding: 1rem;

            &:hover {
                transform: translateY(-10%) scale(1.1);
                background: #f2f2f2;

            }
        }

        .carousel {
            white-space: nowrap;
            overflow-x: hidden;
        }
    }
}

@media screen and (max-width: 900px) {
    .slider-content {
        min-width: calc(100%/2);
    }
}

@media screen and (max-width: 550px) {
    .slider-content {
        min-width: 100%;
    }
}
</style>