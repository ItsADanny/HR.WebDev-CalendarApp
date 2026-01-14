import '../stylesheets/Attending.css';
import { useEffect, useState } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import type { CalendarEvent } from '../types/CalendarEvent';
import type { EventAttendance } from "../types/EventAttendance";
import type { EventComment } from "../types/EventComment";
import AttendingCard from '../components/Attendingcomponents/attendingCard';
import AttendingCardAwnserModal from '../components/Attendingcomponents/Modal/attendingCardAwnserModal';
import LogoutBtn from '../components/LogoutBtn';
import NavbarLoggedIn from '../components/NavbarLoggedIn';

function Attending() {
    if (localStorage.getItem('adminPanelAccess') === '1') {
        const navigate = useNavigate();
        navigate('/admin-dashboard');
    }

    const { eventId } = useParams();

    //UseState for declaring that we made an update
    const [updated, setUpdated] = useState<boolean>(false);

    //UseStates for our Event and Attendance data
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [attendances, setAttendances] = useState<EventAttendance[]>([]);
    const [comments, setComments] = useState<EventComment[]>([]);

    //UseState for handeling our modal
    const [modalOpen, setModalOpen] = useState(false);

    const ButtonClickHandlerAttendance = (input: boolean | null) => {
        if (input != null) {
            if (eventId != undefined) {
                const attendance = GetAttendance(GetEvent(eventId));

                if (attendance != null) {
                    sendAttendingResultUpdateRequest(attendance.id, +eventId, input);
                } else {
                    sendAttendingResultRequest(+eventId, input);
                }

                setUpdated(true);
            }
        }

        setModalOpen(false);
    }

    const ButtonClickHandlerComments = (input: string | null) => {
        if (input != null && input !== "") {
            if (eventId != undefined) {
                sendCommentsRequest(input, +eventId);
                setUpdated(true);
            }
        }
    }

    const sendAttendingResultRequest = async (eventid: number, attending: boolean) : Promise<void> => {
        const messageBody = {
            userid: localStorage.getItem("userId"),
            eventid: eventid,
            attending: attending
        };

        try {
            const token: string | null = localStorage.getItem("token");
            if (token == null) {
                throw new Error("No token found, User shouldn't be on this page without token");
            }

            const response = await fetch(
                "http://localhost:5050/EventAttendance",
                {
                    method: "POST",
                    headers: {
                        "Authorization": token,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(messageBody)
                }
            );

            if (!response.ok) {
                throw new Error("Failed to send attending result");
            }
        } catch (error) {
            console.error(error);
        }
    }

    const sendAttendingResultUpdateRequest = async (attendanceid: number, eventid: number, attending: boolean) : Promise<void> => {
        const messageBody = {
            userid: localStorage.getItem("userId"),
            eventid: eventid,
            attending: attending
        };

        try {
            const token: string | null = localStorage.getItem("token");
            if (token == null) {
                throw new Error("No token found, User shouldn't be on this page without token");
            }

            const response = await fetch(
                "http://localhost:5050/EventAttendance/" + attendanceid,
                {
                    method: "PUT",
                    headers: {
                        "Authorization": token,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(messageBody)
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update attending result");
            }
        } catch (error) {
            console.error(error);
        }
    }

    const sendCommentsRequest = async (comment: string, eventId: number) : Promise<void> => {
        const messageBody = {
            userid: localStorage.getItem("userId"),
            eventid: eventId,
            comment: comment
        };

        try {
            const token: string | null = localStorage.getItem("token");
            if (token == null) {
                throw new Error("No token found, User shouldn't be on this page without token");
            }

            const response = await fetch(
                "http://localhost:5050/EventComment",
                {
                    method: "POST",
                    headers: {
                        "Authorization": token,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(messageBody)
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to send comment: ${response.status} ${errorText}`);
            }
        } catch (error) {
            console.error("Error sending comment:", error);
        }
    }
        
    //Use useEffect to retriev the required data from the API
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const token: string | null = localStorage.getItem("token");
                if (token == null) {
                    throw new Error("No token found, User shouldn't be on this page without token");
                }
    
                const response = await fetch(
                    `http://localhost:5050/Event/current`,
                    {
                        method: "GET",
                        headers: {
                            "Authorization": token,
                            "Content-Type": "application/json"
                        }
                    }
                );
    
                if (!response.ok) {
                    throw new Error("Failed to fetch events");
                }
    
                const data: CalendarEvent[] = await response.json();
                setEvents(data);
            } catch (error) {
                console.error(error);
                setEvents([]);
            }
        };

        const fetchAttendance = async () => {
            try {
                const token: string | null = localStorage.getItem("token");
                const userID: string | null = localStorage.getItem("userId");
                if (token == null) {
                    throw new Error("No token found, User shouldn't be on this page without token");
                }

                const response = await fetch(
                    "http://localhost:5050/EventAttendance/user/" + userID,
                    {
                        headers: {
                            "Authorization": token,
                            "Content-Type": "application/json"
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch event attendance");
                }

                const data: EventAttendance[] = await response.json();
                setAttendances(data);
            } catch (error) {
                console.error(error);
                setAttendances([]);
            }
        }

        fetchEvents();
        fetchAttendance();
        setUpdated(false);
    }, [updated]);

    //Load the comments when there is a EventID present and when updated changes
    useEffect(() => {
        if (eventId != undefined) {
            const fetchComments = async () => {
                try {
                    const token: string | null = localStorage.getItem("token");
                    if (token == null) {
                        throw new Error("No token found, User shouldn't be on this page without token");
                    }
        
                    const response = await fetch(
                        `http://localhost:5050/EventComment/event/` + eventId,
                        {
                            method: "GET",
                            headers: {
                                "Authorization": token,
                                "Content-Type": "application/json"
                            }
                        }
                    );
        
                    if (!response.ok) {
                        throw new Error("Failed to fetch comments");
                    }
        
                    const data: EventComment[] = await response.json();
                    setComments(data);
                } catch (error) {
                    console.error(error);
                    setComments([]);
                }
            };

            fetchComments();
        }
    }, [eventId, updated]);

    //Get a specific event based on ID
    const GetEvent = (calEventID: number | string) : CalendarEvent | null => {
        //If the input is a string, convert it into a number
        if (typeof calEventID === "string") calEventID = +calEventID;

        //Iterate through the events
        for (let i = 0; i < events.length; i++) {
            //If an event has a matching ID with the input then return the event
            if (events[i].id == calEventID) return events[i];
        }
        //If no result is found, we will always return a null
        return null;
    }

    //Get a specific attendance based on ID
    const GetAttendance = (calEvent: CalendarEvent | null) : EventAttendance | null => {
        if (calEvent === null) return null;

        //Iterate through the attendances
        for (let i = 0; i < attendances.length; i++) {
            //If an event has a matching EventID with the input then return the attendance
            if (attendances[i].eventId == calEvent.id) return attendances[i];
        }
        //If no result is found, we will always return a null
        return null;
    }

    //Functions to change formating of a Date to a certain string format
    const DTToEVLStr = (DTValue: Date): string => DTValue.toLocaleDateString([], {month:'2-digit', day:'2-digit', hour: '2-digit', minute: '2-digit', hour12: false});
    const DTToTimeStr = (DTValue: Date): string => DTValue.toLocaleDateString([], {hour: '2-digit', minute: '2-digit', hour12: false});

    return(
    <>
        <div className="booking-container">
            
            {/* LEFT COLUMN */}
            <div className="left-column" key="left-column-attending">
                {
                    eventId != undefined ?
                        GetEvent(eventId) != null ? 
                            <>
                                <AttendingCard key="AttendingCard" event={GetEvent(eventId)} attendance={GetAttendance(GetEvent(eventId))} openModal={setModalOpen} comments={comments} commentsButton={ButtonClickHandlerComments}/>
                                {modalOpen ? <AttendingCardAwnserModal 
                                    onSubmit={(input: boolean) => ButtonClickHandlerAttendance(input)} 
                                    onCancel={() => ButtonClickHandlerAttendance(null)} 
                                    event={GetEvent(eventId)!} 
                                /> : null}
                            </>
                            : 
                            <AttendingCard event={null} attendance={null} openModal={null} comments={[]} commentsButton={() => {}}/>
                        :
                        <AttendingCard event={null} attendance={null} openModal={null} comments={[]} commentsButton={() => {}}/>
                }
            </div>
            {/* RIGHT COLUMN */}
            <div className="right-column">
                <h3>Events</h3>
                <div className="Calendar__event-title-underline"></div>
                {
                    //Simple check to see if there are any events for the month,
                    //If there aren't any events for this month we display a "No events this month message"
                    events.length === 0 && (
                        <p>No events found</p>
                    )
                }

                {
                    //Using map to return a new array with our data transformed into event-items with the required values
                    events.map(event => (
                        //NavLink to link to the specific event page based on the event ID
                        //with a onClick to close the modal when we navigate to a new event
                        <NavLink key={"ATL." + event.id} to={"/attending/" + event.id} onClick={() => setModalOpen(false)}>
                            <div className='Calendar__event-item'>
                                <strong>{event.title}</strong>
                                <div>
                                    {/* Here we show put the start and end datetime into our event item*/}
                                    {DTToEVLStr(new Date(event.fromDateTime))} - {DTToEVLStr(new Date(event.untilDateTime))}
                                </div>
                            </div>
                        </NavLink>
                    ))
                }
            </div>
        </div>
        <NavbarLoggedIn navbarItems={[
                    { name: "Calendar", path: "/calendar" },
                    { name: "Attending", path: "/attending" },
                    { name: "Book a Room", path: "/book-a-room" }
                ]} />
        <LogoutBtn />
    </>
    );
}

export default Attending;