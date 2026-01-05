import AttendingEventInfoCard from "./attendingEventInfoCard";
import AttendingEventCommentCard from "./attendingEventCommentCard";
import type { CalendarEvent } from "../../types/CalendarEvent";
import type { EventComment } from "../../types/EventComment";

interface AttendingCardBodyProps {
    event: CalendarEvent;
    comments: EventComment[];
    commentsButton: (input: string | null) => void;
}

function AttendingCardBody({ event, comments, commentsButton }: AttendingCardBodyProps) {
    return (
        <div className="cards-container">
            <AttendingEventInfoCard event={event}/>
            <AttendingEventCommentCard comments={comments} commentsButton={commentsButton} />
        </div>
    );
}

export default AttendingCardBody;