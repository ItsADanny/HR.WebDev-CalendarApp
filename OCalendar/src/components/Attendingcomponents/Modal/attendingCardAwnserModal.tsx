import type { CalendarEvent } from "../../../types/CalendarEvent";

interface AttendingCardAwnserModalProps {
  onSubmit: (attending: boolean) => void;
  onCancel: () => void;
  event : CalendarEvent;
}

function AttendingCardAwnserModal({onSubmit, onCancel, event} : AttendingCardAwnserModalProps) {
    return (
        <div className="AttendingCard-AwnserModal-Container">
            <div className="AttendingCard-AwnserModal">
                <div className="AttendingCard-AwnserModal-Header">
                    <h3>Attending "{event.title}"?</h3>
                </div>
                <div className="AttendingCard-AwnserModal-Buttons">
                    <button onClick={() => onSubmit(true)}>Attending</button>
                    <button onClick={() => onSubmit(false)}>Not Attending</button>
                    <button onClick={() => onCancel()}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default AttendingCardAwnserModal;