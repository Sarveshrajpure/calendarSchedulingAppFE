import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { getSchedule } from "../actions/calendarActions";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.css";
import BarLoader from "react-spinners/BarLoader";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

function CalendarPage() {
  const location = useLocation();
  const [events, setEvents] = useState([]);
  const [todaysEvents, setTodaysEvents] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  moment.locale("ko", {
    week: {
      dow: 1,
      doy: 1,
    },
  });
  const localizer = momentLocalizer(moment);

  const onShowMore = (events, date) => {
    setTodaysEvents(events);
    console.log(todaysEvents);
    setIsOpen(true);
  };

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
        setSpinner(true);
        let response = await getSchedule({
          course: location.state.course,
          enrollDate: formatDate(location.state.enrollDate),
          hoursWillingToCommit: location.state.hoursWillingToCommit,
        });

        setEvents(response.schedule);
        setSpinner(false);
      } catch (error) {
        console.log(error);
        setSpinner(false);
      }
    };
    getCalendarSchedule();
  }, [
    location.state.course,
    location.state.enrollDate,
    location.state.hoursWillingToCommit,
  ]);

  return (
    <div className="calendarContainer bg-bgLight  flex items-center justify-center min-h-screen ">
      {spinner ? (
        <BarLoader color="white" />
      ) : (
        <div className="w-10/12  mb-5">
          <div className="text-center text-white md:text-2xl md:font-medium mt-2 mb-2">
            Course Schedule
          </div>
          <Calendar
            localizer={localizer}
            defaultDate={new Date()}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 657 }}
            defaultView={"month"}
            views={["month"]}
            events={events}
            popup
          />
        </div>
      )}
    </div>
  );
}

export default CalendarPage;
