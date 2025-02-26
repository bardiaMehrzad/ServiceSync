import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID!;
const API_KEY = process.env.REACT_APP_API_KEY!;
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

const GoogleCalendar = () => {
    const [events, setEvents] = useState<any[]>([]); // State to hold fetched events
    const [selectedDate, setSelectedDate] = useState(new Date()); // State for the selected date

    const [newEvent, setNewEvent] = useState({
        summary: "",
        location: "",
        description: "",
        start: {
            dateTime: "",
            timeZone: "America/Los_Angeles",
        },
        end: {
            dateTime: "",
            timeZone: "America/Los_Aeles",
        },
    });

    useEffect(() => {
        // Initialize Google API client
        const initClient = () => {
            gapi.client
                .init({
                    apiKey: "AIzaSyA1eRL5YoMiWQmZcMoq3W28I-TwOzwo9nw",
                    clientId: "1078271580806-836nbl8fq47o6539av0sglok9g04et9q.apps.googleusercontent.com",
                    discoveryDocs: [
                        "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
                    ],
                    scope: SCOPES,
                })
                .then(() => {
                    console.log("Google API initialized");
                    listUpcomingEvents(); // Fetch events once initialized
                })
                .catch((error) => console.error("Error initializing Google API:", error));
        };

        gapi.load("client:auth2", initClient);
    }, []);

    const listUpcomingEvents = async () => {
        try {
            const response = await gapi.client.calendar.events.list({
                calendarId: "primary",
                timeMin: new Date().toISOString(),
                showDeleted: false,
                singleEvents: true,
                maxResults: 10,
                orderBy: "startTime",
            });
            setEvents(response.result.items || []);
        } catch (error) {
            console.error("Error fetching calendar events:", error);
        }
    };

    const handleAuthClick = async () => {
        try {
            await gapi.auth2.getAuthInstance().signIn();
            listUpcomingEvents(); // Fetch events after login
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    const handleAddEvent = () => {
        // Open a new pop-up window to add event
        const popUpWindow = window.open(
            "",
            "Add Event",
            "width=600,height=400,left=100,top=100"
        );

        if (popUpWindow) {
            // Pass the form HTML to the pop-up window
            popUpWindow.document.write(`
                <html>
                <head><title>Add Event</title></head>
                <body>
                    <h2>Add Event</h2>
                    <form id="addEventForm">
                        <label>Summary:</label>
                        <input type="text" id="summary" /><br />
                        <label>Location:</label>
                        <input type="text" id="location" /><br />
                        <label>Description:</label>
                        <input type="text" id="description" /><br />
                        <label>Start Time:</label>
                        <input type="datetime-local" id="startTime" /><br />
                        <label>End Time:</label>
                        <input type="datetime-local" id="endTime" /><br />
                        <button type="submit">Add Event</button>
                    </form>
                    <script>
                        document.getElementById("addEventForm").addEventListener("submit", function(event) {
                            event.preventDefault();
                            const eventDetails = {
                                summary: document.getElementById("summary").value,
                                location: document.getElementById("location").value,
                                description: document.getElementById("description").value,
                                start: {
                                    dateTime: document.getElementById("startTime").value,
                                    timeZone: "America/Los_Angeles",
                                },
                                end: {
                                    dateTime: document.getElementById("endTime").value,
                                    timeZone: "America/Los_Angeles",
                                }
                            };

                            window.opener.addEventToCalendar(eventDetails); // Pass data back to the main window
                            window.close(); // Close the pop-up window
                        });
                    </script>
                </body>
                </html>
            `);
        }
    };

    const addEventToCalendar = async (eventDetails: any) => {
        try {
            const response = await gapi.client.calendar.events.insert({
                calendarId: "primary",
                resource: eventDetails,
            });
            console.log("Event added successfully:", response.result);
            alert(`Event created: ${response.result.summary}`);
            listUpcomingEvents(); // Refresh events
        } catch (error) {
            console.error("Error creating event:", error);
        }
    };

    const tileClassName = ({ date }: { date: Date }) => {
        const eventDate = date.toISOString().split("T")[0]; // Format the date as YYYY-MM-DD
        const eventOnDate = events.some(
            (event) =>
                event.start.dateTime?.split("T")[0] === eventDate ||
                event.start.date?.split("T")[0] === eventDate
        );
        return eventOnDate ? "highlight-event" : "";
    };

    return (
        <div>
            <button onClick={handleAuthClick}>Sign In</button>
            <h3>Upcoming Events</h3>
            <ul>
                {events.map((event: any, index) => (
                    <li key={index}>
                        {event.start?.dateTime || event.start?.date} - {event.summary}
                    </li>
                ))}
            </ul>

            <h3>Google Calendar</h3>
            <button onClick={handleAddEvent}>Add Event</button>
            <Calendar
                value={selectedDate}
                tileClassName={tileClassName} // Highlights dates with events
            />
        </div>
    );
};

export default GoogleCalendar;
