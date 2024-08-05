import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';  // Sử dụng React-Bootstrap

const PersonnelEditComponent = ({ show, handleClose, personnel, onSave }) => {

    const [formData, setFormData] = useState({
        employeeId: '',
        employeeName: '',
        position: '',
        date: '',
        gender: '',
        email: '',
        phoneNumber: '',
        CCCD: '',
        status: true,
        image: [],
    });

    useEffect(() => {
        if (personnel) {
            setFormData({
                employeeId: personnel.employeeId || '',
                employeeName: personnel.employeeName || '',
                position: personnel.position || '',
                date: personnel.date || '',
                gender: personnel.gender || '',
                email: personnel.email || '',
                phoneNumber: personnel.phoneNumber || '',
                CCCD: personnel.CCCD || '',
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
                <div className="form-group">
                    <label>Tên nhân viên</label>
                    <input
                        type="text"
                        className="form-control"
                        name="employeeName"
                        value={formData.employeeName}
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
