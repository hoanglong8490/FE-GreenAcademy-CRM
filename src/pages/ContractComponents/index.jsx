// src/components/ContractComponents.js
import React, {useEffect, useState} from 'react';
import TableComponents from "../../components/TableComponents";
import TableBodyComponents from "../../components/TableBodyComponents";
import ContractTitleComponents from "./ContractTittleComponents";
import {NumericFormat} from 'react-number-format';
import ContractForm from "./ContractFormComponents/index.";
import axios from "axios";
import ContractViewComponents from "./ContractViewComponents";
import ContractEditComponents from "./ContractEditComponents";
// axios.get('../../../data/contract/list-contract.json')
const ContractComponents = () => {
    const [contracts, setContracts] = useState([]);
    const [filteredContracts, setFilteredContracts] = useState([]);
    const [viewModalShow, setViewModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [selectedContract, setSelectedContract] = useState(null);

    useEffect(() => {
        axios.get('../../../data/contract/list-contract.json')  // API get all contract
            .then(response => {
                setContracts(response.data);
                setFilteredContracts(response.data);
            })
            .catch(error => {
                console.error('Có lỗi xảy ra khi lấy dữ liệu!', error);
            });
    }, []);

    const handleSearch = (filtered) => {
        setFilteredContracts(filtered);
    };

    const handleAddContract = (newContract) => {
        axios.post('/api/contracts', newContract)  // Sửa đường dẫn API
            .then(() => {
                setContracts([...contracts, newContract]);
                setFilteredContracts([...contracts, newContract]);
            })
            .catch(error => {
                console.error('Có lỗi xảy ra khi thêm hợp đồng!', error);
            });
    };

    const handleView = (contract) => {
        setSelectedContract(contract);
        setViewModalShow(true);
    };

    const handleEdit = (contract) => {
        setSelectedContract(contract);
        setEditModalShow(true);
    };

    const handleSaveEdit = (updatedContract) => {
        axios.put(`/api/contracts/${updatedContract.id}`, updatedContract)  // Sửa đường dẫn API
            .then(() => {
                setContracts(contracts.map(contract =>
                    contract.id === updatedContract.id ? updatedContract : contract
                ));
                setFilteredContracts(filteredContracts.map(contract =>
                    contract.id === updatedContract.id ? updatedContract : contract
                ));
            })
            .catch(error => {
                console.error('Có lỗi xảy ra khi cập nhật hợp đồng!', error);
            });
    };

    const handleDelete = (contractId) => {
        axios.delete(`/api/contracts/${contractId}`)  // Sửa đường dẫn API
            .then(() => {
                const updatedContracts = contracts.map(contract =>
                    contract.id === contractId ? {...contract, status: false} : contract
                );
                setContracts(updatedContracts);
                setFilteredContracts(updatedContracts);
            })
            .catch(error => {
                console.error('Có lỗi xảy ra khi xóa hợp đồng!', error);
            });
    };

    const rows = filteredContracts.map(contract => ({
        data: [
            contract.id,
            contract.employeeId,
            contract.contractType,
            <NumericFormat
                value={contract.salary}
                displayType={'text'}
                thousandSeparator="."
                decimalSeparator=","
                prefix=""
            />,
            contract.startDate,
            contract.endDate,
            contract.status ? 'Active' : 'Inactive',
            <div>
                {contract.files.map((file, index) => (
                    <div key={index}>{`File ${index + 1}: ${file.split('/').pop()}`}</div>
                ))}
            </div>
        ],
        actions: [
            {
                className: 'btn-info',
                icon: 'fa-eye',
                onClick: () => handleView(contract)
            },
            {
                className: 'btn-warning',
                icon: 'fa-pen',
                onClick: () => handleEdit(contract)
            },
            {
                className: 'btn-danger',
                icon: 'fa-trash',
                onClick: () => handleDelete(contract.id)
            }
        ]
    }));

    return (
        <div className="Contract-list">
            <ContractTitleComponents onSearch={handleSearch} contracts={contracts}/>
            <div className="row contract-content">
                <div className="col-4">
                    <h3>Thêm hợp đồng</h3>
                    <ContractForm onSubmit={handleAddContract}/>
                </div>
                <div className="col-8">
                    <TableComponents headers={[
                        'ID', 'Mã nhân viên', 'Loại hợp đồng', 'Mức lương', 'Ngày bắt đầu', 'Ngày kết thúc', 'Trạng thái', 'Hình ảnh'
                    ]}>
                        <TableBodyComponents
                            rows={rows}
                        />
                    </TableComponents>
                </div>
            </div>
            <ContractViewComponents
                show={viewModalShow}
                handleClose={() => setViewModalShow(false)}
                contract={selectedContract}
            />
            <ContractEditComponents
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                contract={selectedContract}
                onSave={handleSaveEdit}
            />
        </div>
    );
};

export default ContractComponents;
