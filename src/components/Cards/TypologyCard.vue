<script>
import { store } from '../../data/store'
export default {
    name: 'TypologyCard',
    props: { typology: Object },

    data: () => ({
        store,
        active: false,

    }),
    methods: {
        setActive() {

            this.active = !this.active;
            const getIndex = store.currentTypology.indexOf(this.typology.name);

            if (this.active) {
                store.currentTypology.push(this.typology);
            } else {
                store.currentTypology.splice(getIndex);
            }
        }
    }

}
</script>

<template>
    <div @click='setActive()' class="card" :class="{ active: active }" style="width: 10rem;">
        <img :src="typology.image" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">{{ typology.name }}</h5>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.active {
    border: 2px solid blue;
}
</style>