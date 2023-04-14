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
        <div class="container-fluid">

            <div class="row">
                <div class="col-9">
                    <router-link :to="'/'">
                        <div class="logo">Delive<span>Boo</span></div>
                    </router-link>
                </div>
                <div class="col-3 d-none d-lg-flex justify-content-between align-items-center">
                    <router-link :to="'/'">
                        Home
                    </router-link>
                    <a href="http://127.0.0.1:8000/register">Registrati</a>
                    <a href="http://127.0.0.1:8000/login">Login</a>
                    <a href="#" @click="setActiveCart" class="cart">
                        <font-awesome-icon icon="fa-solid fa-cart-shopping " class="text-white" />
                        <div class="countCart d-flex align-items-center justify-content-center p-0 m-0">
                            {{ store.foodsCart.length }}
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
header {
    padding: 10px;
    height: 80px;
    width: 100%;
    // background-color: rgba(00, 09, 35, 0.4);

    // &:hover {
    // }

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

    .mobile-nav {
        display: none;
    }

    .web-nav {
        display: flex;
    }

}

@media screen and (max-width: 550px) {
    header {
        .logo {
            font-size: 40px;
        }

        .mobile-nav {
            display: flex;

            .fa-bars {
                font-size: 2rem;
            }
        }

        .web-nav {
            display: none;
        }
    }
}

.cart {
    position: relative;

    .countCart {
        background-color: #000935;
        height: 12px;
        width: 12px;
        border-radius: 50%;
        position: absolute;
        top: -1px;
        right: 0;
        font-size: 10px;
        font-weight: bold;
    }
}
</style>