import axios from "axios";

export async function createMeeting(token, meetingDetails) {

    // const meetingDetails = {
    //     topic: "Test Dummy Meeting",
    //     type: 2, // A 'type' of 2 means it's a scheduled meeting.
    //     start_time: new Date(Date.now() + 5 * 60 * 1000).toISOString().slice(0, -5) + 'Z', // 5 minutes from now
    //     duration: 45, // in minutes
    //     timezone: "UTC",
    //     agenda: "This is a test meeting created via the Zoom API.",
    //     settings: {
    //         host_video: true,
    //         participant_video: false,
    //         join_before_host: true,
    //         mute_upon_entry: true,
    //         watermark: false,
    //         use_pmi: false,
    //         approval_type: 0, // 0: Automatically approve, 1: Manually approve
    //         registration_type: 1, // 1: Attendees register once and can attend any of the occurrences
    //         audio: 'both', // 'voip', 'telephony', 'both'
    //         auto_recording: 'none' // 'local', 'cloud', 'none'
    //     }
    // };

    try {
        const response = await axios({
            method: 'POST',
            url: 'https://api.zoom.us/v2/users/me/meetings',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: meetingDetails // The meeting details go in the 'data' property for POST requests
        });

        console.log("✅ Meeting created successfully! API Response:");
        console.log("-----------------------------------------");
        console.log(`Topic: ${response.data.topic}`);
        console.log(`Join URL: ${response.data.join_url}`);
        console.log(`Start Time: ${response.data.start_time}`);
        console.log("-----------------------------------------");
        console.log(response.data);

    } catch (error) {
        console.error("❌ Error creating meeting:", error.response ? error.response.data : error.message);
    }
}
