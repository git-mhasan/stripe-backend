const express = require('express');
const cors = require('cors');
require("dotenv").config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const port = process.env.PORT || 5000;

const app = express();

// middleware:
app.use(cors());
app.use(express.json());


// enrtry point
app.get('/', (req, res) => {
    res.send("Server is running.")
})

app.post('/create-payment-intent', async (req, res) => {
    const price = req.body;
    // const price = order.totalPrice;
    const { price: amount } = price;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'inr',
        // payment_method_types: ['card']
        automatic_payment_methods: {enabled: true},
    });
    res.send({ clientSecret: paymentIntent.client_secret })
    console.log(paymentIntent.client_secret);
});

app.listen(port, () => {
    console.log("Server is listening to ", port);
})
