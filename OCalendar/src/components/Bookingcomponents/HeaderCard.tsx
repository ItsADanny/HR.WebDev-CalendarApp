import "./css/HeaderCard.css";

interface HeaderCardProps {
  title?: string;
  status?: "Booked" | "Available" | "Attending" | "Not Attending";
}

function HeaderCard({ title = "Room 101", status = "Booked" }: HeaderCardProps) {
    return (
        <>
            <div className="header-card">
                <h1>{title}</h1>
                    <div className={`status-indicator 
                        ${status === "Booked" ? "booked" : "available"}`}>
                            {status}
                    </div>
            </div>
        </>
    );
}

export default HeaderCard;