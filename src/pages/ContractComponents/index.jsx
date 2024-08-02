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
import PagingComponent from "../../components/PagingComponent";
import {format} from 'date-fns';
// axios.get('../../../data/contract/list-contract.json')


const ContractComponents = () => {
    const [contracts, setContracts] = useState([]);
    const [filteredContracts, setFilteredContracts] = useState([]);
    const [viewModalShow, setViewModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [selectedContract, setSelectedContract] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const itemsPerPage = 10; // Hiển thị số mục mỗi trang


    useEffect(() => {
        axios.get('https://66a9b8e2613eced4eba6017a.mockapi.io/api/contracts/Contract')
            .then(response => {
                console.log(response.data);
                setContracts(response.data);
                setFilteredContracts(response.data);
                setTotalPage(Math.ceil(response.data.length / itemsPerPage)); // Cập nhật tổng số trang
            })
            .catch(error => {
                console.error('Có lỗi xảy ra khi lấy dữ liệu!', error);
            });
    }, []);

    const handleSearch = (filtered) => {
        setFilteredContracts(filtered);
        setTotalPage(Math.ceil(filtered.length / itemsPerPage)); // Cập nhật tổng số trang khi tìm kiếm
        setCurrentPage(1); // Đặt lại về trang đầu tiên khi tìm kiếm
    };

    const handleAddContract = (newContract) => {
        console.log('New contract:', newContract); // Xem thông tin hợp đồng mới
        axios.post('https://66a9b8e2613eced4eba6017a.mockapi.io/api/contracts/Contract', newContract)
            .then(response => {
                const updatedContracts = [...contracts, response.data];
                setContracts(updatedContracts);
                setFilteredContracts(updatedContracts);
                setTotalPage(Math.ceil(updatedContracts.length / itemsPerPage)); // Cập nhật tổng số trang
                setCurrentPage(Math.ceil(updatedContracts.length / itemsPerPage)); // Di chuyển đến trang cuối cùng
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
        console.log('Contract files:', contract.files);
        console.log('Selected contract for edit:', contract); // Xem thông tin hợp đồng
        setSelectedContract(contract);
        setEditModalShow(true);
    };

    const handleSaveEdit = (updatedContract) => {
        console.log('Updating contract with ID:', updatedContract.id);// Kiểm tra giá trị ID
        console.log('Updated contract:', updatedContract); // Xem thông tin hợp đồng sau khi cập nhật
        axios.put(`https://66a9b8e2613eced4eba6017a.mockapi.io/api/contracts/Contract/${updatedContract.id}`, updatedContract)
            .then(response => {
                // Cập nhật hợp đồng trong danh sách
                const updatedContracts = contracts.map(contract =>
                    contract.id === updatedContract.id ? response.data : contract
                );
                setContracts(updatedContracts);
                setFilteredContracts(updatedContracts);
                setTotalPage(Math.ceil(updatedContracts.length / itemsPerPage)); // Cập nhật tổng số trang
                setEditModalShow(false); // Đóng modal chỉnh sửa
            })
            .catch(error => {
                console.error('Có lỗi xảy ra khi cập nhật hợp đồng!', error);
            });
    };

    const handleDelete = (contractId) => {
        axios.delete(`https://66a9b8e2613eced4eba6017a.mockapi.io/api/contracts/Contract/${contractId}`)
            .then(() => {
                const updatedContracts = contracts.filter(contract => contract.id !== contractId);
                setContracts(updatedContracts);
                setFilteredContracts(updatedContracts);
                setTotalPage(Math.ceil(updatedContracts.length / itemsPerPage)); // Cập nhật tổng số trang
            })
            .catch(error => {
                console.error('Có lỗi xảy ra khi xóa hợp đồng!', error);
            });
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // kiểm tra dịnh dạng ngày

    const formatDate = (dateString) => {
        return dateString ? format(new Date(dateString), 'dd/MM/yyyy') : '';
    };

    const rows = filteredContracts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(contract => ({
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
            formatDate(contract.startDate), // Định dạng ngày bắt đầu
            formatDate(contract.endDate),   // Định dạng ngày kết thúc
            contract.status ? 'Active' : 'Inactive',
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
                        'ID', 'Mã nhân viên', 'Loại hợp đồng', 'Mức lương', 'Ngày bắt đầu', 'Ngày kết thúc', 'Trạng thái'
                    ]}>
                        <TableBodyComponents rows={rows}/>
                    </TableComponents>
                    <PagingComponent
                        totalPage={totalPage}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
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