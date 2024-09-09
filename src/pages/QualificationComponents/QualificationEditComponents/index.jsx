// src/components/EditQualificationModal.js
import React, {useEffect, useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {fetchEmployees} from "../QualificationService/qualificationService";

const QualificationEditComponents = ({show, handleClose, qualification, onSave}) => {

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetchEmployees().then((data) => {
            setEmployees(data);
        })
    }, []);

    const [formData, setFormData] = useState({
        qualificationName : '',
        employeeName: '',
        image: '',
        status: 1,
        expiryDate: '',
        id: '',
    });

    useEffect(() => {
        if (qualification) {
            const formattedExpiryDate = qualification.expiryDate ? new Date(qualification.expiryDate).toISOString().split('T')[0] : '';
            setFormData({
                qualificationName: qualification.qualificationName || '',
                employeeName: qualification.employeeName || '',
                image: qualification.image || '',
                status: qualification.status || 0,
                expiryDate: formattedExpiryDate || '',
                id : qualification.id || '',
            });
        }
    }, [qualification]);

    const handleChange = (e) => {
        const {name, value, files, type} = e.target;
        if (type === 'file') {
            setFormData({
                ...formData,
                image: files[0]
            });
        } else if (name === 'status') {
            setFormData({
                ...formData,
                [name]: value === 'true'
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSave = () => {
        const updatedQualification = {
            ...formData,
            id: qualification.id
        };
        console.log('Bằng cấp đã cập nhật:', updatedQualification); // Kiểm tra dữ liệu đã cập nhật
        onSave(updatedQualification);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Chỉnh sửa Bằng Cấp</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group">
                    <label>ID bằng cấp</label>
                    <input
                      type="text"
                      className="form-control"
                      name="id"
                      value={formData.id}
                      onChange={handleChange}
                      disabled
                    />
                </div>
                <div className="form-group">
                    <label>Tên Nhân Viên</label>
                    <select
                      name="employeeId"
                      value={formData.employeeName}
                      onChange={handleChange}
                      className="form-control"
                    >

                        {
                            employees.map((employee) => (
                                <option key={employee.id} value={employee.id}>
                                    {employee.employeeName}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div className="form-group">
                    <label>Thời hạn</label>
                    <input
                      type="date"
                      name="expiryDate"
                      className="form-control"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      disabled
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
                        <option value={1}>Active</option>
                        <option value={0}>Inactive</option>
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


export default QualificationEditComponents;
