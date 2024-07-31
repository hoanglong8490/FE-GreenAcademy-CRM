// src/components/ContractComponents.js
import React, {useState} from 'react';
import TableComponents from "../../components/TableComponents";
import TableBodyComponents from "../../components/TableBodyComponents";
import ContractForm from "./ContractFormComponents/index.";
import ContractTitleComponents from "./ContractTittleComponents";
import './Contract.scss';

const ContractComponents = () => {
    const [contracts, setContracts] = useState([
        // Example contract data
        {
            id: 1,
            employeeId: 'B18DCCN008',
            contractType: 'Hợp đồng thử việc',
            salary: '3.000.000',
            startDate: '2021-01-01',
            endDate: '2021-12-31',
            status: 'Đang làm việc'
        },
        // Add more contract data here
    ]);

    const [filteredContracts, setFilteredContracts] = useState(contracts);

    const handleSearch = (filtered) => {
        setFilteredContracts(filtered);
    };

    const handleAddContract = (newContract) => {
        newContract.id = contracts.length + 1;
        setContracts([...contracts, newContract]);
        setFilteredContracts([...contracts, newContract]); // Ensure new contract appears in filtered list
    };

    const actions = [
        {href: '/', className: 'btn-warning', icon: 'fa-eye'},
        {href: '/', className: 'btn-primary', icon: 'fa-pen'},
        {href: '/', className: 'btn-danger', icon: 'fa-trash'}
    ];

    const rows = filteredContracts.map(contract => ({
        data: [
            contract.id.toString(),
            contract.employeeId,
            contract.contractType,
            contract.salary,
            contract.startDate,
            contract.endDate,
            contract.status
        ],
        actions: actions
    }));

    return (
        <div className="Contract-list">
            <ContractTitleComponents
                contracts={contracts}
                onSearch={handleSearch}
            />
            <div className="row contract-content">
                <div className="col-4">
                    <h3>Thêm hợp đồng</h3>
                    <ContractForm onSubmit={handleAddContract}/>
                </div>
                <div className="col-8">
                    <TableComponents headers={[
                        'ID', 'Mã nhân viên', 'Loại hợp đồng', 'Mức lương', 'Ngày bắt đầu', 'Ngày kết thúc', 'Status', 'Action'
                    ]}>
                        <TableBodyComponents rows={rows}/>
                    </TableComponents>
                </div>
            </div>
        </div>
    );
};

export default ContractComponents;
