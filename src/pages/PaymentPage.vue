<script>
import braintree from "braintree-web";
import paypal from "paypal-checkout";
export default {
  data() {
    return {
      hostedFieldInstance: false,
      nonce: "",
      error: "",
      amount: 10,
    };
  },
  methods: {
    payWithCreditCard() {
      if (this.hostedFieldInstance) {
        this.error = "";
        this.nonce = "";
        this.hostedFieldInstance
          .tokenize()
          .then((payload) => {
            console.log(payload);
            this.nonce = payload.nonce;
          })
          .catch((err) => {
            console.error(err);
            this.error = err.message;
          });
      }
    },
  },
  mounted() {
    this.amount = Number(localStorage.getItem("Tot Price"));
    braintree.client
      .create({
        authorization: "sandbox_93smtrz3_bbgx4xf7h8bx24xg",
      })
      .then((clientInstance) => {
        let options = {
          client: clientInstance,
          styles: {
            input: {
              "font-size": "14px",
              "font-family": "Open Sans",
            },
          },
          fields: {
            number: {
              selector: "#creditCardNumber",
              placeholder: "Enter Credit Card",
            },
            cvv: {
              selector: "#cvv",
              placeholder: "Enter CVV",
            },
            expirationDate: {
              selector: "#expireDate",
              placeholder: "00 / 0000",
            },
          },
        };
        return Promise.all([
          braintree.hostedFields.create(options),
          braintree.paypalCheckout.create({ client: clientInstance }),
        ]);
      })
      .then((instances) => {
        const hostedFieldInstance = instances[0];
        const paypalCheckoutInstance = instances[1];
        // Use hostedFieldInstance to send data to Braintree
        this.hostedFieldInstance = hostedFieldInstance;
        // Setup PayPal Button
        return paypal.Button.render(
          {
            env: "sandbox",
            style: {
              label: "paypal",
              size: "responsive",
              shape: "rect",
            },
            payment: () => {
              return paypalCheckoutInstance.createPayment({
                flow: "checkout",
                intent: "sale",
                amount: parseFloat(this.amount) > 0 ? this.amount : 10,
                displayName: "Braintree Testing",
                currency: "USD",
              });
            },
            onAuthorize: (data, options) => {
              return paypalCheckoutInstance
                .tokenizePayment(data)
                .then((payload) => {
                  console.log(payload);
                  this.error = "";
                  this.nonce = payload.nonce;
                });
            },
            onCancel: (data) => {
              console.log(data);
              console.log("Payment Cancelled");
            },
            onError: (err) => {
              console.error(err);
              this.error =
                "An error occurred while processing the paypal payment.";
            },
          },
          "#paypalButton"
        );
      })
      .catch((err) => {});
  },
};
</script>

<template>
  <div class="container p-5 d-flex justify-content-center">
    <div class="col-10 col-md-8">
      <div class="card bg-light payment-card">
        <div class="card-header">Payment Information</div>
        <div class="card-body">
          <div class="alert alert-success" v-if="nonce">
            Successfully generated nonce.
          </div>
          <div class="alert alert-danger" v-if="error">
            {{ error }}
          </div>
          <form>
            <div class="form-group">
              <label for="amount">Totale ordine</label>
              <div class="input-group">
                <div class="input-group-prepend d-flex align-items-center px-2">
                  €
                </div>
                <input
                  type="number"
                  id="amount"
                  v-model="amount"
                  class="form-control fc"
                  placeholder="Enter Amount"
                />
              </div>
            </div>
            <hr />
            <div class="form-group">
              <label>Numero carta di credito</label>
              <div id="creditCardNumber" class="form-control credit-card"></div>
            </div>
            <div class="form-group">
              <div class="row">
                <div class="col-6">
                  <label>data di scadenza</label>
                  <div id="expireDate" class="form-control credit-card"></div>
                </div>
                <div class="col-6">
                  <label>CVV</label>
                  <div id="cvv" class="form-control credit-card"></div>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-center justify-content-md-start">
              <button
                class="btn btn-primary btn-block mt-3"
                @click.prevent="payWithCreditCard"
              >
                Paga con Carta di Credito
              </button>
            </div>

            <hr />
            <div
              class="w-100 d-flex justify-content-center justify-content-md-start"
            >
              <div id="paypalButton"></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
body {
  padding: 20px;
}

.payment-card {
  height: 450px;

  .fc {
    border-radius: 5px;
  }

  .credit-card {
    height: 40px;
  }
}
#paypalButton {
  width: 200px;
}
</style>
