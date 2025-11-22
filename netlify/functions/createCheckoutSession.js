const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const crypto = require("crypto");

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const { plan } = JSON.parse(event.body || "{}");

    if (!plan || !["monthly", "annual"].includes(plan)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid plan" }),
      };
    }

    // Amounts in cents
    const amount = plan === "annual" ? 199900 : 19900;
    const name =
      plan === "annual"
        ? "Superhuman Annual Membership"
        : "Superhuman Monthly Membership";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      ui_mode: "custom", // tells Stripe we're using embedded components :contentReference[oaicite:2]{index=2}
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      // Where Stripe sends them after paying
      return_url:
        "https://superhumanaz.netlify.app/payment-success?session_id={CHECKOUT_SESSION_ID}",
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        checkoutSessionClientSecret: session.client_secret,
      }),
    };
  } catch (err) {
    console.error("Stripe checkout session error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
