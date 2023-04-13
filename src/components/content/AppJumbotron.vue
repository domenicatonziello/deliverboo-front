<script>
export default {
  name: "AppJumbotron",
};
</script>
<template>
  <section>
    <div class="container jumbotron">
      <div class="row d-flex">
        <div class="col-6 col-text col">
          <div class="text">
            <h2 class="size-text">
              <i>Trova il ristorante più vicino a te</i>
            </h2>

            <!-- Search Bar -->
            <div id="web-search">
              <input
                class="web-search"
                type="text"
                placeholder="Inserisci il tuo indirizzo"
              />
              <a href="" class="">Cerca</a>
            </div>
            <div id="mobile-search">
              <input
                class="mobile-search"
                type="text"
                placeholder="Inserisci il tuo indirizzo"
              />
            </div>

            <div class="d-flex justify-content-start col mb-5">
              <h1>
                <b class="brown"
                  >Food <br /><span class="light-brown">Delivery</span></b
                >
              </h1>
              <img src="../../../public/img/Vector.png" alt="" />
            </div>
          </div>
        </div>
        <div class="col-6 col-img col">
          <img
            src="https://s3-alpha-sig.figma.com/img/75a1/3e45/54eadf39c3f1708083b6f1b5cb191111?Expires=1682294400&Signature=ALT67NDNVo1LKfcC6uqAVqau4EAJztVlTqPEfJzw9WWUIoAWyMBrfId8-6RCrP3lyW3hl1IpEKnE~51EFLF4BQM2SngHCE3UMAQx9PrVgTIjHfJNQCAfKiIfIZNBALKsrP9ePCBWm4PEML~BXRQs0SD6Ihtry8cMXdDyAB~MT5-DdGyGZLp6DLzZ3KM5i~pE8FRH2pbfgXbvemqHl5wC6rHiQ90wMMwNJdwK3-VpNgTSL0zIz7W4yDDW0HG0s6nW3Y7KMTtcgF7G5o2mOIlnO4uEYAYKOkzGrqXzdnSN-6SLTqT~Dvv84TiVBOkw1p3Pl9SlRKP2TBLsOvcETl-iTA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            alt=""
            class="img-fluid"
          />
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="scss">
@use "../../assets/scss/style.scss" as *;
@use "../../assets/scss/partial/variables" as *;

.brown {
  color: $brown;
}

.light-brown {
  color: $light-brown;
}

.jumbotron {
  margin-top: 6rem;
}
.size-text {
  font-size: 30rem;
}
.text {
  h1 {
    font-size: 4rem;
  }

  h2 {
    font-size: 2.5rem;
    color: $dark-orange;
  }

  #web-search > * {
    margin: 6rem 0 6rem;
  }

  #web-search {
    display: inline;

    background-color: $dark-orange;
    padding: 2.5rem 2rem;
    border-radius: 1rem;

    .web-search {
      width: 50%;

      border-radius: 15px 0 0 15px;
      padding: 10px;
      border: none;
    }

    a {
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 0 15px 15px 0;
      background-color: #ff7010;
      text-decoration: none;
    }
  }
}
.mobile-search {
  display: none;
}

@media screen and (max-width: 1000px) {
  .jumbotron {
    margin-top: 3rem;
  }

  .container {
    .row {
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .col {
        width: 100%;
      }

      .col-text {
        .text {
          display: flex;
          flex-direction: column;
          align-items: center;

          #web-search {
            display: none;
            background-color: transparent;
            padding: 0;

            .web-search {
              display: none;
            }

            a {
              display: none;
            }
          }

          #mobile-search {
            .mobile-search {
              text-align: center;
              width: 300px;
              padding: 1rem 3rem;
              border-radius: 15px;
              border: none;
              margin: 2rem 0;
              display: block;
            }
          }
        }
      }
    }
  }

  #web-search > * {
    padding: 0;
  }

  .text {
    width: 100%;

    h2 {
      font-size: 1.5rem;
      color: white;
      text-align: center;
    }

    h1 {
      font-size: 2rem;
    }
  }

  ::placeholder {
    font-style: italic;
    font-weight: bold;

    color: $primary-bg;
  }
}
</style>
