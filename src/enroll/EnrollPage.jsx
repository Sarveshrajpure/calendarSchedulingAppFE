import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateSchedule } from "../actions/calendarActions";
import BarLoader from "react-spinners/BarLoader";

function EnrollPage() {
  const navigate = useNavigate();
  const [hoursSelected, setHoursSelected] = useState("");
  const [course, setCourse] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [error, setError] = useState("");
  const handleChange = (value) => {
    setHoursSelected(value);
  };

  const handleChangeCourse = (value) => {
    setCourse(value);
  };

  const enroll = async () => {
    try {
      setError("");
      if (hoursSelected === null && course === null) {
        setError("Please select course and hours");
      } else {
        let dataToBeSent = {
          course: course,
          enrollDate: new Date(),
          hoursWillingToCommit: hoursSelected,
        };
        setSpinner(true);
        // eslint-disable-next-line no-unused-vars
        let response = await generateSchedule(dataToBeSent);
        setSpinner(false);
        navigate("/calendar", {
          state: {
            enrollDate: dataToBeSent.enrollDate,
            hoursWillingToCommit: dataToBeSent.hoursWillingToCommit,
            course: course,
          },
        });
      }
    } catch (error) {
      setSpinner(false);
      setError("Something went wrong");
      console.log(error);
    }
  };
  return (
    <div className="enrollContainer flex items-center justify-center h-screen">
      <div className="enrollForm  h-1/2 bg-white rounded-md  w-9/12 md:w-1/3  ">
        <div className="enrollFormTitle text-center text-2xl font-medium md:text-4xl  m-5 text-bgDark ">
          Welcome <p className="text-lg font-normal ">Lets start learning</p>
        </div>
        <div className="formSelect flex flex-col md:flex-row md:justify-evenly mt-14 p-4 md:p-0">
          <select
            className="md:p-1 mb-5 md:mb-0 border-2 border-bgDark rounded-md cursor-pointer"
            onInput={(e) => {
              handleChangeCourse(e.target.value);
            }}
          >
            <option defaultChecked value={null}>
              Select a course
            </option>
            <option value="java">Java</option>
          </select>
          <select
            className="md:p-1 border-2 border-bgDark rounded-md cursor-pointer"
            onInput={(e) => {
              handleChange(e.target.value);
            }}
          >
            <option defaultChecked value={null}>
              Select hours
            </option>
            <option value="2">2 hours per day</option>
            <option value="4">4 hours per day</option>
            <option value="6">6 hours per day</option>
          </select>
        </div>
        <div className="enrollBtnWrapper flex items-center justify-center">
          {spinner ? (
            <div className="pt-10">
              <BarLoader />
            </div>
          ) : (
            <div
              className="enrollBtn bg-bgDark px-3 py-1  rounded-md text-white mt-10
           hover:bg-bgLight cursor-pointer transition-colors duration-300 "
              onClick={() => {
                enroll();
              }}
            >
              Enroll
            </div>
          )}
        </div>
        <div className="errorWrapper flex justify-center items-center mt-5">
          <p className="text-bgRed">{error ? error : ""}</p>
        </div>
      </div>
    </div>
  );
}

export default EnrollPage;
