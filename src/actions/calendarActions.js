import { axiosInstance } from ".././utilities/axiosInstance";

export const generateSchedule = async (values) => {

  let response = await axiosInstance.post(
    "/scheduleCalendar/generateSchedule",
    values
  );
  return response.data;
};

export const getSchedule = async (values) => {
  
  let response = await axiosInstance.get("/scheduleCalendar/getSchedule", {
    params: {
      enrollDate: values.enrollDate,
      hoursWillingToCommit: values.hoursWillingToCommit,
    },
  });
  return response.data;
};
