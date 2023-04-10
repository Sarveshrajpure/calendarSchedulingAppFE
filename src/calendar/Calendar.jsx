import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { getSchedule } from "../actions/calendarActions";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.css";

function CalendarPage() {
  const location = useLocation();
  const [events, setEvents] = useState([]);
  moment.locale("ko", {
    week: {
      dow: 1,
      doy: 1,
    },
  });
  const localizer = momentLocalizer(moment);

  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  useEffect(() => {
    const getCalendarSchedule = async () => {
      try {
        let response = await getSchedule({
          course: location.state.course,
          enrollDate: formatDate(location.state.enrollDate),
          hoursWillingToCommit: location.state.hoursWillingToCommit,
        });

        setEvents(response.schedule);

      
      } catch (error) {
        console.log(error);
      }
    };
    getCalendarSchedule();
  }, [
    location.state.course,
    location.state.enrollDate,
    location.state.hoursWillingToCommit,
  ]);

  return (
    <div className="calendarContainer bg-bgDark   flex items-center justify-center h-screen">
      <div className="w-10/12 mt-5 mb-5">
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 673 }}
          defaultView={"month"}
          views={["month"]}
          events={events}
          popup
        />
      </div>
    </div>
  );
}

export default CalendarPage;
