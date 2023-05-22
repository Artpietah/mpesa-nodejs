require('dotenv').config();
const axios = require('axios');
const express = require('express');
const {Mpesa} = require('./mpesa');

const shortcode = process.env.SHORTCODE
const passkey=process.env.PASSKEY
const consumer_key =process.env.CONSUMER_KEY
const consumer_secret =process.env.CONSUMER_SECRET
const url =process.env.URL
const stk_push_url =process.env.STK_PUSH_URL

const mpesa  = new Mpesa(
    shortcode,
    passkey,
    consumer_key,
    consumer_secret,
    url,
    stk_push_url
);

mpesa.STKPush('254708374149', 1, 'https://webhook.site/9b0f7b3a-9e1a-4c9a-8b1a-5b1b1b1b1b1b')
    .then((data) => {
        console.log(data);
    }
    ).catch((error) => {
        console.log(error);
    }
    );



