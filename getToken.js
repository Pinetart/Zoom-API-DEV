require('dotenv').config(); 
const axios = require('axios');

const accountId = process.env.ZOOM_ACCOUNT_ID;
const clientId = process.env.ZOOM_CLIENT_ID;
const clientSecret = process.env.ZOOM_CLIENT_SECRET;

const tokenUrl = "https://zoom.us/oauth/token";

const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

const params = new URLSearchParams();
params.append("grant_type", "account_credentials");
params.append("account_id", accountId);

async function fetchZoomToken() {
    console.log("Requesting Access Token from Zoom...");
    try {
        const response = await axios.post(tokenUrl, params, {
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        console.log("Success! API Response:");
        console.log(response.data);

    } catch (error) {
        console.error("Error fetching Zoom token:");
        if (error.response) {

            console.error("Data:", error.response.data);
            console.error("Status:", error.response.status);
            console.error("Headers:", error.response.headers);
        } else if (error.request) {
            console.error("Request:", error.request);
        } else {
            console.error('Error Message:', error.message);
        }
    }
}

fetchZoomToken();
