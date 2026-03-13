import React from "react";

export interface ModalObj {
  showModal: boolean;
  setShowModal: typeof React.useState;
  message: string;
}
