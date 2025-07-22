require('dotenv').config(); 
const axios = require('axios');

const accountId = process.env.ZOOM_ACCOUNT_ID;
const clientId = process.env.ZOOM_CLIENT_ID;
const clientSecret = process.env.ZOOM_CLIENT_SECRET;

/**
 * @returns {Promise<string|null>} The access token if successful, otherwise null.
 */
async function getAccessToken() {
    console.log("Requesting Access Token...");
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
        
        console.log("✅ Access Token received!");
        return response.data.access_token;

    } catch (error) {
        console.error("❌ Error getting access token:", error.response ? error.response.data : error.message);
        return null;
    }
}

/**
 * @param {string} accessToken - The bearer token for authentication.
 */

async function listUsers(accessToken) {
    console.log("\nFetching users with the access token...");
    try {
        const response = await axios({
            method: 'GET',
            url: 'https://api.zoom.us/v2/users',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        console.log("✅ Users API Response:");
        console.log(response.data);

    } catch (error) {
        console.error("❌ Error listing users:", error.response ? error.response.data : error.message);
    }
}

async function main() {
    const token = await getAccessToken();

    if (token) {
        await listUsers(token);
    } else {
        console.log("Could not proceed to list users because token request failed.");
    }
}

main();
