import React, {useState} from 'react';
import '../Contract.scss';
import {CSVLink} from "react-csv";
import SearchComponents from "../../../components/SearchComponents";
import ButtonComponents from "../../../components/ButtonComponents";

const ContractTitleComponents = ({contracts, onSearch}) => {
    const [dataExport, setDataExport] = useState([]);
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
    const getContractExport = (even, done) => {
        let result = [];
        if (contracts && contracts.length > 0) {
            result.push(["ID", "Mã nhân viên", "Loại hợp đồng", "Mức lương", "Ngày bắt đầu", "Ngày kết thúc", "Trạng thái"]);
            contracts.map((item, index) => {
                let arr = [];
                arr[0] = item.id;
                arr[1] = item.employeeId;
                arr[2] = item.contractType;
                arr[3] = item.salary;
                arr[4] = item.startDate;
                arr[5] = item.endDate;
                arr[6] = item.status;
                result.push(arr);
            });
            setDataExport(result);
            done();
        }
    };


    return (
        <div className="row contract-tittle d-flex justify-content-between align-items-center">
            <div className="col-sm-6">
                <h2>DANH SÁCH HỢP ĐỒNG</h2>
            </div>
            <div className="action-button col-sm-6 d-flex justify-content-end align-items-center">
                <SearchComponents onSearch={handleSearch}/>
                <ButtonComponents
                    className='btn btn-success align-items-center'
                    onClick={handleImportClick}
                >
                    <i className="fas fa-file-excel"></i>
                </ButtonComponents>
                <input id='import' type='file' hidden/>

                <CSVLink
                    data={dataExport}
                    asyncOnClick={true}
                    onClick={getContractExport}
                    filename={"List-Contract.csv"}
                    className="btn btn-danger align-items-center"
                >
                    <i className="fas fa-file-export"></i>
                </CSVLink>
            </div>
        </div>
    );
};

export default ContractTitleComponents;