import '../stylesheets/Attending.css';

function Attending() {
    return(
        <div className="Attending__white-box">
            <div className="Attending__white-box-inside">

                <div className="Attending__event-title-row">
                    <div className="Attending__event-title-container">
                        <h2 className="Attending__event-title">Event Title</h2>
                        <div className="Attending__event-title-underline"></div>
                    </div>
                    <button className="Attending__attending-btn">Attending</button>
                </div>

                <div className="Attending__inner-container-vertical">
                    <div className="Attending__grey-top">
                        <p>Top box content</p>
                    </div>
                    <div className="Attending__grey-bottom">
                        <p>Bottom box content -
                            Team Orange
                            Team Orange is known for its energetic spirit, 
                            collaborative mindset, and bold presence. 
                            The color orange often represents creativity, enthusiasm,
                            and forward momentum — qualities that 
                            the team strives to embody in both strategy and execution. 
                            Members of Team Orange value clear communication, 
                            collective problem-solving, and mutual support, 
                            which enables them to adapt quickly and maintain high morale
                            even in demanding situations. Whether in competition, 
                            project work, or shared learning environments, 
                            Team Orange stands out not by chance, but by a 
                            deliberate culture of initiative, resilience, and positive 
                            drive.
                        </p>
                    </div>
                </div>

            </div>

            <div className="Attending__event-list">
                <h3>Events</h3>
                <div className="Attending__title-underline"></div>
                <div className="Attending__event-item-container">
                    <div className="Attending__event-item">Event 1</div>
                    <div className="Attending__event-item">Event 2</div>
                    <div className="Attending__event-item">Event 3</div>
                </div>
                <div className="Attending__not-attending-section">
                    <h3>Not Attending</h3>
                    <div className="Attending__title-underline"></div>
                    <div className="Attending__event-item-container">
                        <div className="Attending__event-item">Event 1</div>
                        <div className="Attending__event-item">Event 2</div>
                        <div className="Attending__event-item">Event 3</div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Attending;