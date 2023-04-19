<script>
export default {
    name: 'ConfirmPaymentPage',
}
</script>

<template>
    <section id="confirm-page">
        <div class="container text-center p-5">
            <font-awesome-icon :icon="['fas', 'circle-check']" class="check" />
            <h1 class="mb-3">Il tuo ordine è stato confermato!</h1>
            <p class="mb-5">Grazie per averci scelto.</p>
            <router-link to="/" class="btn btn-success m-3">Clicca qui per tornare alla Home </router-link>
        </div>
    </section>
</template>


<style scoped lang="scss">
#confirm-page {
    height: 100vh;
    background-color: white;
}

.check {
    font-size: 80px;
    color: green;
    margin: 50px 0px;
}
</style>