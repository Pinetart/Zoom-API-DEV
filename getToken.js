require('dotenv').config();
const axios = require('axios');

const accountId = process.env.ZOOM_ACCOUNT_ID;
const clientId = process.env.ZOOM_CLIENT_ID;
const clientSecret = process.env.ZOOM_CLIENT_SECRET;

let cachedToken = null;
let tokenExpiresAt = null;

/**
 * @returns {Promise<string|null>}
 */

async function fetchNewToken() {
    console.log("Requesting a new Access Token from Zoom...");
    try {
        const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

        const response = await axios({
            method: 'POST',
            url: 'https://zoom.us/oauth/token',
            params: {
                grant_type: 'account_credentials',
                account_id: accountId,
            },
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const { access_token, expires_in } = response.data;

        tokenExpiresAt = Date.now() + (expires_in - 60) * 1000;
        cachedToken = access_token;

        console.log("✅ New Access Token received and cached!");
        return cachedToken;

    } catch (error) {
        console.error("❌ Error getting access token:", error.response ? error.response.data : error.message);
        cachedToken = null;
        tokenExpiresAt = null;
        return null;
    }
}

/**
 * @returns {Promise<string|null>} 
 */
export async function getValidToken() {
    if (cachedToken && Date.now() < tokenExpiresAt) {
        console.log("Returning cached token.");
        return cachedToken;
    }

    return await fetchNewToken();
}