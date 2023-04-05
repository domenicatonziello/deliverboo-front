<script>
import axios from 'axios';
const baseUri = 'http://127.0.0.1:8000/api/';
export default {
    name: 'HomePage',
    data: () => ({
        typologies: [],
    }),
    methods: {
        fetchTypologies() {
            axios.get(baseUri + 'typologies')
                .then((res) => { this.typologies = res.data; })
                .catch((err) => { console.error(err) })
        }
    },
    created() {
        this.fetchTypologies()
    }

}
</script>

<template>
    <div class="container">
        <router-link :to="{ name: 'typology', params: { id: typology.id } }" v-for="typology in typologies"
            :key="typology.id">
            <li>{{ typology.name }}</li>
            <!-- <li v-for="restaurant in typology.restaurants" :key="restaurant.id">{{ restaurant.name }}</li> -->
        </router-link>
    </div>
</template>

<style lang="scss" scoped></style>