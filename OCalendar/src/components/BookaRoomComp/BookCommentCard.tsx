function BookCommentCard({ booking }: { booking: any }) {
    return (
        <div className="RoomDetails__commentcard">
            <p><strong>Comments:</strong></p>
            <p>{booking.comments}</p>
        </div>
    );
}

export default BookCommentCard;
