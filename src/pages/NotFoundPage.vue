<script>
export default {
    name: 'NotFoundPage',

}
</script>

<template>
    <section id="not-found-page">
        <h1>404| Not Found</h1>
    </section>
</template>

<style lang="scss" scoped>
#not-found-page {
    height: calc(100vh - 80px);
    display: flex;
    justify-content: center;
    align-items: center;

    h1 {
        font-size: 120px;
        color: #4e598c;
    }
}
</style>