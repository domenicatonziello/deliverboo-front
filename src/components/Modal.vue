<script>
import { store } from '../data/store';
export default {
    name: 'ModalVue',
    methods: {
        cartEmpty() {
            (store.foodsCart = []), localStorage.removeItem("Carello"),
                (store.restaurantid = null), localStorage.removeItem('Restaurant ID');
        },
    }
}
</script>

<template>
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel"> Attenzione </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h5>Puoi aggiungere solo cibi dello stesso ristorante</h5>
                    <p>Se vuoi continuare perderai i cibi presenti nel tuo carrello</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary me-auto" data-bs-dismiss="modal">Annulla</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="cartEmpty()">Svuota
                        carrello</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>