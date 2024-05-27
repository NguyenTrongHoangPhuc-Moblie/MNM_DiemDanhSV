import React, { useState, useEffect } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';

function Calendar() {
    const [events, setEvents] = useState([]);

    const handleDateClick = (info) => {
      const title = prompt('Enter Event Title:');
      const newEvent = {
        title,
        start: info.dateStr,
      };
  
      // Save event to the backend
      axios.post('/api/events', newEvent)
        .then(response => {
          // Update state with the new event
          setEvents([...events, response.data]);
        })
        .catch(error => {
          console.error('Error saving event:', error);
        });
    };

    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={"dayGridMonth"}
                headerToolbar={{
                    start: "today prev,next",
                    center: "title",
                    end: "dayGridMonth, timeGridWeek, timeGridDay",
                }}
                height={"90vh"}
                events={events}
                dateClick={handleDateClick}
            />
        </div>
    )
}
export default Calendar