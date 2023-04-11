<script>
import { store } from '../../data/store'
export default {
    name: 'RestaurantCard',
    props: { restaurant: Object },
    data: () => ({
        store,
        active: false,
    }),

    methods: {
        setActive() {
            this.active = !this.active;
        }
    }

}
</script>

<template>
    <router-link :to="'restaurants/' + restaurant.id" @click='setActive()' class="card" :class="{ active: active }"
        style="width: 10rem;">
        <img :src="restaurant.logo" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">{{ restaurant.name }}</h5>
        </div>
    </router-link>
</template>

<style lang="scss" scoped>
.active {
    border: 2px solid blue;
}
</style>