// src/components/EditContractModal.js
import React, {useEffect, useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {NumericFormat} from 'react-number-format';

const ContractEditComponents = ({show, handleClose, contract, onSave}) => {
    const [formData, setFormData] = useState({
        employeeId: '',
        contractType: '',
        salary: '',
        startDate: '',
        endDate: '',
        status: true,
        files: []
    });

    useEffect(() => {
        if (contract) {
            setFormData({
                employeeId: contract.employeeId || '',
                contractType: contract.contractType || '',
                salary: contract.salary || '',
                startDate: contract.startDate || '',
                endDate: contract.endDate || '',
                status: contract.status || false,
                files: contract.files || []
            });
        }
    }, [contract]);

    const handleChange = (e) => {
        const {name, value, files, type, checked} = e.target;
        if (type === 'file') {
            setFormData({
                ...formData,
                [name]: Array.from(files)
            });
        } else if (name === 'status') {
            // Chuyển đổi giá trị chuỗi thành boolean
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
        const updatedContract = {
            ...formData,
            id: contract.id
        };
        console.log('Hợp đồng đã cập nhật:', updatedContract); // Kiểm tra dữ liệu đã cập nhật
        onSave(updatedContract);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Chỉnh sửa hợp đồng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group">
                    <label>Mã nhân viên</label>
                    <input
                        type="text"
                        className="form-control"
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Loại hợp đồng</label>
                    <select
                        name="contractType"
                        value={formData.contractType}
                        onChange={handleChange}
                        className="form-control"
                    >
                        <option value="Hợp đồng thử việc">Hợp đồng thử việc</option>
                        <option value="Hợp đồng part-time">Hợp đồng part-time</option>
                        <option value="Hợp đồng chính thức">Hợp đồng chính thức</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Mức lương</label>
                    <NumericFormat
                        className="form-control"
                        name="salary"
                        value={formData.salary}
                        thousandSeparator="."
                        decimalSeparator=","
                        onValueChange={(values) => {
                            const {value} = values;
                            setFormData({
                                ...formData,
                                salary: parseFloat(value) // Chuyển đổi thành số nếu cần
                            });
                        }}
                        isNumericString
                    />
                </div>
                <div className="form-group">
                    <label>Ngày bắt đầu</label>
                    <input
                        type="date"
                        name="startDate"
                        className="form-control"
                        value={formData.startDate}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Ngày kết thúc</label>
                    <input
                        type="date"
                        name="endDate"
                        className="form-control"
                        value={formData.endDate}
                        onChange={handleChange}
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
                    <label>Hồ sơ hợp đồng</label>
                    <input
                        type="file"
                        name="files"
                        multiple
                        onChange={handleChange}
                        className="form-control"
                        accept=".doc,.docx,.xls,.xlsx,.pdf"
                    />
                    {formData.files.length > 0 && (
                        <ul className="list-group mt-2">
                            {formData.files.map((file, index) => (
                                <li key={index} className="list-group-item">
                                    {file.name}
                                </li>
                            ))}
                        </ul>
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


export default ContractEditComponents;
