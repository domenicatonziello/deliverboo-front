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
        <div class="banner-register d-flex justify-content-center align-items-center">
            <h2 class="text-white">Scopri Di Più !</h2>

        </div>
        <div class="info">
            <div
                class="row row-cols-2 row-cols-sm-2 row-cols-md-5 row-cols-lg-6 justify-content-center align-items-center gap-3">
                <div class="col">
                    <h5>Lavora con Deliveboo</h5>
                    <a href="http://127.0.0.1:8000/register" class="button">Registrati</a>
                </div>
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
        </div>
    </footer>
</template>

<style lang="scss" scoped>
@use '../../assets/scss/partial/variables.scss' as *;

footer {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    height: 7vh;
    transition: all 0.7s linear;
    background-color: $dark-blue;
    padding-bottom: 2rem;
    transform: rotate(180deg);


    .button {
        background-color: $primary-bg;
        border-radius: 10px;
        padding: 5px 10px;
        text-decoration: none;
        color: white;
        font-size: 20px;
        margin-bottom: 10px;
    }

    &:hover {
        height: 20vh;
    }

    @media screen and (max-width: 778px) {

        &:hover {
            height: 50vh;
        }
    }


    &:hover .row {
        visibility: visible;
    }

    &:hover .info {
        visibility: visible;
        opacity: 1;
    }



    .banner-register {
        transform: rotate(180deg);
        background-color: $blue;
        border-radius: 15px;
        padding: 15px;
        text-align: center;
        position: absolute;
        bottom: -50px;
        left: 25%;
        right: 25%;
        z-index: 1;
        visibility: visible;
        opacity: 1;
        transition: visibility 0.7s linear, opacity 0.5s linear;
    }

    &:hover .banner-register {

        opacity: 0;
        visibility: hidden;
    }

    .info {

        opacity: 0;
        transition: visibility 0.7s linear, opacity 0.5s linear;
        padding-bottom: 1rem;
        color: #ffffff;
        transform: rotate(180deg);
        visibility: hidden;

    }

    .row {
        width: 100%;
        margin: 0;

        .col {
            background-color: rgb(78, 89, 140);
            border-radius: 15px;
            height: 100px;
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