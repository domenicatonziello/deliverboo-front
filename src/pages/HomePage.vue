<script>
import { store } from "../data/store";
import axios from "axios";
import TypologyCard from "../components/Cards/TypologyCard.vue";
import AppJumbotron from "../components/content/AppJumbotron.vue";
import RestaurantCard from "../components/Cards/RestaurantCard.vue";
import Carosel from "../components/Cards/Carosel.vue";

const baseUri = "http://127.0.0.1:8000/api/";
export default {
    name: "HomePage",
    components: { TypologyCard, RestaurantCard, Carosel, AppJumbotron },
    data: () => ({
        store,
        typologies: [],
        id_typologies: "",
    }),
    computed: {
        getString() {
            return (this.id_typologies = store.currentTypology.toString());
        },
    },
    methods: {
        fetchTypologies() {
            store.isLoading = true;

            axios
                .get(baseUri + "typologies")
                .then((res) => {
                    this.typologies = res.data;
                })
                .catch((err) => {
                    console.error(err);
                })
                .then((res) => {
                    store.isLoading = false;
                });
        },
        onClick() {
            if (store.currentTypology.length > 0) {
                store.isLoading = true;
                axios
                    .get(
                        baseUri + "restaurants/?types=" + store.currentTypology.toString()
                    )
                    .then((res) => {
                        store.restaurants = res.data;
                    })
                    .catch((err) => {
                        console.error(err);
                    })
                    .then((res) => {
                        store.isLoading = false;
                    });
            } else {
                store.restaurants = [];
            }
        },
    },
    created() {
        this.fetchTypologies();
    },
};
</script>

<template>
    <AppJumbotron />
    <!-- tipologie -->
    <section id="typology">
        <div class="container">
            <h2 class="mb-5">Le nostre tipologie</h2>
            <carosel>
                <typology-card @click="onClick()" v-for="typology in typologies" :key="typology.id"
                    :typology="typology"></typology-card>
            </carosel>

            <div class="d-flex justify-content-center gap-2 mt-5">
                <restaurant-card v-for="restaurant in store.restaurants" :key="restaurant.id"
                    :restaurant="restaurant"></restaurant-card>
            </div>
        </div>
    </section>
    <!-- footer -->
    <footer>
        <div class="banner-register">
            <h2 class="text-white mb-4">Unisciti a noi!</h2>
            <a href="http://127.0.0.1:8000/register" class="button">Registrati</a>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partial/variables.scss' as *;

#typology {
    min-height: 200px;
    background-color: rgb(255, 233, 218);
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    padding: 100px 0;

    h2 {
        text-shadow: 2px 1px 2px $brown;
        color: $primary-bg;
        font-size: 40px;
    }
}

footer {
    height: 150px;
    background-color: $dark-blue;
    position: relative;

    .banner-register {
        background-color: $blue;
        border-radius: 15px;
        padding: 30px;
        text-align: center;

        position: absolute;
        top: -50px;
        left: 20%;
        right: 20%;

        .button {
            background-color: $primary-bg;
            border-radius: 10px;
            padding: 10px 20px;
            text-decoration: none;
            color: white;
            font-size: 20px;
        }
    }
}
</style>
