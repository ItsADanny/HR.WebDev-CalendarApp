import type { EventComment } from "../../types/EventComment";
import { useState, useEffect } from "react";

interface AttendingEventCommentCardProps {
    comments: EventComment[];
    commentsButton: (comment: string) => void;
}

function AttendingEventCommentCard({ comments, commentsButton }: AttendingEventCommentCardProps) {
    const [usernames, setUsernames] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        const uniqueUserIds = [...new Set(comments.map(c => c.userId))];
        
        const fetchUsernames = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            const fetchedUsernames: { [key: number]: string } = {};

            for (const userId of uniqueUserIds) {
                try {
                    const response = await fetch(
                        `http://localhost:5050/User/${userId}`,
                        {
                            method: 'GET',
                            headers: {
                                "Authorization": token,
                                "Content-Type": "application/json"
                            }
                        }
                    );

                    if (response.ok) {
                        const userData = await response.json();
                        fetchedUsernames[userId] = userData.firstName + " " + userData.lastName || `User ${userId}`;
                    } else {
                        fetchedUsernames[userId] = `User ${userId}`;
                    }
                } catch (error) {
                    console.error(`Failed to fetch username for user ${userId}:`, error);
                    fetchedUsernames[userId] = `User ${userId}`;
                }
            }

            setUsernames(fetchedUsernames);
        };

        if (uniqueUserIds.length > 0) {
            fetchUsernames();
        }
    }, [comments]);

    const getUsernameById = (userId: number): string => {
        return usernames[userId] || `User ${userId}`;
    }

    return (
        <div className="cards-container">
            <div className="event-comment-card">
                <div className="comments-section">
                    <h3>Comments:</h3>
                    <div className="comments-list">
                        {comments.length === 0 ? (
                            <p className="no-comments">No comments available.</p>
                        ) : (
                            comments.map((comment) => (
                                <div key={comment.id} className="comment-line">
                                    <strong>{getUsernameById(comment.userId)}:</strong>
                                    <span>{comment.comment}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <div className="add-comment-section">
                    <textarea
                        placeholder="Add a comment..."
                        rows={2}
                        id="new-comment-textarea"
                        className="comment-textarea"
                    ></textarea>
                    <button 
                        className="comment-submit-btn"
                        onClick={() => {
                            const textarea = document.getElementById('new-comment-textarea') as HTMLTextAreaElement;
                            if (textarea && textarea.value.trim() !== "") {
                                commentsButton(textarea.value.trim());
                                textarea.value = "";
                            }
                        }}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AttendingEventCommentCard;