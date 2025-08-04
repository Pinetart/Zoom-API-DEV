import axios from "axios";

export async function listMeetings(token, meetingType) {

    try {
        const response = await axios({
            method: 'GET',
            url: 'https://api.zoom.us/v2/users/me/meetings',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            // For GET requests, query parameters go in the 'params' property
            params: meetingType
        });

        const meetings = response.data.meetings;

        if (meetings && meetings.length > 0) {
            console.log("✅ Meetings retrieved successfully!");
            console.log("-----------------------------------------");
            meetings.forEach(meeting => {
                console.log(`Topic: ${meeting.topic}`);
                console.log(`ID: ${meeting.id}`);
                console.log(`Start Time: ${meeting.start_time}`);
                console.log(`Join URL: ${meeting.join_url}`);
                console.log("------------------");
            });
            console.log(`Total meetings found: ${response.data.total_records}`);
        } else {
            console.log("✅ Request successful, but no meetings were found for this user.");
        }

    } catch (error) {
        console.error("❌ Error listing meetings:", error.response ? error.response.data : error.message);
    }
}
