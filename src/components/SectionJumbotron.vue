<script>

export default {
    name: 'SectionJumbotron',

}
</script>

<template lang="">
    <section id="jumbotron">
        <slot></slot>
    </section>
</template>

<style lang="scss">
#jumbotron {
    min-height: 100vh;
    // padding-bottom: 20px;
    background: linear-gradient(297.36deg, #FF8C42 55%, #FEB889 55%, #FEB07C 87.32%, #FCFBF7 143.55%);
}
</style>