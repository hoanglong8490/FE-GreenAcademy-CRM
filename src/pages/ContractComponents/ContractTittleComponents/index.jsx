import React, {useState} from 'react';
import Input from "../../../components/InputComponents";
import Button from "../../../components/ButtonComponents";
import '../Contract.scss';

const ContractTitleComponents = ({contracts, onSearch}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchClick = () => {
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

    return (
        <div className="row">
            <div className="col-sm-6">
                <h2>DANH SÁCH HỢP ĐỒNG</h2>
            </div>
            <div className="col-sm-6 d-flex justify-content-end align-items-center">
                <Input
                    type="text"
                    name="search"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="Tìm kiếm hợp đồng..."
                />
                <Button
                    type="button"
                    className="btn-primary ms-2"
                    onClick={handleSearchClick}
                >
                    Search
                </Button>
            </div>
        </div>
    );
};

export default ContractTitleComponents;
