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
    <div @click='setActive()' class="custm-card" :class="{ active: active }">
        <img :src="typology.image" class="img-fluid" :alt="typology.name">
        <div class="overlay align-items-center justify-content-center">
            <h4>{{ typology.name }}</h4>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.active {
    border: 3px solid rgb(255, 0, 0);
}

.custm-card {
    width: 250px;
    height: 180px;
    position: relative;
    border-radius: 10px;
    // background-color: aqua;
    cursor: pointer;

    &.active .overlay {
        height: 30%;

        h4 {
            visibility: visible;
            color: white;
        }
    }

    &:hover .overlay {
        height: 35%;

        h4 {
            visibility: visible;
            color: white;
        }
    }

    img {
        width: 100%;
        height: 100%;
        border-radius: 10px;

    }

    .overlay {
        height: 0%;
        background-color: #11090396;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        transition: height 0.5s;
        display: flex;
        border-radius: 0 0 10px 10px;

        h4 {
            margin: 0;
            visibility: hidden;
            color: #11090300;
            transition: color 1s;
        }
    }
}
</style>