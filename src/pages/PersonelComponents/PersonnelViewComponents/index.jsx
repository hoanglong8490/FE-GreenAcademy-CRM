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
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Mã nhân viên</label>
                            <input
                                type="text"
                                className="form-control"
                                value={personnel.employeeID}
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
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="text"
                                className="form-control"
                                value={personnel.email}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label>Số điện thoại</label>
                            <input
                                type="text"
                                className="form-control"
                                value={personnel.phoneNumber}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label>Bằng cấp</label>
                            <input
                                type="text"
                                className="form-control"
                                value={personnel.qualificationName}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label>CCCD</label>
                            <input
                                type="text"
                                className="form-control"
                                value={personnel.CCCD}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label>Trạng thái</label>
                            <input
                                type="text"
                                className="form-control"
                                value={personnel.status}
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
                    </div>
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
