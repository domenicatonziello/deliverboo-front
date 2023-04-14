<script>
import { store } from '../../data/store';

export default {
    name: 'AppHeader',
    data: () => ({
        store,
    }),
    methods: {
        setActiveCart() {
            store.cart = !store.cart;
        }
    }

}


</script>

<template>
    <header>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <router-link :to="'/'">
                    <div class="logo">Delive<span>Boo</span></div>
                </router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse flex-grow-0" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto ">
                        <li class="nav-item mx-3">
                            <router-link :to="'/'">
                                Home
                            </router-link>
                        </li>
                        <li class="nav-item mx-3">
                            <a href="http://127.0.0.1:8000/register">Registrati</a>
                        </li>
                        <li class="nav-item mx-3">
                            <a href="http://127.0.0.1:8000/login">Login</a>
                        </li>
                        <li class="nav-item mx-3">
                            <a href="#" @click="setActiveCart">
                                <font-awesome-icon icon="fa-solid fa-cart-shopping " class="text-white" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<style lang="scss" scoped>
header {
    padding: 10px;
    // height: 100px;
    width: 100%;

    ul {
        list-style-type: none;
        flex-direction: row;
        justify-content: center;
        margin: 2rem 0;
    }

    .logo {
        color: white;
        // margin-left: 60px;
        font-size: 60px;
        font-weight: bold;

        span {
            color: #ff6807;
        }
    }

    a {
        text-decoration: none;
        font-size: 18px;
        color: white;
    }

}

@media screen and (max-width: 550px) {
    header {
        .logo {
            font-size: 40px;
        }
    }
}

/* DROPDOWN */
</style>