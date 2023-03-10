import React from "react";

export const ProfileTransform = (response) => {
  const appointmentsWithDates = response.data.appointments.map(
    (appointment) => {
      const date = new Date(appointment.date._seconds * 1000);
      return {
        ...appointment,
        date,
      };
    }
  );
  //sort to the farthest datetimestamp
  return appointmentsWithDates.sort((a, b) => b.date - a.date);
};
