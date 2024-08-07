// Importing necessary modules and components
import React, { useEffect, useState } from 'react';
import './Personnel.scss';
import TableComponents from "../../components/TableComponents";
import TableBodyComponents from "../../components/TableBodyComponents";
import PersonnelFormComponent from "./PersonnelFormComponents";
import PersonnelViewComponent from "./PersonnelViewComponents";
import PersonnelEditComponent from "./PersonelEditComponents";
import PagingComponent from "../../components/PagingComponent";
import { format } from 'date-fns';
import ConfirmationComponent from "../../components/ConfirmationComponents";
import PersonnelTitleComponent from "./PersonnelTittleComponents";
import { toast } from 'react-toastify';
import { addPersonnel, deletePersonnel, fetchContracts, updatePersonnel } from "./PersonnelService/PersonnelSevice";
// Constants
const itemsPerPage = 10;

const PersonnelComponents = () => {
    // State variables to manage personnels, modals, and pagination
    const [personnels, setPersonnels] = useState([]);
    const [filteredPersonnels, setFilteredPersonnels] = useState([]);
    const [viewModalShow, setViewModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [selectedPersonnel, setSelectedPersonnel] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    // Header labels for the personnel table
    const headerPersonnel = ['ID', 'Mã nhân viên', 'Họ tên', 'Ngày sinh', 'Giới tính', 'Email', 'Trạng thái', 'Action'];

    // Fetch personnels data on component mount
    useEffect(() => {
        loadPersonnels();
    }, []);
    const loadPersonnels = async () => {
        try {
            const personnelsData = await fetchContracts();
            setPersonnels(personnelsData);
            setFilteredPersonnels(personnelsData);
            setTotalPage(Math.ceil(personnelsData.length / itemsPerPage));

            // toast.success('Dữ liệu hợp đồng đã được tải thành công!');

        } catch (error) {
            toast.error('Có lỗi xảy ra khi lấy dữ liệu hợp đồng!');
        }
    };
    // Handle search and update filtered personnels
    const handleSearch = (filtered) => {
        const sortedFiltered = filtered.sort((a, b) => b.status - a.status);
        setFilteredPersonnels(sortedFiltered);
        setTotalPage(Math.ceil(sortedFiltered.length / itemsPerPage));
        setCurrentPage(1);
    };

    // Handle adding a new personnel    
    const handleAddPersonnel = async (newPersonnel) => {
        try {
            console.log(newPersonnel);
            const addedPersonnel = await addPersonnel(newPersonnel);
            const updatedPersonnels = [...personnels, addedPersonnel].sort((a, b) => b.status - a.status);
            setPersonnels(updatedPersonnels);
            setFilteredPersonnels(updatedPersonnels);
            setTotalPage(Math.ceil(updatedPersonnels.length / itemsPerPage));
            setCurrentPage(Math.ceil(updatedPersonnels.length / itemsPerPage));
            toast.success('Thêm thành công nhân viên');
            console.log(addedPersonnel);

        } catch (error) {
            toast.success('Có lỗi xảy ra khi thêm nhân viên');
            console.error('Có lỗi xảy ra khi thêm nhân viên!', error);
            toast.error(error.message);
        }
    };

    // Handle editing an existing personnel
    const handleSaveEdit = async (updatedPersonnel) => {
        try {
            console.log(updatedPersonnel);
            const savedPersonnel = await updatePersonnel(updatedPersonnel);
            const updatedPersonnels = personnels.map(personnel =>
                personnel.id === updatedPersonnel.id ? savedPersonnel : personnel
            ).sort((a, b) => b.status - a.status);
            setPersonnels(updatedPersonnels);
            setFilteredPersonnels(updatedPersonnels);
            setTotalPage(Math.ceil(updatedPersonnels.length / itemsPerPage));
            setEditModalShow(false);
            toast.success('Cập nhật thành công!');
        } catch (error) {
            console.error('Có lỗi xảy ra khi cập nhật nhân viên!', error);
        }
    };

    // Handle deleting a personnel
    const handleDelete = async (personnelId) => {
        try {
            const personnelToUpdate = personnels.find(personnel => personnel.id === personnelId);
            if (personnelToUpdate) {
                const deletedPersonnel = await deletePersonnel(personnelId, personnelToUpdate);
                const updatedPersonnels = personnels.map(personnel =>
                    personnel.id === personnelId ? deletedPersonnel : personnel
                ).sort((a, b) => b.status - a.status);
                setPersonnels(updatedPersonnels);
                setFilteredPersonnels(updatedPersonnels);
                setTotalPage(Math.ceil(updatedPersonnels.length / itemsPerPage));
                setDeleteModalShow(false);
                toast.success("Xóa thành công nhân viên");
            }
        } catch (error) {
            console.error('Có lỗi xảy ra khi cập nhật thông tin nhân viên!', error);
        }
    };

    // Confirm deletion handler
    const handleDeleteConfirm = () => {
        if (selectedPersonnel) {
            handleDelete(selectedPersonnel.id);
        }
    };

    // Handle page change for pagination
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Format date to a readable format
    const formatDate = (dateString) => {
        return dateString ? format(new Date(dateString), 'dd/MM/yyyy') : '';
    };

    // Handle view action for a personnel
    const handleView = (personnel) => {
        setSelectedPersonnel(personnel);
        setViewModalShow(true);
    };

    // Handle edit action for a personnel
    const handleEdit = (personnel) => {
        setSelectedPersonnel(personnel);
        setEditModalShow(true);
    };

    // Prepare rows for the table
    const rows = filteredPersonnels.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(personnel => ({
        data: [
            personnel.id,
            personnel.employeeId,
            personnel.employeeName,
            formatDate(personnel.date),
            personnel.gender,
            personnel.email,
            personnel.status ? 'Active' : 'Inactive',
        ],
        actions: [
            {
                className: 'btn-info d-flex flex-column mb-2',
                icon: 'fa fa-eye',
                onClick: () => handleView(personnel)
            },
            {
                className: 'btn-warning d-flex flex-column mb-2',
                icon: 'fa fa-pen',
                onClick: () => handleEdit(personnel)
            },
            ...(personnel.status ? [{
                className: 'btn-danger d-flex flex-column',
                icon: 'fa fa-trash',
                onClick: () => {
                    setSelectedPersonnel(personnel);
                    setDeleteModalShow(true);
                }
            }] : [])
        ]
    }));

    return (
        <div className="personnel-list">
            <PersonnelTitleComponent onSearch={handleSearch} personnels={personnels} />
            <div className="row personnel-content">
                <div className="col-4">
                    <h3>Thêm nhân viên</h3>
                    <PersonnelFormComponent onSubmit={handleAddPersonnel} personnels={personnels} />
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
            <PersonnelViewComponent
                show={viewModalShow}
                handleClose={() => setViewModalShow(false)}
                personnel={selectedPersonnel}
            />
            <PersonnelEditComponent
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                personnel={selectedPersonnel}
                onSave={handleSaveEdit}

            />
            <ConfirmationComponent
                show={deleteModalShow}
                handleClose={() => setDeleteModalShow(false)}
                onConfirm={handleDeleteConfirm}
                message="Bạn có chắc chắn muốn xóa nhân viên này?"
            />
        </div>
    );
};

export default PersonnelComponents;
