import { listUsers } from './listUsers.js';
import { updateMeeting } from './updateMeeting.js';
import { createMeeting } from './createMeeting.js';
import { listMeetings } from './listMeetings.js';
import { deleteMeeting } from './deleteMeeting.js';
import { getValidToken } from './getToken.js';

async function main() {
    const token = await getValidToken();

    if (token) {
        //Testing list users (GET).

        // await listUsers(token);

        //...............................................................................................................................

        // Testing list meetings (GET). 
        // Copy meeting IDs here to test following function. If no meetings are listed, create a meeting.

        const meetingType = {
            type: 'scheduled', // 'scheduled', 'live', 'upcoming'
            page_size: 100
        }; //Zoom insists that meeting types be required to list meetings.
        await listMeetings(token, meetingType);

        //...............................................................................................................................

        //Testing create meeting (POST).

        // const meetingDetails = {
        //     topic: "This is a test meeting.",
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
        // await createMeeting(token, meetingDetails);

        //...............................................................................................................................

        // Testing update meeting (PATCH).

        // const updateDetails = {
        //     topic: "This is a PATCH test to update meeting details",
        //     agenda: "The agenda for this meeting has been updated via PATCH."
        // }; //Only includes key - value pairs that are required to change.
        // const meetingID = 77682791707; //Be sure to change meeting ID (can be obtained from listMeetings method)
        // await updateMeeting(token, meetingID, updateDetails)

        //...............................................................................................................................

        //Testing delete meeting (DELETE).

        // await deleteMeeting(token, 77682791707); //Be sure to change meeting ID (can be obtained from listMeetings method)

    } else {
        console.log("Failed.");
    }
}

main();
