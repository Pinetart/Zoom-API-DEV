import axios from "axios";

export async function updateMeeting(token, meetingId, updateDetails) {

    if (!meetingId) {
        console.error("❌ Error: A meetingId is required to update a meeting.");
        return;
    }

    try {
        const response = await axios({
            method: 'PATCH',
            url: `https://api.zoom.us/v2/meetings/${meetingId}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: updateDetails
        });

        // A successful PATCH to the Zoom meetings endpoint returns a 204 status code therefore:.
        if (response.status === 204) {
            console.log("✅ Meeting updated successfully!");
            console.log("-----------------------------------------");
            console.log(`Meeting ID: ${meetingId}`);
            console.log("Status: The meeting details have been changed.");
            console.log("-----------------------------------------");
        } else {
            console.log("✅ Meeting update request was successful, but returned an unexpected status code.");
            console.log(response);
        }

    } catch (error) {
        console.error("❌ Error updating meeting:", error.response ? error.response.data : error.message);
    }
}