// src/components/ViewContractModal.js
import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import {NumericFormat} from 'react-number-format';

const ContractViewComponents = ({show, handleClose, contract}) => {
    if (!contract) return null;

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Chi tiết hợp đồng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group">
                    <label>Mã nhân viên</label>
                    <input
                        type="text"
                        className="form-control"
                        value={contract.employeeId}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Loại hợp đồng</label>
                    <input
                        type="text"
                        className="form-control"
                        value={contract.contractType}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Mức lương</label>
                    <NumericFormat
                        value={contract.salary}
                        displayType={'text'}
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix=""
                        className="form-control"
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Ngày bắt đầu</label>
                    <input
                        type="text"
                        className="form-control"
                        value={contract.startDate}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Ngày kết thúc</label>
                    <input
                        type="text"
                        className="form-control"
                        value={contract.endDate}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Hồ sơ hợp đồng</label>
                    {contract.files && contract.files.length > 0 ? (
                        <ul className="list-group mt-2">
                            {contract.files.map((file, index) => (
                                <li key={index} className="list-group-item">
                                    <a href={file.url} download={file.name}>
                                        {file.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Chưa có hồ sơ hợp đồng</p>
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

export default ContractViewComponents;
