import React from "react";

export interface ModalObj {
  showModal: boolean;
  setShowModal: typeof React.useState;
  message: string;
}

export interface CreateDoctorType {
  name: string;
  specialization: string;
  fees: number;
  avilableSlots: {
    date:
      | "Sunday"
      | "Monday"
      | "Tuesday"
      | "Wednesday"
      | "Thursday"
      | "Friday"
      | "Saturday";
    time: string;
  }[];
}
