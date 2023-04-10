import axios from "axios";

export const generateSchedule = async (values) => {
  console.log(values);
  let response = await axios.post(
    "/api/scheduleCalendar/generateSchedule",
    values
  );
  return response.data;
};

export const getSchedule = async (values) => {
  console.log(values);
  let response = await axios.get("/api/scheduleCalendar/getSchedule", {
    params: {
      enrollDate: values.enrollDate,
      hoursWillingToCommit: values.hoursWillingToCommit,
    },
  });
  return response.data;
};
