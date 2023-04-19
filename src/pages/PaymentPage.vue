<script>
const endpoint = 'http://127.0.0.1:8000/api/order';
import axios from 'axios';
import braintree from 'braintree-web';
import paypal from 'paypal-checkout';
export default {
  data() {
    return {
      hostedFieldInstance: false,
      nonce: "",
      error: "",
      // amount: 10,
      form: {
        address: '',
        total_order: null,
        phone_number: null,
        guest_name: '',
        status: false,
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
            this.form = { address: '', total_order: 10, phone_number: null, guest_name: '', status: false, };
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
  <div class="container">
    <div class="col-6 offset-3">
      <div class="card bg-light">
        <div class="card-header">Informazioni sul pagamento</div>
        <div class="card-body">
          <div class="alert alert-success" v-if="nonce">
            Il pagamento è andato a buon fine.
          </div>
          <div class="alert alert-danger" v-if="error">
            {{ error }}
          </div>
          <form id="payment-form" method="post" @submit.prevent="sendForm()">
            <!-- prezzo totale -->
            <div class="form-group">
              <label for="total_order">Totale</label>
              <div class="input-group">
                <div class="input-group-prepend"><span class="input-group-text">€</span></div>
                <input type="text" disabled id="total_order" name="total_order" v-model="form.total_order"
                  class="form-control" placeholder="Enter Amount">
              </div>
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
            <!-- guest name -->
            <div class="form-group">
              <label for="guest_name">Nome</label>
              <input type="text" id="guest_name" name="guest_name" v-model="form.guest_name" class="form-control"
                placeholder="Inserisci il tuo nome">
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
            <button class="btn btn-primary btn-block" @click.prevent="payWithCreditCard">Pay with Credit Card</button>
            <hr />
            <div id="paypalButton"></div>
            <div id="dropin-container"></div>
            <button type="submit" class="btn btn-primary"> Invia </button>
            <!-- <input type="hidden" id="nonce" name="payment_method_nonce" /> -->
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  padding: 20px;
}
</style>
