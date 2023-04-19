<script>
import { store } from '../data/store';
const endpoint = 'http://127.0.0.1:8000/api/order';
import axios from 'axios';
import braintree from 'braintree-web';
import paypal from 'paypal-checkout';
export default {
  data() {
    return {
      store,
      hostedFieldInstance: false,
      nonce: "",
      error: "",
      isOpen: false,
      // amount: 10,
      form: {
        address: '',
        total_order: null,
        phone_number: null,
        guest_name: '',
        status: false,
        restaurantid: null,
      }
    }
  },
  methods: {
    payWithCreditCard() {
      if (this.hostedFieldInstance) {
        this.error = "";
        this.nonce = "";
        this.hostedFieldInstance.tokenize().then(payload => {
          console.log(payload);
          this.nonce = payload.nonce;
          this.form.status = true;
          this.$router.push({
            path: "/confirmOrder",
            reload: true
          });
          (store.foodsCart = []), localStorage.removeItem("Carello");
          (store.restaurantid = null), localStorage.removeItem('Restaurant ID');
        })
          .catch(err => {
            console.error(err);
            this.error = err.message;
          })
      }
    },
    sendForm() {
      axios.post(endpoint, this.form)
        .then(() => {
          if (this.form.status) {
            this.form = { address: '', total_order: 10, phone_number: null, guest_name: '', status: false, restaurantid: null };
            this.$router.push({
              path: "/confirmOrder",
              reload: true
            });
          }
        })
    }
  },
  mounted() {
    this.form.total_order = Number(localStorage.getItem("Tot Price"));
    this.form.restaurantid = localStorage.getItem("Restaurant ID");
    braintree.client.create({
      authorization: "sandbox_38hhz6r4_fzbw7r3fc9t6rn2y"
    })
      .then(clientInstance => {
        let options = {
          client: clientInstance,
          styles: {
            input: {
              'font-size': '14px',
              'font-family': 'Open Sans'
            }
          },
          fields: {
            number: {
              selector: '#creditCardNumber',
              placeholder: 'Enter Credit Card'
            },
            cvv: {
              selector: '#cvv',
              placeholder: 'Enter CVV'
            },
            expirationDate: {
              selector: '#expireDate',
              placeholder: '00 / 0000'
            }
          }
        }
        return Promise.all([
          braintree.hostedFields.create(options),
          braintree.paypalCheckout.create({ client: clientInstance })
        ])
      })
      .then(instances => {
        const hostedFieldInstance = instances[0];
        const paypalCheckoutInstance = instances[1];
        // Use hostedFieldInstance to send data to Braintree
        this.hostedFieldInstance = hostedFieldInstance;
        // Setup PayPal Button
        return paypal.Button.render({
          env: 'sandbox',
          style: {
            label: 'paypal',
            size: 'responsive',
            shape: 'rect'
          },
          payment: () => {
            return paypalCheckoutInstance.createPayment({
              flow: 'checkout',
              intent: 'sale',
              amount: parseFloat(this.form.total_order) > 0 ? this.form.total_order : 10,
              displayName: 'Braintree Testing',
              currency: 'USD'
            })
          },
          onAuthorize: (data, options) => {
            return paypalCheckoutInstance.tokenizePayment(data).then(payload => {
              console.log(payload);
              this.error = "";
              this.nonce = payload.nonce;
              this.form.status = true;
              (store.foodsCart = []), localStorage.removeItem("Carello");
              // (store.restaurantid = null), localStorage.removeItem('Restaurant ID');
              this.$router.push({
                path: "/confirmOrder",
                reload: true
              });
            })
          },
          onCancel: (data) => {
            console.log(data);
            console.log("Payment Cancelled");
          },
          onError: (err) => {
            console.error(err);
            this.error = "An error occurred while processing the paypal payment.";
          }
        }, '#paypalButton')
      })
      .catch(err => {
      });
  }
}
</script>

<template>
  <div class="container pb-5">
    <div class="row row-cols-lg-auto justify-content-center mb-5">
      <div class="col pt-5">
        <div class="card bg-white rounded-4">
          <div class="header-card text-center pt-5">
            <h1 class="mb-5">Pagamento</h1>
          </div>
          <div class="body-card">
            <div class="alert alert-success" v-if="nonce">
              Il pagamento è andato a buon fine.
            </div>
            <div class="alert alert-danger" v-if="error">
              {{ error }}
            </div>
            <form id="payment-form" method="post" @submit.prevent="sendForm()">
              <!-- guest name -->
              <div class="form-group">
                <label for="guest_name">Nome</label>
                <input type="text" id="guest_name" name="guest_name" v-model="form.guest_name" class="form-control"
                  placeholder="Inserisci il tuo nome">
              </div>
              <!-- address -->
              <div class="form-group">
                <label for="address">Indirizzo</label>
                <input type="text" id="address" name="address" v-model="form.address" class="form-control"
                  placeholder="Inserisci il tuo indirizzo">
              </div>
              <!-- phone number -->
              <div class="form-group">
                <label for="phone">Numero</label>
                <input type="number" id="phone" name="phone_number" v-model="form.phone_number" class="form-control"
                  placeholder="Inserisci il tuo numero di cellulare">
              </div>
              <hr />
              <div class="form-group">
                <label>Credit Card Number</label>
                <div id="creditCardNumber" class="form-control"></div>
              </div>
              <div class="form-group">
                <div class="row">
                  <div class="col-6">
                    <label>Expire Date</label>
                    <div id="expireDate" class="form-control"></div>
                  </div>
                  <div class="col-6">
                    <label>CVV</label>
                    <div id="cvv" class="form-control"></div>
                  </div>
                </div>
              </div>
              <!-- prezzo totale -->
              <div class="d-flex justify-content-between align-items-center amount">
                <h2> Totale: </h2>
                <div class="d-flex">
                  <p class="fs-3 mb-0">€</p>
                  <input type="text" disabled id="total_order" name="total_order" v-model="form.total_order" class=""
                    placeholder="Enter Amount">
                </div>
              </div>
              <button type="submit" class="btn btn-primary btn-block my-3" @click="payWithCreditCard">Paga con
                carta di credito
              </button>
              <hr />
              <!-- <div v-if="!isOpen" class="text-center">
                                                                <button @click="paypal()" class="btn btn-warning text-center text-white"><small>Paga con
                                                                    Paypal</small></button>
                                                              </div> -->
              <button type="button" id="paypalButton" class="paypal-button"></button>
              <div id="dropin-container"></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
body {
  padding: 20px;
}

.card {
  width: 100%;
}

.body-card {
  padding: 0 2rem 2rem 2rem;
}

#creditCardNumber,
#expireDate,
#cvv {
  height: 3rem;
  margin: 1rem 0;
}

.form-group {
  margin-bottom: 1rem;
}

.amount {
  height: 50px;

  #total_order {
    background-color: white;
    margin-left: 5px;
    border: none;
    font-size: 25px;
    width: 4rem;
    color: black;
  }
}

form label {
  margin-bottom: 0.3rem;
}

.paypal-button {
  border: 0;
  background-color: white;
  width: 100%;
}
</style>
