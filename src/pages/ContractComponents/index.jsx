// src/components/ContractComponents.js
import React, { useEffect, useState } from 'react';
import './Contract.scss';
import TableComponents from "../../components/TableComponents";
import TableBodyComponents from "../../components/TableBodyComponents";
import ContractForm from "./ContractFormComponents/index.";
import axios from "axios";
import ContractViewComponents from "./ContractViewComponents";
import ContractEditComponents from "./ContractEditComponents";
import PagingComponent from "../../components/PagingComponent";
import { format } from 'date-fns';
import ConfirmationComponents from "../../components/ConfirmationComponents";
import { NumericFormat } from 'react-number-format';
import ContractTitleComponents from "./ContractTittleComponents";
import { toast } from 'react-toastify';


const itemsPerPage = 10;

const ContractComponents = () => {
    const [contracts, setContracts] = useState([]);
    const [filteredContracts, setFilteredContracts] = useState([]);
    const [viewModalShow, setViewModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [selectedContract, setSelectedContract] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const headerContract = ['ID', 'Mã nhân viên', 'Loại hợp đồng', 'Mức lương', 'Ngày bắt đầu', 'Ngày kết thúc', 'Trạng thái', 'Action'];

    useEffect(() => {
        fetchContracts();
    }, []);

    const fetchContracts = async () => {
        try {
            const response = await axios.get('https://66a9b8e2613eced4eba6017a.mockapi.io/api/contracts/Contract');
            const sortedContracts = response.data.sort((a, b) => b.status - a.status);
            setContracts(sortedContracts);
            setFilteredContracts(sortedContracts);
            setTotalPage(Math.ceil(sortedContracts.length / itemsPerPage));
            toast.success('Dữ liệu hợp đồng đã được tải thành công!');
        } catch (error) {
            console.error('Có lỗi xảy ra khi lấy dữ liệu!', error);
            toast.error('Có lỗi xảy ra khi lấy dữ liệu hợp đồng!');
        }
    };

    const handleSearch = (filtered) => {
        const sortedFiltered = filtered.sort((a, b) => b.status - a.status);
        setFilteredContracts(sortedFiltered);
        setTotalPage(Math.ceil(sortedFiltered.length / itemsPerPage));
        setCurrentPage(1);
    };

    const handleAddContract = async (newContract) => {
        try {
            const response = await axios.post('https://66a9b8e2613eced4eba6017a.mockapi.io/api/contracts/Contract', newContract);
            const updatedContracts = [...contracts, response.data].sort((a, b) => b.status - a.status);
            setContracts(updatedContracts);
            setFilteredContracts(updatedContracts);
            setTotalPage(Math.ceil(updatedContracts.length / itemsPerPage));
            setCurrentPage(Math.ceil(updatedContracts.length / itemsPerPage));
            toast.success('Thêm hợp đồng thành công!');
        } catch (error) {
            console.error('Có lỗi xảy ra khi thêm hợp đồng!', error);
            toast.error('Có lỗi xảy ra khi thêm hợp đồng!');
        }
    };

    const handleSaveEdit = async (updatedContract) => {
        try {
            const response = await axios.put(`https://66a9b8e2613eced4eba6017a.mockapi.io/api/contracts/Contract/${updatedContract.id}`, updatedContract);
            const updatedContracts = contracts.map(contract =>
                contract.id === updatedContract.id ? response.data : contract
            ).sort((a, b) => b.status - a.status);
            setContracts(updatedContracts);
            setFilteredContracts(updatedContracts);
            setTotalPage(Math.ceil(updatedContracts.length / itemsPerPage));
            setEditModalShow(false);
            toast.success('Cập nhật thành công hợp đồng!');
        } catch (error) {
            console.error('Có lỗi xảy ra khi cập nhật hợp đồng!', error);
            toast.error('Có lỗi xảy ra khi cập nhật hợp đồng!');
        }
    };

    const handleDelete = async (contractId) => {
        try {
            const contractToUpdate = contracts.find(contract => contract.id === contractId);
            if (contractToUpdate) {
                const response = await axios.put(`https://66a9b8e2613eced4eba6017a.mockapi.io/api/contracts/Contract/${contractId}`, {
                    ...contractToUpdate,
                    status: false
                });
                const updatedContracts = contracts.map(contract =>
                    contract.id === contractId ? response.data : contract
                ).sort((a, b) => b.status - a.status);
                setContracts(updatedContracts);
                setFilteredContracts(updatedContracts);
                setTotalPage(Math.ceil(updatedContracts.length / itemsPerPage));
                setDeleteModalShow(false);
                toast.success('Xóa thành công hợp đồng!');
            }
        } catch (error) {
            console.error('Có lỗi xảy ra khi cập nhật trạng thái hợp đồng!', error);
            toast.error('Có lỗi xảy ra khi xóa hợp đồng!');
        }
    };

    const handleDeleteConfirm = () => {
        if (selectedContract) {
            handleDelete(selectedContract.id);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const formatDate = (dateString) => {
        return dateString ? format(new Date(dateString), 'dd/MM/yyyy') : '';
    };

    const handleView = (contract) => {
        setSelectedContract(contract);
        console.log(contract);

        setViewModalShow(true);
    };

    const handleEdit = (contract) => {
        setSelectedContract(contract);
        setEditModalShow(true);
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
                renderText={value => value}
            />,
            formatDate(contract.startDate),
            formatDate(contract.endDate),
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
            ...(contract.status ? [{
                className: 'btn-danger',
                icon: 'fa-trash',
                onClick: () => {
                    setSelectedContract(contract);
                    setDeleteModalShow(true);
                }
            }] : [])
        ]
    }));

    return (
        <div className="Contract-list">
            <ContractTitleComponents onSearch={handleSearch} contracts={contracts} />
            <div className="row contract-content">
                <div className="col-4">
                    <h3>Thêm hợp đồng</h3>
                    <ContractForm onSubmit={handleAddContract} contracts={contracts} />
                </div>
                <div className="col-8">
                    <TableComponents headers={headerContract}>
                        <TableBodyComponents rows={rows} />
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
            <ConfirmationComponents
                show={deleteModalShow}
                handleClose={() => setDeleteModalShow(false)}
                onConfirm={handleDeleteConfirm}
                message="Bạn có chắc chắn muốn xóa hợp đồng này?"
            />
        </div>
    );
};

export default ContractComponents;