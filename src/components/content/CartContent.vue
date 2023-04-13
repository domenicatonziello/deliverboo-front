<script>
export default {
    name: 'CartContent',
    data: () => ({
        subtotal: 0,
    }),
    props: { foodCart: Object },
    methods: {
        setActive() {
            this.active = !this.active;
        }
    }
}
</script>

<template>
    <div class="container h-100">

        <div class="row p-2 ms-2">

            <!-- food Cart -->
            <div class="row px-0 py-2">
                <div class="col-8">
                    {{ foodCart.name }}
                </div>
                <div class="col-4 text-end">€ <span>{{ foodCart.price }}</span></div>
            </div>

            <!-- total price -->
            <div class="row p-0 align-items-end h-50">
                <hr>

                <div class="col-8">
                    Shipment price:
                </div>
                <div class="col-4 text-end">€ <span>{{ foodCart.shipment_price }}</span></div>
                <div class="col-6 py-2">
                    Subtotal:
                </div>
                <div class="col-6 text-end py-2">€ <span>{{ subtotal }}</span></div>
            </div>

        </div>
    </div>
</template>

<style lang="scss" scoped>
* {
    font-size: 11px;
}
</style>