<script>
import { store } from '../../data/store';

export default {
    name: 'AppFooter',
    data: () => ({
        store,
    }),

}


</script>

<template>
    <!-- footer -->
    <footer>
        <div class="banner-register">
            <h2 class="text-white mb-4 d-none d-sm-block">Unisciti a noi!</h2>
            <a href="http://127.0.0.1:8000/register" class="button">Registrati</a>
        </div>
        <div>
            <h3 class="text-center info">Maggiori Informazioni</h3>
        </div>
        <div class="row row-cols-2 row-cols-sm-2 row-cols-md-4 row-cols-lg-6 justify-content-center gap-3">

            <div class="col">
                <ul class="list">
                    <li class="list_item"><a href="#" aria-current="page"
                            class="item_link font-bold text-3xl hover:opacity-75 hover:text-white block router-link-exact-active router-link-active"
                            title="Vai a Scopri DeliveBoo">
                            Scopri DeliveBoo
                        </a></li>
                    <li class="list_item"><a href="#"
                            class="item_link font-bold text-3xl hover:opacity-75 hover:text-white block"
                            title="Vai a Chi Siamo">
                            Chi Siamo
                        </a></li>
                    <li class="list_item"><a href="#" aria-current="page"
                            class="item_link font-bold text-3xl hover:opacity-75 hover:text-white block router-link-exact-active router-link-active"
                            title="Vai a Ristoranti">
                            Ristoranti
                        </a></li>
                </ul>
            </div>
            <div class="col">
                <ul class="list">
                    <li class="list_item"><a href="#" aria-current="page"
                            class="item_link font-bold text-3xl hover:opacity-75 hover:text-white block router-link-exact-active router-link-active"
                            title="Vai a Note legali">
                            Note legali
                        </a></li>
                    <li class="list_item"><a href="#" aria-current="page"
                            class="item_link font-bold text-3xl hover:opacity-75 hover:text-white block router-link-exact-active router-link-active"
                            title="Vai a Termini &amp; condizioni">
                            Termini &amp; condizioni
                        </a></li>
                    <li class="list_item"><a href="#" aria-current="page"
                            class="item_link font-bold text-3xl hover:opacity-75 hover:text-white block router-link-exact-active router-link-active"
                            title="Vai a Informativa sulla privacy">
                            Informativa sulla privacy
                        </a></li>
                    <li class="list_item"><a href="#" aria-current="page"
                            class="item_link font-bold text-3xl hover:opacity-75 hover:text-white block router-link-exact-active router-link-active"
                            title="Vai a Cookies">
                            Cookies
                        </a></li>
                </ul>
            </div>
            <div class="col">
                <ul class="list">
                    <li class="list_item"><a href="#" aria-current="page"
                            class="item_link font-bold text-3xl hover:opacity-75 hover:text-white block router-link-exact-active router-link-active"
                            title="Vai a Help">
                            Help
                        </a></li>
                    <li class="list_item"><a href="#" aria-current="page"
                            class="item_link font-bold text-3xl hover:opacity-75 hover:text-white block router-link-exact-active router-link-active"
                            title="Vai a FAQ">
                            FAQ
                        </a></li>
                    <li class="list_item"><a href="#"
                            class="item_link font-bold text-3xl hover:opacity-75 hover:text-white block"
                            title="Vai a Contatti">
                            Contatti
                        </a></li>
                </ul>
            </div>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
@use '../../assets/scss/partial/variables.scss' as *;

footer {
    position: sticky;
    bottom: 0;
    right: 0;
    left: 0;
    min-height: 25.6vh;
    background-color: $dark-blue;
    padding-bottom: 2rem;


    .banner-register {
        background-color: $blue;
        border-radius: 15px;
        padding: 30px;
        text-align: center;

        position: absolute;
        top: -50px;
        left: 20%;
        right: 20%;

        .button {
            background-color: $primary-bg;
            border-radius: 10px;
            padding: 10px 20px;
            text-decoration: none;
            color: white;
            font-size: 20px;
        }
    }

    .info {
        padding-top: 6.5rem;
        margin-bottom: 1rem;
        color: #ffffff;
    }

    .row {
        width: 100%;
        margin: 0;


        .col {
            background-color: rgb(78, 89, 140);
            border-radius: 15px;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 0;
            margin: 0;

            li {
                list-style: none;
                padding: 0;
                margin: 0;

                a {
                    color: white;
                    text-decoration: none;
                    font-weight: bold;

                    &:hover {
                        color: #FF8C42;
                    }
                }
            }

            .list {
                margin: 0;
                padding: 0;

            }
        }
    }
}
</style>