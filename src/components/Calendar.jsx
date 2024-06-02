import React, { useRef, useState, useEffect } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
// import { Table } from "react-bootstrap";
import { useNavigate  } from "react-router-dom";
// import MenuList from "../components/MenuList";
// import Logo from "../components/Logo";
// import { Button, Layout, theme } from "antd";
// import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";



function Calendar() {
  const history = useNavigate();
  //const [events, setEvents] = useState([]);
  const [data, setData] = useState([]);
  const [records, setRecords] = useState(data);

  const handleSelect = (info) => {
    const start = info.startStr;
    const end = info.endStr;
    history(`/themCTNH?start=${start}&end=${end}`);
    //history.push('/themCTNH', { start: info.startStr, end: info.endStr });
  };
  // axios.get("http://localhost:8000/api/danhSachCalendar").then(response => {

  //   //getting and setting api data into variable
  //   setData({ data: response.data });
  //   console.log(data);
  // })

  const calendarRef = useRef(null);

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();

      // Xử lý sự kiện eventClick
      calendarApi.on('eventClick', (info) => {
        // Lấy title của sự kiện
        const event = info.event;
        const eventData = {
          title: event.title,
          start: event.start,
        };
        const title = info.event.title;
        const eventDate = info.event.start;
        const eventDay = eventDate.getDate();
        const eventMonth = eventDate.getMonth() + 1; // Tháng bắt đầu từ 0
        const eventYear = eventDate.getFullYear();
        //alert(`Ngày tháng năm của sự kiện: ${eventDay}/${eventMonth}/${eventYear}`);
        history(`/listBDD/${title}/${eventYear}-${eventMonth}-${eventDay}`);
      });
    }
  }, []);

  // const handleDateClick = (info) => {
  //   const title = prompt('Enter Event Title:');
  //   const newEvent = {
  //     title,
  //     start: info.dateStr,
  //   };

  //   // Save event to the backend
  //   axios.post("http://localhost:8000/api/danhSachCalendar", newEvent)
  //     .then(response => {
  //       // Update state with the new event
  //       setEvents([...events, response.data]);
  //     })
  //     .catch(error => {
  //       console.error('Error saving event:', error);
  //     });
  // };

  // const truyXuat = async () => {
  //   let result = await fetch("http://localhost:8000/api/danhSachCalendar");
  //   result = await result.json();
  //   setData(result);
  //   setRecords(result);
  // };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/danhSachCalendar")
      .then((res) => {
        setData(res.data);
        setRecords(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth, timeGridWeek, timeGridDay",
        }}
        height={"90vh"}
        events=
        {
          data
        }
        selectable={true}
        selectHelper={true}
        select={handleSelect}
        // eventClick={function(event) {
        //   console.log(event)
        // }}
        //dateClick={handleDateClick}
      />
    </div>
  )
}
export default Calendar