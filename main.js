import { listUsers } from './listUsers.js';
import { createMeeting } from './newMeeting.js';
import { getValidToken } from './getToken.js';

async function main() {
    const token = await getValidToken();

    if (token) {
        // await listUsers(token);

        const meetingDetails = {
            topic: "Test Dummy Meeting 2",
            type: 2, // A 'type' of 2 means it's a scheduled meeting.
            start_time: new Date(Date.now() + 5 * 60 * 1000).toISOString().slice(0, -5) + 'Z', // 5 minutes from now
            duration: 45, // in minutes
            timezone: "UTC",
            agenda: "This is a test meeting created via the Zoom API.",
            settings: {
                host_video: true,
                participant_video: false,
                join_before_host: true,
                mute_upon_entry: true,
                watermark: false,
                use_pmi: false,
                approval_type: 0, // 0: Automatically approve, 1: Manually approve
                registration_type: 1, // 1: Attendees register once and can attend any of the occurrences
                audio: 'both', // 'voip', 'telephony', 'both'
                auto_recording: 'none' // 'local', 'cloud', 'none'
            }
        };

        await createMeeting(token, meetingDetails); //Dummy meeting with preset meeting details. Can adjust function to take JSON object.

    } else {
        console.log("Could not proceed to list users because token request failed.");
    }
}

main();
