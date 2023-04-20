import { reactive } from "vue";
export const store = reactive({
    currentTypology: [],
    restaurants: [],
    isLoading: false,
    cart: false,
    foodsCart: [],
    quantityCart: null,
    city: "",
    addedCity: false,
    fullSizeMain: false,
    ristorante: false,
    message: '',
    restaurantid: null,
});

// assegnare il restaurant_id nel local storage