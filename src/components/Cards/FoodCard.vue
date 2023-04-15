<script>
import { store } from '../../data/store';
export default {
    name: 'FoodCard',
    props: { food: Object, index: Number },
    data: () => ({
        store,
        active: false,
        getIndex: null,

        carello: [],
        newFood: {
            name: '',
            price: null,
        }
    }),

    mounted() {
        if (localStorage.getItem('Carello')) {
            try {
                store.foodsCart = JSON.parse(localStorage.getItem('Carello'));
            } catch (e) {
                localStorage.removeItem('Carello');
            }
            // store.foodsCart = JSON.parse(localStorage.foodsCart)
        }
    },
    watch: {
        foodsCart: {
            handler(addFood) { localStorage.carello = JSON.stringify(addFood) },
            deep: true
        }
    },
    computed: {
        returnIndex() {

            return this.getIndex = store.foodsCart.indexOf(this.food);

        }
    },

    methods: {
        setActive() {
            this.active = !this.active;
            store.cart = true;
            // const getIndex = store.foodsCart.indexOf(this.food);
            console.log(this.returnIndex)

            if (this.active) {
                // store.foodsCart.push(this.food)
                this.addFood(this.food)
            } else {
                // store.foodsCart.splice(getIndex, 1)
                this.removeFood(this.returnIndex)

            }
        },
        addFood(newFood) {
            if (!newFood.name && !newFood.price) return
            store.foodsCart.push(newFood);
            // this.newFood = { name: '', price: null };
            this.saveFood();
            console.log(newFood.id)

        },
        removeFood(food) {
            if (this.food.id == this.index) {
                console.log(food)
                store.foodsCart.splice(food, 1);
                this.saveFood();
            }
        },
        saveFood() {
            let parsed = JSON.stringify(store.foodsCart);
            localStorage.setItem('Carello', parsed);
        },
    },


}
</script>

<template>
    <div @click='setActive()' class="custm-card" :class="{ active: active }">
        <img :src="food.image" class="img-fluid" :alt="food.name">
        <div class="overlay align-items-center justify-content-center">
            <h4>{{ food.name }}</h4>
        </div>
    </div>
    <div>
        <button @click="removeFood(returnIndex)">Remove</button>
        <button @click="addFood(food)">Add Cat</button>
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