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
        // Call onSearch with search term to filter contracts
        const filteredContracts = contracts.filter(contract =>
            contract.employeeId.includes(searchTerm) ||
            contract.contractType.includes(searchTerm) ||
            contract.salary.toString().includes(searchTerm) ||
            contract.startDate.includes(searchTerm) ||
            contract.endDate.includes(searchTerm) ||
            contract.status.includes(searchTerm)
        );
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

