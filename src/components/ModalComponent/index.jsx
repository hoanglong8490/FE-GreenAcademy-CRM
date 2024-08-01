import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import NotificationComponent from "../NotificationComponent";
import { typeNotification } from "../../constants";

function ModalComponent({ children, modalTitle, show, setShowAddModal }) {
  const [showAlert, setShowAlert] = useState(false);

  const handleClose = () => {
    setShowAddModal(false);
  };

  const handleSuccess = () => {
    setShowAlert(true);
    setShowAddModal(false);
    setTimeout(() => {
      setShowAlert(false);
    }, 1000);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {modalTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSuccess}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {showAlert && (
        <NotificationComponent variant={typeNotification.success}>
          Success Alert
        </NotificationComponent>
      )}
    </>
  );
}

export default ModalComponent;
