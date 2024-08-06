// src/components/EditContractModal.js
import React, {useEffect, useState} from 'react';
import {Modal} from 'react-bootstrap';
import {NumericFormat} from 'react-number-format';
import InputComponents from "../../../components/InputComponents";
import ButtonComponents from "../../../components/ButtonComponents";

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
        const updatedContract = {
            ...formData,
            id: contract.id
        };
        console.log('Hợp đồng đã cập nhật:', updatedContract);
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
                    <InputComponents
                        type="text"
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={handleChange}
                        placeholder=""
                        disabled
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
                                salary: parseFloat(value)
                            });
                        }}
                        isNumericString
                    />
                </div>
                <div className="form-group">
                    <label>Ngày bắt đầu</label>
                    <InputComponents
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        placeholder=""
                    />
                </div>
                <div className="form-group">
                    <label>Ngày kết thúc</label>
                    <InputComponents
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        placeholder=""
                    />
                </div>
                <div className="form-group">
                    <label>Trạng thái</label>
                    <select
                        name="status"
                        value={formData.status.toString()}
                        onChange={handleChange}
                        className="form-control"
                    >
                        <option value={true}>Active</option>
                        <option value={false}>Inactive</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Hồ sơ hợp đồng</label>
                    <InputComponents
                        type="file"
                        name="files"
                        onChange={handleChange}
                        className="form-control"
                        multiple
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
                <ButtonComponents variant="secondary" onClick={handleClose}>
                    Đóng
                </ButtonComponents>
                <ButtonComponents variant="primary" onClick={handleSave}>
                    Lưu thay đổi
                </ButtonComponents>
            </Modal.Footer>
        </Modal>
    );
};

export default ContractEditComponents;