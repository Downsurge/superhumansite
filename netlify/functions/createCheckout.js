const square = require("square");
const crypto = require("crypto");

const Client = square.Client;
const Environment = square.Environment;

exports.handler = async (event, context) => {
  try {
    const { plan } = JSON.parse(event.body);

    if (!plan) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing plan value" }),
      };
    }

    const amount = plan === "annual" ? 199900 : 20000;
    const name = plan === "annual"
      ? "Superhuman Annual Plan"
      : "Superhuman Monthly Plan";

    const client = new Client({
      accessToken: process.env.SQUARE_ACCESS_TOKEN,
      environment: Environment.Sandbox,
    });

    const locationId = process.env.SQUARE_LOCATION_ID;

    const { result } = await client.paymentLinksApi.createPaymentLink({
      idempotencyKey: crypto.randomUUID(),
      description: name,
      quickPay: {
        name,
        priceMoney: {
          amount,
          currency: "USD",
        },
        locationId,
      },
      checkoutOptions: {
        redirectUrl: "https://superhumanaz.netlify.app/payment-success",
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: result.paymentLink.url }),
    };

  } catch (err) {
    console.error("Checkout error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
