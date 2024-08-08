import React from 'react';
import { Button, Modal } from 'react-bootstrap';
<<<<<<< HEAD

=======
import InputComponents from "../../../components/InputComponents";
>>>>>>> origin/crm-hr
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
<<<<<<< HEAD
                                value={personnel.employeeID}
=======
                                value={personnel.employeeId}
>>>>>>> origin/crm-hr
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
<<<<<<< HEAD
=======
                            <label>Địa chỉ</label>
                            <input
                                type="address"
                                className="form-control"
                                value={personnel.address}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
>>>>>>> origin/crm-hr
                            <label>Chức vụ</label>
                            <input
                                type="text"
                                className="form-control"
<<<<<<< HEAD
                                value={personnel.position}
=======
                                value={personnel.positionName}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label>Phòng ban</label>
                            <input
                                type="text"
                                className="form-control"
                                value={personnel.departmentName}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label>Hợp đồng</label>
                            <input
                                type="text"
                                className="form-control"
                                value={personnel.contractName}
>>>>>>> origin/crm-hr
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
<<<<<<< HEAD
=======
                            <label>Ngày bắt đầu</label>
                            <InputComponents
                                type="text"
                                name="startDate"
                                value={personnel.startDate}
                                onChange={() => {
                                }}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>Ngày kết thúc</label>
                            <InputComponents
                                type="text"
                                name="endDate"
                                value={personnel.endDate}
                                onChange={() => {
                                }}
                                disabled
                            />
                        </div>
                        <div className="form-group">
>>>>>>> origin/crm-hr
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
<<<<<<< HEAD
                                <ul className="list-group mt-2">
                                    {personnel.image.map((image, index) => (
                                        <li key={index} className="list-group-item">
                                            <a href={image.url} download={image.name}>
                                                {image.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
=======
                                <div className="mt-2">
                                    {personnel.image.map((image, index) => (
                                        <img key={index} src={image.url} alt={image.name} className="img-thumbnail mb-2" style={{ width: '100px', height: '100px' }} />
                                    ))}
                                </div>
>>>>>>> origin/crm-hr
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
