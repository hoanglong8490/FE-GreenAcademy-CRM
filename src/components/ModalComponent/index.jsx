import React from 'react';
import {Modal} from 'react-bootstrap';

function ModalComponent({children, onHide, show, onSave, action}) {

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    {action !== "EDIT" ? "Thêm mới" : "Cập nhật"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalComponent;
