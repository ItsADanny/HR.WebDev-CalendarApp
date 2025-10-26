import './stylesheets/Calendar.css'

function Calendar() {
    return (
        <div className="white-box">
            <div className="white-box-inside">
                <table className="calendar">
                    <tr className="calendar-header">
                        <th>SUN</th>
                        <th>MON</th>
                        <th>TUE</th>
                        <th>WEN</th>
                        <th>THU</th>
                        <th>FRI</th>
                        <th>SAT</th>
                    </tr>
                    <tr>
                        <td>1
                            <ul>
                                <li className="calendar-item past"> </li>
                            </ul>
                        </td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                        <td>7</td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td>9</td>
                        <td>10
                            <ul>
                                <li className="calendar-item going"> </li>
                            </ul>
                        </td>
                        <td>11</td>
                        <td>12</td>
                        <td>13</td>
                        <td>14</td>
                    </tr>
                    <tr>
                        <td>15</td>
                        <td>16
                            <ul>
                                <li className="calendar-item notGoing"> </li>
                            </ul>
                        </td>
                        <td>17</td>
                        <td>18</td>
                        <td>19</td>
                        <td>20</td>
                        <td>21</td>
                    </tr>
                    <tr>
                        <td>22</td>
                        <td>23</td>
                        <td>24</td>
                        <td>25</td>
                        <td>26</td>
                        <td>27</td>
                        <td>28</td>
                    </tr>
                    <tr>
                        <td>29</td>
                        <td>30</td>
                        <td>31</td>
                    </tr>
                </table>
            </div>
            <div className="event-list">
                <h3>Events - September</h3>
                <div className="event-title-underline"></div>
                <div className="event-item">Event 1</div>
                <div className="event-item">Event 2</div>
                <div className="event-item">Event 3</div>
            </div>
        </div>
    )
}

export default Calendar;