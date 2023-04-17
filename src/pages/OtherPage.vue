<script>
export default {
  name: "Otherpage",
};
</script>

<template>
  <div class="info">
    <div
      class="w-100 row row-cols-2 row-cols-sm-2 row-cols-md-5 row-cols-lg-6 justify-content-center gap-3"
    >
      <div class="col">
        <h5>Lavora con Deliveboo</h5>
        <a href="http://127.0.0.1:8000/register" class="button">Registrati</a>
      </div>
      <div class="col">
        <ul class="list px-0">
          <li class="list_item">
            <a
              href="#"
              aria-current="page"
              class="item_link font-bold text-3xl hover:opacity-75 hover:text-white block router-link-exact-active router-link-active"
              title="Vai a Scopri DeliveBoo"
            >
              Scopri DeliveBoo
            </a>
          </li>
          <li class="list_item">
            <a
              href="#"
              class="item_link font-bold text-3xl hover:opacity-75 hover:text-white block"
              title="Vai a Chi Siamo"
            >
              Chi Siamo
            </a>
          </li>
          <li class="list_item">
            <a
              href="#"
              aria-current="page"
              class="item_link font-bold text-3xl hover:opacity-75 hover:text-white block router-link-exact-active router-link-active"
              title="Vai a Ristoranti"
            >
              Ristoranti
            </a>
          </li>
        </ul>
      </div>
      <div class="col">
        <ul class="list px-0">
          <li class="list_item">
            <a
              href="#"
              aria-current="page"
              class="item_link font-bold text-3xl hover:opacity-75 hover:text-white block router-link-exact-active router-link-active"
              title="Vai a Note legali"
            >
              Note legali
            </a>
          </li>
          <li class="list_item">
            <a
              href="#"
              aria-current="page"
              class="item_link font-bold text-3xl hover:opacity-75 hover:text-white block router-link-exact-active router-link-active"
              title="Vai a Termini &amp; condizioni"
            >
              Termini &amp; condizioni
            </a>
          </li>
          <li class="list_item">
            <a
              href="#"
              aria-current="page"
              class="item_link font-bold text-3xl hover:opacity-75 hover:text-white block router-link-exact-active router-link-active"
              title="Vai a Informativa sulla privacy"
            >
              Informativa sulla privacy
            </a>
          </li>
          <li class="list_item">
            <a
              href="#"
              aria-current="page"
              class="item_link font-bold text-3xl hover:opacity-75 hover:text-white block router-link-exact-active router-link-active"
              title="Vai a Cookies"
            >
              Cookies
            </a>
          </li>
        </ul>
      </div>
      <div class="col">
        <ul class="list px-0">
          <li class="list_item">
            <a
              href="#"
              aria-current="page"
              class="item_link font-bold text-3xl hover:opacity-75 hover:text-white block router-link-exact-active router-link-active"
              title="Vai a Help"
            >
              Help
            </a>
          </li>
          <li class="list_item">
            <a
              href="#"
              aria-current="page"
              class="item_link font-bold text-3xl hover:opacity-75 hover:text-white block router-link-exact-active router-link-active"
              title="Vai a FAQ"
            >
              FAQ
            </a>
          </li>
          <li class="list_item">
            <a
              href="#"
              class="item_link font-bold text-3xl hover:opacity-75 hover:text-white block"
              title="Vai a Contatti"
            >
              Contatti
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "../assets/scss/partial/variables.scss" as *;

.info {
  width: 100%;
  min-height: 80vh;
  padding-top: 50px;
  padding-bottom: 100px;
  color: white;

  .button {
    background-color: $primary-bg;
    border-radius: 10px;
    padding: 5px 10px;
    text-decoration: none;
    color: white;
    font-size: 20px;
    margin-bottom: 10px;
  }
  .col {
    background-color: rgb(78, 89, 140);
    border-radius: 15px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
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
          color: #ff8c42;
        }
      }
    }
  }
}
</style>
