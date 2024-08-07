// src/components/ViewContractModal.js
import React from 'react';
import {Modal} from 'react-bootstrap';
import {NumericFormat} from 'react-number-format';
import InputComponents from "../../../components/InputComponents";
import ButtonComponents from "../../../components/ButtonComponents";


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
                    <InputComponents
                        type="text"
                        name="employeeId"
                        value={contract.employeeId}
                        onChange={() => {
                        }}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Loại hợp đồng</label>
                    <InputComponents
                        type="text"
                        name="contractType"
                        value={contract.contractType}
                        onChange={() => {
                        }}
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
                    <InputComponents
                        type="text"
                        name="startDate"
                        value={contract.startDate}
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
                        value={contract.endDate}
                        onChange={() => {
                        }}
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
                <ButtonComponents variant="secondary" onClick={handleClose}>
                    Đóng
                </ButtonComponents>
            </Modal.Footer>
        </Modal>
    );
};

export default ContractViewComponents;