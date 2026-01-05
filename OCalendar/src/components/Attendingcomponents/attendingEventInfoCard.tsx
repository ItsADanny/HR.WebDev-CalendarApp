// import "./css/AttendingInfoCard.css";
import type { CalendarEvent } from "../../types/CalendarEvent";

interface AttendingEventInfoCardProps {
  event: CalendarEvent;
}

function AttendingEventInfoCard({ event }: AttendingEventInfoCardProps) {
  const DTToEVLStr = (DTValue: Date): string => DTValue.toLocaleDateString([], {month:'2-digit', day:'2-digit', hour: '2-digit', minute: '2-digit', hour12: false});
  
  return (
    <div className="room-info-card">
      <p>{event.description}</p>
      <p>From: {DTToEVLStr(new Date(event.fromDateTime))}</p>
      <p>Until: {DTToEVLStr(new Date(event.untilDateTime))}</p>
    </div>
  );
}

export default AttendingEventInfoCard;