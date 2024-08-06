import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';  // Sử dụng React-Bootstrap

const PersonnelEditComponent = ({ show, handleClose, personnel, onSave }) => {

    const [formData, setFormData] = useState({
        id: '',
        employeeId: '',
        employeeName: '',
        position: '',
        date: '',
        gender: '',
        email: '',
        phoneNumber: '',
        CCCD: '',
        qualificationName: '',
        status: true,
        image: [],
    });

    useEffect(() => {
        if (personnel) {
            setFormData({
                id: personnel.id || '',
                employeeId: personnel.employeeId || '',
                employeeName: personnel.employeeName || '',
                position: personnel.position || '',
                date: personnel.date || '',
                gender: personnel.gender || '',
                email: personnel.email || '',
                phoneNumber: personnel.phoneNumber || '',
                CCCD: personnel.CCCD || '',
                qualificationName: personnel.qualificationName || '',
                status: personnel.status || false,
                image: personnel.image || []
            });
        }
    }, [personnel]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData({
                ...formData,
                [name]: Array.from(files)
            });
        } else if (name === "status") {
            setFormData({
                ...formData,
                [name]: value === "true" // Chuyển đổi chuỗi thành boolean
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSave = () => {
        onSave(formData);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Chỉnh sửa thông tin nhân viên</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Mã nhân viên</label>
                            <input
                                type="text"
                                className="form-control"
                                name="employeeID"
                                value={formData.employeeId}
                                onChange={handleChange}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>Tên nhân viên</label>
                            <input
                                type="text"
                                className="form-control"
                                name="employeeName"
                                value={formData.employeeName}
                                onChange={handleChange}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>Giới tính</label>
                            <input
                                type="text"
                                className="form-control"
                                name="employeeName"
                                value={formData.gender}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Ngày sinh</label>
                            <input
                                type="date"
                                className="form-control"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Chức vụ</label>
                            <input
                                type="text"
                                className="form-control"
                                name="position"
                                value={formData.position}
                                onChange={handleChange}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="text"
                                className="form-control"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Số điện thoại</label>
                            <input
                                type="text"
                                className="form-control"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>CCCD</label>
                            <input
                                type="text"
                                name="CCCD"
                                className="form-control"
                                value={formData.CCCD}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Bằng cấp</label>
                            <input
                                type="text"
                                className="form-control"
                                name="qualificationName"
                                value={formData.qualificationName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Trạng thái</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="form-control"
                            >
                                <option value={true}>Hoạt động</option>
                                <option value={false}>Không hoạt động</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Image</label>
                            <input
                                type="file"
                                className="form-control"
                                name="image"
                                onChange={handleChange}
                                multiple
                            />
                            {Array.isArray(formData.image) && formData.image.length > 0 && (
                                <div>
                                    {formData.image.map((file, index) => (
                                        <div key={index}>{file.name}</div>
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Lưu thay đổi
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PersonnelEditComponent;
