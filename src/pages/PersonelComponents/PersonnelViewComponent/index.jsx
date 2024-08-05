import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const PersonnelViewComponents = ({ show, handleClose, personnel }) => {
    if (!personnel) return null;

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Chi tiết nhân viên</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group">
                    <label>Mã nhân viên</label>
                    <input
                        type="text"
                        className="form-control"
                        value={personnel.employeeId}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label>Tên nhân viên</label>
                    <input
                        type="text"
                        className="form-control"
                        value={personnel.employeeName}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label>Giới tính</label>
                    <input
                        type="text"
                        className="form-control"
                        value={personnel.gender}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label>Ngày sinh</label>
                    <input
                        type="date"
                        className="form-control"
                        value={personnel.date}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label>Chức vụ</label>
                    <input
                        type="text"
                        className="form-control"
                        value={personnel.position}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label>Hình ảnh</label>
                    {personnel.image && Array.isArray(personnel.image) && personnel.image.length > 0 ? (
                        <ul className="list-group mt-2">
                            {personnel.image.map((image, index) => (
                                <li key={index} className="list-group-item">
                                    <a href={image.url} download={image.name}>
                                        {image.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Chưa có hình ảnh</p>
                    )}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PersonnelViewComponents;
