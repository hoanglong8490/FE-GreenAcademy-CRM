import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import NotificationComponent from "../NotificationComponent";

function ModalComponent({ children, modalTitle, show, setShowAddModal }) {
  const handleClose = () => {
    setShowAddModal(false);
  };

  const handleSuccess = () => {
    setShowAddModal(false);
    toast.success("Add Successfully");
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
      <NotificationComponent />
    </>
  );
}

export default ModalComponent;
