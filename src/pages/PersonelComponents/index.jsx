// src/components/PersonnelComponents.js
import React, { useEffect, useState } from 'react';
import './Personnel.scss';
import TableComponents from "../../components/TableComponents";
import TableBodyComponents from "../../components/TableBodyComponents";
import PersonnelFormComponent from "./PersonnelFormComponent";
import axios from "axios";
import PersonnelViewComponents from "../PersonelComponents/PersonnelViewComponent";
import PersonnelEditComponents from "../PersonelComponents/PersonelEditComponent";
import PagingComponent from "../../components/PagingComponent";
import { format } from 'date-fns';
import ConfirmationComponents from "../../components/ConfirmationComponents";
import PersonnelTitleComponents from "./PersonnelTittleComponent";

const itemsPerPage = 10;

const PersonnelComponents = () => {
    const [Personnels, setPersonnels] = useState([]);
    const [filteredPersonnels, setFilteredPersonnels] = useState([]);
    const [viewModalShow, setViewModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [selectedPersonnel, setSelectedPersonnel] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const headerPersonnel = ['ID', 'Họ tên', 'Ngày sinh', 'Giới tính', 'Email', 'Trạng thái', 'Action'];

    useEffect(() => {
        fetchPersonnels();
    }, []);

    const fetchPersonnels = async () => {
        try {
            const response = await axios.get('https://66b080af6a693a95b538f138.mockapi.io/API/Personnels/personnel/personnel');
            const sortedPersonnels = response.data.sort((a, b) => b.status - a.status);
            setPersonnels(sortedPersonnels);
            setFilteredPersonnels(sortedPersonnels);
            setTotalPage(Math.ceil(sortedPersonnels.length / itemsPerPage));
        } catch (error) {
            console.error('Có lỗi xảy ra khi lấy dữ liệu!', error);
        }
    };

    const handleSearch = (filtered) => {
        const sortedFiltered = filtered.sort((a, b) => b.status - a.status);
        setFilteredPersonnels(sortedFiltered);
        setTotalPage(Math.ceil(sortedFiltered.length / itemsPerPage));
        setCurrentPage(1);
    };

    const handleAddPersonnel = async (newPersonnel) => {
        try {
            const response = await axios.post('https://66a9b8e2613eced4eba6017a.mockapi.io/api/Personnels/Personnel', newPersonnel);
            const updatedPersonnels = [...Personnels, response.data].sort((a, b) => b.status - a.status);
            setPersonnels(updatedPersonnels);
            setFilteredPersonnels(updatedPersonnels);
            setTotalPage(Math.ceil(updatedPersonnels.length / itemsPerPage));
            setCurrentPage(Math.ceil(updatedPersonnels.length / itemsPerPage));
        } catch (error) {
            console.error('Có lỗi xảy ra khi thêm hợp đồng!', error);
        }
    };

    const handleSaveEdit = async (updatedPersonnel) => {
        try {
            const response = await axios.put(`https://66a9b8e2613eced4eba6017a.mockapi.io/api/Personnels/Personnel/${updatedPersonnel.id}`, updatedPersonnel);
            const updatedPersonnels = Personnels.map(Personnel =>
                Personnel.id === updatedPersonnel.id ? response.data : Personnel
            ).sort((a, b) => b.status - a.status);
            setPersonnels(updatedPersonnels);
            setFilteredPersonnels(updatedPersonnels);
            setTotalPage(Math.ceil(updatedPersonnels.length / itemsPerPage));
            setEditModalShow(false);
        } catch (error) {
            console.error('Có lỗi xảy ra khi cập nhật hợp đồng!', error);
        }
    };

    const handleDelete = async (PersonnelId) => {
        try {
            const PersonnelToUpdate = Personnels.find(Personnel => Personnel.employeeId === PersonnelId);
            if (PersonnelToUpdate) {
                const response = await axios.put(`https://66a9b8e2613eced4eba6017a.mockapi.io/api/Personnels/Personnel/${PersonnelId}`, {
                    ...PersonnelToUpdate,
                    status: false
                });
                const updatedPersonnels = Personnels.map(Personnel =>
                    Personnel.id === PersonnelId ? response.data : Personnel
                ).sort((a, b) => b.status - a.status);
                setPersonnels(updatedPersonnels);
                setFilteredPersonnels(updatedPersonnels);
                setTotalPage(Math.ceil(updatedPersonnels.length / itemsPerPage));
                setDeleteModalShow(false);
            }
        } catch (error) {
            console.error('Có lỗi xảy ra khi cập nhật thông tin nhân viên!', error);
        }
    };

    const handleDeleteConfirm = () => {
        if (selectedPersonnel) {
            handleDelete(selectedPersonnel.id);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const formatDate = (dateString) => {
        return dateString ? format(new Date(dateString), 'dd/MM/yyyy') : '';
    };

    const handleView = (personnel) => {
        setSelectedPersonnel(personnel);
        setViewModalShow(true);
    };

    const handleEdit = (Personnel) => {
        setSelectedPersonnel(Personnel);
        setEditModalShow(true);
    };

    const rows = filteredPersonnels.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(Personnel => ({
        data: [
            Personnel.id,
            Personnel.employeeName,
            Personnel.date,
            Personnel.gender,
            Personnel.email,
            Personnel.status ? 'Active' : 'Inactive',
        ],
        actions: [
            {
                className: 'btn-info',
                icon: 'fa-eye',
                onClick: () => handleView(Personnel)
            },
            {
                className: 'btn-warning',
                icon: 'fa-pen',
                onClick: () => handleEdit(Personnel)
            },
            ...(Personnel.status ? [{
                className: 'btn-danger',
                icon: 'fa-trash',
                onClick: () => {
                    setSelectedPersonnel(Personnel);
                    setDeleteModalShow(true);
                }
            }] : [])
        ]
    }));

    return (
        <div className="Personnel-list">
            <PersonnelTitleComponents onSearch={handleSearch} Personnels={Personnels} />
            <div className="row Personnel-content">
                <div className="col-4">
                    <h3>Thêm nhân viên</h3>
                    <PersonnelFormComponent onSubmit={handleAddPersonnel} />
                </div>
                <div className="col-8">
                    <TableComponents headers={headerPersonnel}>
                        <TableBodyComponents rows={rows} />
                    </TableComponents>
                    <PagingComponent
                        totalPage={totalPage}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
            <PersonnelViewComponents
                show={viewModalShow}
                handleClose={() => setViewModalShow(false)}
                Personnel={selectedPersonnel}
            />
            <PersonnelEditComponents
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                Personnel={selectedPersonnel}
                onSave={handleSaveEdit}
            />
            <ConfirmationComponents
                show={deleteModalShow}
                handleClose={() => setDeleteModalShow(false)}
                onConfirm={handleDeleteConfirm}
                message="Bạn có chắc chắn muốn xóa nhân viên này?"
            />
        </div>
    );
};

export default PersonnelComponents;