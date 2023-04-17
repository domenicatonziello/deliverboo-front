import { reactive } from 'vue';
export const store = reactive({
    currentTypology: [],
    restaurants: [],
    isLoading: false,
    cart: false,
    foodsCart: [],
    quantityFood: null,
    city: '',
    addedCity: false,
    fullSizeMain: false,
});