require ('dotenv').config();
const axios = require('axios');
const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    console.log("Working");
});
app.get('/callback', (req, res) => {
    console.log(req);
    //send status 200
    res.status(200);
    //send response
    res.send("Working");
 
});

app.get('/stkpush',  (req, res) => {
    res.send(STKPush());
});

app.listen(PORT, () => {    
    console.log(`Server running on port ${PORT}`);
});

// async function getAuthTokens() 

async function getAuthTokens() {
    let consumer_key = process.env.CONSUMER_KEY;
    let consumer_secret = process.env.CONSUMER_SECRET;
    let url = process.env.URL;

    let auth = Buffer.from(consumer_key + ':' + consumer_secret).toString('base64');

    try {
        let {data} = await axios.get(url, {
            "headers": {
                "Authorization": "Basic " + auth,
            }
            
        });
        console.log(data.access_token)
        return data.access_token;
    } catch (error) {
        console.log(error)
    }
}

async function STKPush() {
    let url = process.env.STK_PUSH_URL;
    let auth = 'Bearer ' + await getAuthTokens();
    let timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    let password = Buffer.from(process.env.SHORTCODE + process.env.PASSKEY + timestamp).toString('base64');
    let payload = {
        "BusinessShortCode": process.env.SHORTCODE,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerBuyGoodsOnline",
        "Amount": "1",
        "PartyA": process.env.PHONE_NUMBER,
        "PartyB": process.env.SHORTCODE,
        "PhoneNumber": process.env.PHONE_NUMBER,
        "CallBackURL": "https://4362-41-72-200-174.ngrok-free.app",
        "AccountReference": "Internet service",
        "TransactionDesc": "Pay School Fees"
    }
    try {
        let {data} = await axios.post(url, payload, {
            headers: {
                "Authorization": auth
            }
        });
        console.log(data)
    }
    catch (error) {
        console.log(error)
    }
}



