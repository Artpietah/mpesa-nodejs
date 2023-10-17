require('dotenv').config();
const axios = require('axios');
const express = require('express');
const {Mpesa, AirtelMoney} = require('./mpesa');

const shortcode = process.env.SHORTCODE
const passkey=process.env.PASSKEY
const consumer_key =process.env.CONSUMER_KEY
const consumer_secret =process.env.CONSUMER_SECRET
const url =process.env.URL
const stk_push_url =process.env.STK_PUSH_URL
const client_id =process.env.CLIENT_ID
const client_secret =process.env.CLIENT_SECRET_KEY

const airtelMoney = new AirtelMoney(
    client_id,
    client_secret,
);

const mpesa  = new Mpesa(
    shortcode,
    passkey,
    consumer_key,
    consumer_secret,
    url,
    stk_push_url
);

// mpesa.STKPush('254708374149', 1, 'https://webhook.site/9b0f7b3a-9e1a-4c9a-8b1a-5b1b1b1b1b1b')
//     .then((data) => {
//         console.log(data);
//     }
//     ).catch((error) => {
//         console.log(error);
//     }
//     );

const app = express();

const port = process.env.PORT || 3000;


// post route for stk push
app.post('/stkpush', (req, res) => {
   
    // res.send(req);
    console.log(req);
    // res.send(phone);
    
})
app.get('/airtelmoney', (req, res) => {
   
    // res.send(req);
    airtelMoney.Authorization().then((data) => {
        // console.log(data);
        res.send(data);
    }
    ).catch((error) => {
        // console.log(error);
        res.send(error);
    }
    );
    // res.send(phone);
    
})



app.listen(port, () => {
    console.log(`Server running on port ${port}`);

}
);





