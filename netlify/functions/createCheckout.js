const { Client, Environment } = require("square");

exports.handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body);
    const plan = body.plan;

    if (!plan) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing plan type" }),
      };
    }

    // Set amount based on plan
    const amount = plan === "annual" ? 199900 : 20000;
    const lineItemName = plan === "annual"
      ? "Superhuman Annual Plan"
      : "Superhuman Monthly Plan";

    // Square client
    const client = new Client({
      accessToken: process.env.SQUARE_ACCESS_TOKEN, // Sandbox or Prod token
      environment: Environment.Sandbox, // Change to Production when ready
    });

    const locationId = process.env.SQUARE_LOCATION_ID; // Add this in Netlify Env Vars

    // Create checkout link
    const { result } = await client.checkoutApi.createCheckout(locationId, {
      idempotencyKey: crypto.randomUUID(),
      order: {
        order: {
          locationId,
          lineItems: [
            {
              name: lineItemName,
              quantity: "1",
              basePriceMoney: {
                amount,
                currency: "USD",
              },
            },
          ],
        },
      },
      redirectUrl: "https://superhumancalis.netlify.app/payment-success",
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: result.checkout.checkoutPageUrl }),
    };
  } catch (error) {
    console.error("Checkout error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
        details: error,
      }),
    };
  }
};
