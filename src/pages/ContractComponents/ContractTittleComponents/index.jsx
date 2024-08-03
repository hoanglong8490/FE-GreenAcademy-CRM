import React from 'react';
import '../Contract.scss';
import {CSVLink} from "react-csv";
import SearchComponents from "../../../components/SearchComponents";

const ContractTitleComponents = ({contracts, onSearch}) => {
    const handleSearch = (searchTerm) => {
        const searchValue = searchTerm.toLowerCase();

        const filteredContracts = contracts.filter(contract => {
            const employeeId = contract.employeeId ? contract.employeeId.toLowerCase() : '';
            const contractType = contract.contractType ? contract.contractType.toLowerCase() : '';
            const salary = contract.salary ? contract.salary.toString().toLowerCase() : '';
            const startDate = contract.startDate ? contract.startDate.toLowerCase() : '';
            const endDate = contract.endDate ? contract.endDate.toLowerCase() : '';
            const status = contract.status ? (contract.status ? 'active' : 'inactive') : '';

            return (
                employeeId.includes(searchValue) ||
                contractType.includes(searchValue) ||
                salary.includes(searchValue) ||
                startDate.includes(searchValue) ||
                endDate.includes(searchValue) ||
                status.includes(searchValue)
            );
        });

        onSearch(filteredContracts);
    };

    const handleImportClick = () => {
        document.getElementById('import').click();
    };

    return (
        <div className="row contract-tittle d-flex justify-content-between align-items-center">
            <div className="col-sm-6">
                <h2>DANH SÁCH HỢP ĐỒNG</h2>
            </div>
            <div className="action-button col-sm-6 d-flex justify-content-end align-items-center">
                <SearchComponents onSearch={handleSearch}/>
                <button
                    className='btn btn-danger d-flex align-items-center'
                    onClick={handleImportClick}
                >
                    <i className="fa fa-upload"></i>&nbsp;Import
                </button>
                <input id='import' type='file' hidden/>

                <CSVLink
                    data={contracts}
                    filename={"List-Contract.csv"}
                    className="btn btn-primary d-flex"
                >
                    <i className="fa fa-download"></i>&nbsp;Export
                </CSVLink>
            </div>
        </div>
    );
};

export default ContractTitleComponents;