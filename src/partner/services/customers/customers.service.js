import React from "react";

export const ProfileTransform = (response) => {
  const Notes = response.data.notes;
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
  appointmentsWithDates.sort((a, b) => b.date - a.date);
  return { appointmentsWithDates, Notes };
};
