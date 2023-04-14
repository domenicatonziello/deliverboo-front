<script>
import { store } from '../../data/store';
export default {
    name: 'FoodCard',
    props: { food: Object },
    data: () => ({
        store,
        active: false,
    }),

    methods: {
        setActive() {
            this.active = !this.active;
            const getIndex = store.foodsCart.indexOf(this.food)

            if (this.active) {
                store.foodsCart.push(this.food)
            } else {
                store.foodsCart.splice(getIndex, 1)
            }
        }
    }

}
</script>

<template>
    <div class="title">
        <div class="food-card row d-flex align-items-center">
            <div @click='setActive()' class="custm-card col d-flex justify-content-around align-items-center gap-4"
                :class="{ active: active }">

                <div class="img-box col-3">
                    <img :src="food.image" alt="">
                </div>
                <div class="details col">
                    <h4 class="mb-4">{{ food.name }}</h4>
                    <p><b>Descrizione: </b>{{ food.description }}</p>
                    <p><b>Prezzo: </b>€{{ food.price }}</p>
                </div>

            </div>
            <div class="buttons col-2 d-flex flex-column align-items-center">
                <label for="">Quantità</label>
                <input type="number">
                <a class="btn btn-success" href="">Aggiungi</a>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "../../assets/scss/style.scss" as *;
@use "../../assets/scss/partial/variables" as *;

.food-card {
    display: flex;
    margin: 25px 10px;
    cursor: pointer;

    &:hover {
        color: grey;
    }

    .img-box {
        img {
            width: 100%;
            height: 125px;
            object-fit: cover;

            &:hover {
                filter: grayscale(0.5);
            }

        }
    }

    .buttons {
        label {
            margin-bottom: 5px;
        }

        input {
            width: 50px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
    }
}


.active {
    border: 3px solid;
}

.custm-card {
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
        object-fit: cover;
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