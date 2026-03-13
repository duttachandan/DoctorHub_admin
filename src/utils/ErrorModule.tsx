import type { ModalObj } from "../@type/featureInterface";

const ErrorModule = ({ showModal, setShowModal, message }: ModalObj) => {
  return (
    <>
      <div
        className={`modal fade modal-background
          ${showModal ? "show d-flex justify-content-center align-items-center" : ""} 
        `}
        id="staticBackdrop"
        data-bs-backdrop="static"
        tabIndex={-1}
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5 text-capitalize text-danger"
                id="staticBackdropLabel"
              >
                {message}
              </h1>
            </div>
            {/* <div className="modal-body">{message}</div> */}
            <div className="modal-footer d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setShowModal(false)}
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorModule;
