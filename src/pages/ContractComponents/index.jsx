// src/components/ContractComponents.js
import React, {useEffect, useState} from 'react';
import './Contract.scss';
import TableComponents from "../../components/TableComponents";
import TableBodyComponents from "../../components/TableBodyComponents";
import ContractForm from "./ContractFormComponents/index.";
import ContractViewComponents from "./ContractViewComponents";
import ContractEditComponents from "./ContractEditComponents";
import PagingComponent from "../../components/PagingComponent";
import {format} from 'date-fns';
import ConfirmationComponents from "../../components/ConfirmationComponents";
import {NumericFormat} from 'react-number-format';
import ContractTitleComponents from "./ContractTittleComponents";

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
        loadContracts();
    }, []);

    const loadContracts = async () => {
        try {
            const contractsData = await fetchContracts();
            setContracts(contractsData);
            setFilteredContracts(contractsData);
            setTotalPage(Math.ceil(contractsData.length / itemsPerPage));
        } catch (error) {
            // Xử lý lỗi nếu cần
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
            const addedContract = await addContract(newContract);
            const updatedContracts = [...contracts, addedContract].sort((a, b) => b.status - a.status);
            setContracts(updatedContracts);
            setFilteredContracts(updatedContracts);
            setTotalPage(Math.ceil(updatedContracts.length / itemsPerPage));
            setCurrentPage(Math.ceil(updatedContracts.length / itemsPerPage));
        } catch (error) {
            // Xử lý lỗi nếu cần
        }
    };

    const handleSaveEdit = async (updatedContract) => {
        try {
            const savedContract = await updateContract(updatedContract);
            const updatedContracts = contracts.map(contract =>
                contract.id === updatedContract.id ? savedContract : contract
            ).sort((a, b) => b.status - a.status);
            setContracts(updatedContracts);
            setFilteredContracts(updatedContracts);
            setTotalPage(Math.ceil(updatedContracts.length / itemsPerPage));
            setEditModalShow(false);
        } catch (error) {
            // Xử lý lỗi nếu cần
        }
    };

    const handleDelete = async (contractId) => {
        try {
            const contractToUpdate = contracts.find(contract => contract.id === contractId);
            if (contractToUpdate) {
                const deletedContract = await deleteContract(contractId, contractToUpdate);
                const updatedContracts = contracts.map(contract =>
                    contract.id === contractId ? deletedContract : contract
                ).sort((a, b) => b.status - a.status);
                setContracts(updatedContracts);
                setFilteredContracts(updatedContracts);
                setTotalPage(Math.ceil(updatedContracts.length / itemsPerPage));
                setDeleteModalShow(false);
            }
        } catch (error) {
            // Xử lý lỗi nếu cần
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
            <ContractTitleComponents onSearch={handleSearch} contracts={contracts}/>
            <div className="row contract-content">
                <div className="col-4">
                    <h3>Thêm hợp đồng</h3>
                    <ContractForm onSubmit={handleAddContract} contracts={contracts}/>
                </div>
                <div className="col-8">
                    <TableComponents headers={headerContract}>
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