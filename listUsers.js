export async function listUsers(token) {
    console.log("\nFetching users with the access token...");
    try {
        const response = await axios({
            method: 'GET',
            url: 'https://api.zoom.us/v2/users',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        console.log("✅ Users API Response:");
        console.log(response.data);

    } catch (error) {
        console.error("❌ Error listing users:", error.response ? error.response.data : error.message);
    }
}
