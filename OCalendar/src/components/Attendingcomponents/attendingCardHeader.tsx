// import "./css/HeaderCard.css";
import type { CalendarEvent } from '../../types/CalendarEvent';
import type { EventAttendance } from "../../types/EventAttendance";

interface AttendingCardHeaderProps {
  event: CalendarEvent | null;
  attendance: EventAttendance | null;
  openModal : React.Dispatch<React.SetStateAction<boolean>> | null;
}

function AttendingCardHeader({ event, attendance, openModal }: AttendingCardHeaderProps) {
    if (event === null || openModal === null) {
        return (
            <div className="header-card">
                <h1>No event selected</h1>
            </div>
        );
    }

    const getAttendingResult = (attendance : EventAttendance | null): string => {
        if (attendance === null) return ' past'

        switch (attendance.attending) {
            case true:
                return 'going';
            case false:
                return 'notGoing';
            default:
                return 'past';
        }
    };

    const getUIAttendingResult = (attendance : EventAttendance | null) : string => {
        if (attendance === null) return 'Not awnsered'

        switch (attendance.attending) {
            case true:
                return "Attending";
            case false:
                return "Not Attending";
            default:
                return "Not awnsered";
        }
    }

    return (
        <div key={"ach" + event.id} className="header-card">
            <h1>{event.title}</h1>
            {/* make dynamic voor switch tussen event en rooms */}
                <div key={"achd" + event.id} className={`status-indicator ${getAttendingResult(attendance)}`} onClick={() => openModal(true)}>
                    {getUIAttendingResult(attendance)}
                </div>
        </div>
    );
}

export default AttendingCardHeader;