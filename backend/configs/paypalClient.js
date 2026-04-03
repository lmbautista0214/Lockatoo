import paypal from "@paypal/checkout-server-sdk";

const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_SECRET
);

const client = new paypal.core.PayPalHttpClient(environment);
console.log("CLIENT ID:", process.env.PAYPAL_CLIENT_ID);
console.log("SECRET:", process.env.PAYPAL_CLIENT_SECRET);

export default client;