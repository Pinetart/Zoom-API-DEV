import { listUsers } from './listUsers';
import { getValidToken } from './getToken';

async function main() {
    const token = await getValidToken();

    if (token) {
        await listUsers(token);
    } else {
        console.log("Could not proceed to list users because token request failed.");
    }
}

main();
