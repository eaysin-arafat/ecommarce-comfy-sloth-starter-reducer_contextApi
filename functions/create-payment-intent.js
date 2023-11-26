// domain/.netlify/functions/create-payment-intent

const stripe = require("stripe")(
  "sk_test_51OAdfqCF794z0Nj2z5MEO739YFKjwRefDd4VNEO3XCxZNwZSfNIpVSerdaYZoQLUHjq6tHR4AU4wF7uzLep226IF00mGucXP6F"
);

exports.handler = async function (event, context) {
  if (event.body) {
    const { cart, shipping_fee, total_amount } = JSON.parse(event.body);

    const calculateOrderAmount = () => {
      return shipping_fee + total_amount;
    };

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: "usd",
      });
      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      };
    } catch (error) {}

    return {
      statusCode: 200,
      body: JSON.stringify(cart),
    };
  }
  return {
    statusCode: 200,
    body: "Create Payment Intent",
  };
};
