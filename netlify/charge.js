const { Client, Environment } = require("square");

exports.handler = async (event, context) => {
  try {
    const { token, plan } = JSON.parse(event.body);

    const client = new Client({
      accessToken: process.env.SQUARE_ACCESS_TOKEN,
      environment: Environment.Sandbox,
    });

    const amount = plan === "annual" ? 199900 : 20000;

    const result = await client.paymentsApi.createPayment({
      sourceId: token,
      amountMoney: {
        amount,
        currency: "USD",
      },
      idempotencyKey: crypto.randomUUID(),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, result }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error }),
    };
  }
};
