import axios from "axios";

export async function deleteMeeting(token, meetingId) {

    if (!meetingId) {
        console.error("❌ Error: A meetingId is required to delete a meeting.");
        return;
    }

    try {
        const response = await axios({
            method: 'DELETE',
            url: `https://api.zoom.us/v2/meetings/${meetingId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            // params: xyz //Params are optional.
        });

        // A successful DELETE to the Zoom meetings endpoint returns a 204 status code.
        if (response.status === 204) {
            console.log("✅ Meeting deleted successfully!");
            console.log("-----------------------------------------");
            console.log(`Meeting ID: ${meetingId}`);
            console.log("Status: The meeting has been removed.");
            console.log("-----------------------------------------");
        } else {
            console.log("✅ Meeting delete request was successful, but returned an unexpected status code.");
            console.log(`Status: ${response.status}`);
        }

    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.error(`❌ Error deleting meeting: Meeting with ID ${meetingId} not found.`);
            console.error(error.response.data);
        } else {
            console.error("❌ Error deleting meeting:", error.response ? error.response.data : error.message);
        }
    }
}
