import { listUsers } from './listUsers.js';
import { getValidToken } from './getToken.js';

async function main() {
    const token = await getValidToken();

    if (token) {
        await listUsers(token);
    } else {
        console.log("Could not proceed to list users because token request failed.");
    }
}

main();
