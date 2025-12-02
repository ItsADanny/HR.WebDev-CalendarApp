import './css/RoomCommentCard.css';

// interface RoomCommentCardProps {
//   comments: string;
//   onChange: (newComments: string) => void;
// }

function RoomCommentCard({ comments, onChange }: { comments: string; onChange: (newComments: string) => void }) {
    return (
        <div className="room-comment-card">
            <h2>Comments:</h2>
            <textarea
                placeholder="Write your comment here..."
                value={comments}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}

export default RoomCommentCard;