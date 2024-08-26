// src/components/EditQualificationModal.js
import React, {useEffect, useState} from 'react';
import {Button, Modal} from 'react-bootstrap';

const QualificationEditComponents = ({show, handleClose, qualification, onSave}) => {
    const [formData, setFormData] = useState({
        qualificationName : '',
        employeeName: '',
        image: '',
        status: true,
        duration: '',
        id: '',
    });

    useEffect(() => {
        if (qualification) {
            setFormData({
                qualificationName: qualification.qualificationName || '',
                employeeName: qualification.employeeName || '',
                image: qualification.image || '',
                status: qualification.status || false,
                duration: qualification.duration || '',
                id : qualification.id || '',
            });
        }
    }, [qualification]);

    const handleChange = (e) => {
        const {name, value, files, type} = e.target;
        if (type === 'file') {
            setFormData({
                ...formData,
                [name]: Array.from(files)
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
        const updatedPosition = {
            ...formData,
            id: qualification.ID
        };
        console.log('Hợp đồng đã cập nhật:', updatedPosition); // Kiểm tra dữ liệu đã cập nhật
        onSave(updatedPosition);
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
                    <label>Tên Chức Vụ</label>
                    <select
                      name="qualificationName"
                      value={formData.qualificationName}
                      onChange={handleChange}
                      className="form-control"
                    >
                        <option value="Nguyen Van A">Nguyen Van A</option>
                        <option value="Le Van B">Le Van B</option>
                        <option value="Tran Van C">Tran Van C</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Thời hạn</label>
                    <input
                      type="date"
                      name="duration"
                      className="form-control"
                      value={formData.duration}
                      onChange={handleChange}
                      disabled
                    />
                </div>
                <div className="form-group">
                    <label>Trạng thái</label>
                    <select
                      name="status"
                      value={formData.status.toString()} // Chuyển boolean thành chuỗi cho select
                      onChange={handleChange}
                      className="form-control"
                    >
                        <option value={true}>Active</option>
                        <option value={false}>Inactive</option>
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
