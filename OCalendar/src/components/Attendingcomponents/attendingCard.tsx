import AttendingCardHeader from "./attendingCardHeader";
import AttendingCardBody from "./attendingCardBody";
import type { CalendarEvent } from "../../types/CalendarEvent";
import type { EventAttendance } from "../../types/EventAttendance";
import type { EventComment } from "../../types/EventComment";

interface AttendingCardProps {
  event: CalendarEvent | null;
  attendance: EventAttendance | null;
  openModal : React.Dispatch<React.SetStateAction<boolean>> | null;
  comments: EventComment[];
  commentsButton: (input: string | null) => void;
}

function AttendingCard({ event, attendance, openModal, comments, commentsButton }: AttendingCardProps) {
    return (
        <>
            <AttendingCardHeader event={event} attendance={attendance} openModal={openModal}/>

            {event != null ? <AttendingCardBody event={event} comments={comments} commentsButton={commentsButton} />: null}
        </>
    );
}

export default AttendingCard;