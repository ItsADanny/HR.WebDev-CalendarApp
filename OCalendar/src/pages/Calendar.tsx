import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import '../stylesheets/Calendar.css'
import type { CalendarEvent } from '../types/CalendarEvent';
import type { EventAttendance } from '../types/EventAttendance';
import LogoutBtn from '../components/LogoutBtn';
import NavbarLoggedIn from '../components/NavbarLoggedIn';

function Calendar() {
    //Calendar text for English
    const daysOfTheWeek_EN : string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const monthsOfTheYear_EN: string[] = ["January", "February", "March", "April", "May",
                                         "June", "July", "August", "September", "October",
                                         "November", "December"];
    const OtherUIText_EN: string[] = ["Events", "No events this month"];

    //Calendar text for Dutch
    const daysOfTheWeek_NL : string[] = ["Maa", "Din", "Woe", "Don", "Vri", "Zat", "Zon"];
    const monthsOfTheYear_NL: string[] = ["Januari", "Februari", "Maart", "April", "Mei",
                                         "Juni", "Juli", "Augustus", "September", "Oktober",
                                         "November", "December"];
    const OtherUIText_NL: string[] = ["Evenementen", "Geen evenementen deze maand"];

    //Const which will contain the current date
    const currentDate: Date = new Date();

    //UseStates to set the currently selected Month & Year
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
    //UseState to set the current UI Language
    const [currentLang, setCurrentLang] = useState(navigator.language.startsWith("nl") ? "nl" : "en");
    //UseState for the animation of the date change
    const [textDirection, setTextDirection] = useState<"Prev"|"Next">("Next");

    //UseStates for our Event and Attendance data
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [attendances, setAttendances] = useState<EventAttendance[]>([]);

    //Default language for the calendar will be English but can be switched up to Dutch on the users request (or system language)
    let selectedLanguage_DaysOfTheWeek: string[];
    let selectedLanguage_MonthsOfTheYear: string[];
    let selectedLanguage_OtherUIText: string[];

    switch(currentLang) {
        //Switch case for the Dutch Language option
        case "nl":
            selectedLanguage_DaysOfTheWeek = daysOfTheWeek_NL;
            selectedLanguage_MonthsOfTheYear = monthsOfTheYear_NL;
            selectedLanguage_OtherUIText = OtherUIText_NL;
            break;
        //Default will always be English but this can be set
        case "en": default:
            selectedLanguage_DaysOfTheWeek = daysOfTheWeek_EN;
            selectedLanguage_MonthsOfTheYear = monthsOfTheYear_EN;
            selectedLanguage_OtherUIText = OtherUIText_EN;
            break;
    }
    
    //Get the amount of days in the current month
    const daysInTheMonth: number = new Date(currentYear, currentMonth + 1, 0).getDate();
    //Get the first day of the current month
    const firstDayOfTheMonth: number = new Date(currentYear, currentMonth, 1).getDay();
    //Get the amount of days in the previouse month
    let daysInThePreviouseMonth: number;
    if (currentMonth == 0) {
        daysInThePreviouseMonth = new Date(currentYear - 1, 12, 0).getDate();
    } else {
        daysInThePreviouseMonth = new Date(currentYear, currentMonth, 0).getDate();
    }

    //Use useEffect to retriev all the events from the API
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const token: string | null = localStorage.getItem("token");
                if (token == null) {
                    throw new Error("No token found, User shouldn't be on this page without token");
                }

                const response = await fetch(
                    `http://localhost:5050/Event/${currentYear}/${currentMonth + 1}`,
                    {
                        method: 'GET',
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
                    "http://localhost:5050/EventAttendance/month/" + currentYear + "/" + (currentMonth + 1) + "/" + userID,
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
    }, [currentMonth, currentYear]);

    const prevMonth = () => {
        //Sets the direction for the animation
        setTextDirection("Prev");

        //If the previouse month is 0 (Januari) then set it 11 (December), else set it to the previouse month decreased 1 
        setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11: prevMonth - 1));
        //If the current month is 0 (Januari) then decrease the year by 1, else keep it the current year
        setCurrentYear(prevYear => currentMonth === 0 ? prevYear - 1 : prevYear);
    }

    const nextMonth = () => {
        //Sets the direction for the animation
        setTextDirection("Next");

        //If the previouse month is 11 (December) then set it 0 (Januari), else set it to the previouse month increase 1 
        setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0: prevMonth + 1));
        //If the current month is 11 (December) then increase the year by 1, else keep it the current year
        setCurrentYear(prevYear => currentMonth === 11 ? prevYear + 1 : prevYear);
    }

    //Return a true or false if the current day in the Calendar is the current Date
    const IsCurrentDay = (day: number): boolean => day + 1 === currentDate.getDate() && currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear();

    const hasEventOnDay = (day: number): boolean => {
        return getEventsOnDay(day).length > 0;
    };

    const getEventsOnDay = (day: number): CalendarEvent[] => {
        return events.filter(event => {
            const eventDate = new Date(event.fromDateTime);
            return (
                eventDate.getDate() === day + 1 &&
                eventDate.getMonth() === currentMonth &&
                eventDate.getFullYear() === currentYear
            );
        });
    };

    const getAttendingResult = (eventID: number): string => {
        let attending: null | boolean = null;
        
        for (let i = 0; i < attendances.length; i++) {
            let attendance = attendances[i];
            if (attendance.eventId == eventID) {
                attending = attendances[i].attending;
            }
        }
        
        switch (attending) {
            case true:
                return ' going';
            case false:
                return ' notGoing';
            case null: default:
                return ' past';
        }
    };

    const DTToEVLStr = (DTValue: Date): string => DTValue.toLocaleDateString([], {month:'2-digit', day:'2-digit', hour: '2-digit', minute: '2-digit', hour12: false});
    const DTToTimeStr = (DTValue: Date): string => DTValue.toLocaleDateString([], {hour: '2-digit', minute: '2-digit', hour12: false});

    return (
        <>
            <div className="Calendar__white-box">
                <div className="Calendar__white-box-inside">
                    <h3>OCalendar</h3>
                    <div className="Calendar__event-title-underline"></div>
                    <div className="calendar">
                        <div className="calendar-navigation">
                            <button className='calendar-navigation-buttons-back' onClick={prevMonth} >⟵</button>
                            <h2 key='${currentMonth}-${currentYear}-${currentLang}' className="calendar-navigation-text ${textDirection}">{selectedLanguage_MonthsOfTheYear[currentMonth]} {currentYear}</h2>
                            <button className='calendar-navigation-buttons-forward' onClick={nextMonth} >⟶</button>
                        </div>
                        <div className='calendar-weekdays'>
                            {
                                //[NOTES from ItsDanny]
                                //Callback on each element in the array and returns a new array with the results from the callback
                                //In this instance it will return a new array with <span>{day}</span> for each day in our selectedLanguage_DaysOfTheWeek
                                //array
                                selectedLanguage_DaysOfTheWeek.map((day: string) => <span key={day}>{day}</span>)
                            }
                        </div>
                        <div className='calendar-days'>
                            {
                                //[NOTES from ItsDanny]
                                //This code is used to generate the display dates before the start date of the month (Like you can see in Apple Calendar for instance)
                                //This is a modified version of the same code we use under this part to generate all the other days for the calendar.
                                //The differences are in that this version has 2 extra checks (to see if the month starts on a 1 (Monday) and to see if the month start on a 0 (Sunday)
                                //) and in the way that we use index for our dates

                                //Check to see if the first day of the month is 1 (Monday) 
                                //if so we don't need to show any before dates, else we generate the days before the first day of the month
                                firstDayOfTheMonth === 1 ? 
                                [] : [...Array(
                                        //This check will prevent the array from going out of range when the start day of the month is 0 (Sunday)
                                        (firstDayOfTheMonth - 1 < 0 ? 7 : firstDayOfTheMonth) - 1
                                    )
                                    //We use keys to return a iterable array for the keys of our new Array
                                    .keys()]
                                    //Then we use Map to generate the required HTML <span> elements
                                    .map(
                                        (_: number, index: number) => <div 
                                            key={"p" + (daysInThePreviouseMonth - index)}
                                            className='calendar-days-prev'
                                        >
                                            {daysInThePreviouseMonth - index}
                                        </div>
                                    ).reverse()
                                    //Finally we reverse our output to get the dates in the correct order
                            }
                            {
                                [...Array(daysInTheMonth).keys()].map((day: number) => (
                                    <div key={day + 1}>
                                        <div className={IsCurrentDay(day) ? "calendar-days-current" : ""}>
                                            {day + 1}
                                        </div>

                                        {
                                            hasEventOnDay(day) === true ? 
                                                [Array(getEventsOnDay(day)).map(
                                                    (CalEventList: CalendarEvent[]) => 
                                                        <div className='calendar-days-eventlist'>{CalEventList.map(
                                                            (CalEvent: CalendarEvent) =>
                                                                <NavLink to={"/attending/" + CalEvent.id}>
                                                                    <div key={"CalE." + CalEvent.id} className={'calendar-item' + getAttendingResult(CalEvent.id)} title={CalEvent.description + "\n\nFrom: " + 
                                                                                                                        DTToTimeStr(new Date(CalEvent.fromDateTime)) + "\nUntil: " + 
                                                                                                                        DTToTimeStr(new Date(CalEvent.untilDateTime))}>
                                                                        {CalEvent.title}
                                                                    </div>
                                                                </NavLink>
                                                            )}
                                                        </div>)
                                                ] 
                                            : null
                                        }
                                        
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="Calendar__event-list">
                    <h3>{selectedLanguage_OtherUIText[0]} - {selectedLanguage_MonthsOfTheYear[currentMonth]} {currentYear}</h3>
                    <div className="Calendar__event-title-underline"></div>
                    {
                        //Simple check to see if there are any events for the month,
                        //If there aren't any events for this month we display a "No events this month message"
                        events.length === 0 && (
                            <p>{selectedLanguage_OtherUIText[1]}</p>
                        )
                    }

                    {
                        //Using map to return a new array with our data transformed into event-items with the required values
                        events.map(event => (
                            <NavLink to={"/attending/" + event.id}>
                                <div key={"EVI." + event.id} className='Calendar__event-item'>
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
    )
}

export default Calendar;