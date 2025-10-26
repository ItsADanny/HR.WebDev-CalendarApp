function Attending() {
    return(
        <div className="white-box">
            <div className="white-box-inside">
                
                <div className="event-title-row">
                    <div className="event-title-container">
                        <h2 className="event-title">Event Title</h2>
                        <div className="event-title-underline"></div>
                    </div>
                    <button className="attending-btn">Attending</button>
                </div>

                <div className="attending-inner-container-vertical">
                    <div className="attending-grey-top">
                        <p>Top box content</p>
                    </div>
                    <div className="attending-grey-bottom">
                        <p>Bottom box content</p>
                    </div>
                </div>

            </div>

            <div className="attending-list">
                <h3>Events</h3>
                <div className="title-underline"></div>
                <div className="event-item">Event 1</div>
                <div className="event-item">Event 2</div>
                <div className="event-item">Event 3</div>

                <div className="not-attending-section">
                    <h3>Not Attending</h3>
                    <div className="title-underline"></div>
                    <div className="event-item">Event A</div>
                    <div className="event-item">Event B</div>
                    <div className="event-item">Event C</div>
                </div>
            </div>

        </div>
    );
}