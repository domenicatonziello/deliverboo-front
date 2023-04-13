<script>
export default {
    name: 'CartContent',
    data: () => ({
    }),
    props: { foodCart: Object },
    methods: {
    }
}
</script>

<template>
    <!-- food Cart -->
    <div class="row px-0 py-2">
        <div class="col-8">
            {{ foodCart.name ? foodCart.name : 'nessun prodotto' }}
        </div>
        <div class="col-4 text-end">€ <span>{{ foodCart.price }}</span></div>
    </div>
</template>

<style lang="scss" scoped></style>