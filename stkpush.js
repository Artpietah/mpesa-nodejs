const axios = require('axios');

class Mpesa {
    constructor(SHORTCODE, PASSKEY, CONSUMER_KEY, CONSUMER_SECRET, URL, STK_PUSH_URL) {
        this.shortcode = SHORTCODE;
        this.passkey = PASSKEY;
        this.consumer_key = CONSUMER_KEY;
        this.consumer_secret = CONSUMER_SECRET;
        this.url = URL;
        this.stk_push_url = STK_PUSH_URL;

    }

    async getAuthTokens() {
        let auth = Buffer.from(this.consumer_key + ':' + this.consumer_secret).toString('base64');
        try {
            let {data} = await axios.get(this.url, {
                "headers": {
                    "Authorization": "Basic " + auth,
                }
                
            });
            return data.access_token;
        } catch (error) {
            return({
                "error": error,
                "message": "Error getting auth tokens",
            })
        }
    }

    async STKPush(number,amount, callbackURL, AccountReference ='Test', TransactionDesc='Test') {
        let auth = 'Bearer ' + await this.getAuthTokens();
        let timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
        let password = Buffer.from(this.shortcode + this.passkey + timestamp).toString('base64');
        let payload = {
            "BusinessShortCode": this.shortcode,
            "Password": password,
            "Timestamp": timestamp,
            "TransactionType": "CustomerBuyGoodsOnline",
            "Amount": amount,
            "PartyA": number,
            "PartyB": this.shortcode,
            "PhoneNumber": number,
            "CallBackURL": callbackURL,
            "AccountReference": AccountReference,
            "TransactionDesc": TransactionDesc
        }
        try {
            let {data} = await axios.post(this.stk_push_url, payload, {
                "headers": {
                    "Authorization": auth,
                }
            });
            return data;
        } catch (error) {
            return({
                "error": error,
                "message": "Error sending STK push",

            })
        }
    }
    async Balance(QueueTimeOutURL,ResultURL) {
        let auth = 'Bearer ' + await this.getAuthTokens();
        let timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
        let password = Buffer.from(this.shortcode + this.passkey + timestamp).toString('base64');
        let payload = {
            "CommandID": "AccountBalance",
            "PartyA": this.shortcode,
            "IdentifierType": "4",
            "Remarks": "Remarks",
            "Initiator": this.shortcode,
            "SecurityCredential": password,
            "QueueTimeOutURL": QueueTimeOutURL,
            "ResultURL": ResultURL
        }
        try {
            let {data} = await axios.post(this.url, payload, {
                "headers": {
                    "Authorization": auth,
                }
            });
            return data;
        } catch (error) {
            return({
                "error": error,
                "message": "Error sending balance request",

            })
        }
    }
    async TransactionStatus(QueueTimeOutURL,ResultURL) {
        let auth = 'Bearer ' + await this.getAuthTokens();
        let timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
        let password = Buffer.from(this.shortcode + this.passkey + timestamp).toString('base64');
        let payload = {
            "CommandID": "TransactionStatusQuery",
            "PartyA": this.shortcode,
            "IdentifierType": "4",
            "Remarks": "Remarks",
            "Initiator": this.shortcode,
            "SecurityCredential": password,
            "QueueTimeOutURL": QueueTimeOutURL,
            "ResultURL": ResultURL,
        }
        try {
            let {data} = await axios.post(this.url, payload, {
                "headers": {
                    "Authorization": auth,
                }
            });
            return data;
        } catch (error) {
            return({
                "error": error,
                "message": "Error sending transaction status request",

            })
        }
    }
    async Reversal(QueueTimeOutURL,ResultURL) {
        let auth = 'Bearer ' + await this.getAuthTokens();
        let timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
        let password = Buffer.from(this.shortcode + this.passkey + timestamp).toString('base64');
        let payload = {
            "CommandID": "TransactionReversal",
            "ReceiverParty": this.shortcode,
            "RecieverIdentifierType": "4",
            "Remarks": "Remarks",
            "Initiator": this.shortcode,
            "SecurityCredential": password,
            "QueueTimeOutURL": QueueTimeOutURL,
            "ResultURL": ResultURL,
        }
        try {
            let {data} = await axios.post(this.url, payload, {
                "headers": {
                    "Authorization": auth,
                }
            });
            return data;
        } catch (error) {
            return({
                "error": error,
                "message": "Error sending reversal request",

            })
        }
    }
    async B2B(QueueTimeOutURL,ResultURL) {
        let auth = 'Bearer ' + await this.getAuthTokens();
        let timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
        let password = Buffer.from(this.shortcode + this.passkey + timestamp).toString('base64');
        let payload = {
            "CommandID": "BusinessPayBill",
            "Amount": "1",
            "PartyA": this.shortcode,
            "SenderIdentifierType": "4",
            "PartyB": this.shortcode,
            "RecieverIdentifierType": "4",
            "Remarks": "Remarks",
            "Initiator": this.shortcode,
            "SecurityCredential": password,
            "QueueTimeOutURL": QueueTimeOutURL,
            "ResultURL": ResultURL
        }
        try {
            let {data} = await axios.post(this.url, payload, {
                "headers": {
                    "Authorization": auth,
                }
            });
            return data;
        } catch (error) {
            return({
                "error": error,
                "message": "Error sending B2B request",

            })
        }
    }
    async B2C(QueueTimeOutURL,ResultURL) {
        let auth = 'Bearer ' + await this.getAuthTokens();
        let timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
        let password = Buffer.from(this.shortcode + this.passkey + timestamp).toString('base64');
        let payload = {
            "CommandID": "BusinessPayment",
            "Amount": "1",
            "PartyA": this.shortcode,
            "SenderIdentifierType": "4",
            "PartyB": this.shortcode,
            "RecieverIdentifierType": "4",
            "Remarks": "Remarks",
            "Initiator": this.shortcode,
            "SecurityCredential": password,
            "QueueTimeOutURL": QueueTimeOutURL,
            "ResultURL": ResultURL
        }
        try {
            let {data} = await axios.post(this.url, payload, {
                "headers": {
                    "Authorization": auth,
                }
            });
            return data;
        } catch (error) {
            return({
                "error": error,
                "message": "Error sending B2C request",

            })
        }
    }
    async C2BRegisterUrls(stk_push_url,ValidationURL) {
        let auth = 'Bearer ' + await this.getAuthTokens();
        let payload = {
            "ShortCode": this.shortcode,
            "ResponseType": "Completed",
            "ConfirmationURL": stk_push_url,
            "ValidationURL": ValidationURL
        }
        try {
            let {data} = await axios.post(this.url, payload, {
                "headers": {
                    "Authorization": auth,
                }
            });
            return data;
        } catch (error) {
            return({
                "error": error,
                "message": "Error registering C2B",

            })
        }
    }
}

class Tcash {
    
     constructor(){

     }
}
class AirtelMoney {

     constructor(){

     }


}

module.exports = {Mpesa};