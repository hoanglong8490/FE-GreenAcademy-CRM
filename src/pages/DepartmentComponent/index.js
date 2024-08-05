import React, { useEffect, useState } from 'react'
import TableComponents from '../../components/TableComponents';
import TableBodyComponents from '../../components/TableBodyComponents';
import FormInput from '../../components/FormInputComponents';
import './sass/DepartmentStyle.scss'
import InfoModal from './ModalDepartment/InfoDepartment';
import { createDepartment, deleteDepartment, fetchDepartmentById, fetchDepartments, fetchStatus, updateDepartment } from './service/DepartmentService';



export default function DepartmentComponent() {
    const [departments, setDepartments] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', content: '' });
    const [formValue, setFormValue] = useState({
        departmentName: "",
        description: "",
        status: "",
        createDate: "",
        updateDate: "",
    })
    const [editingDepartmentId, setEditingDepartmentId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchDepartments();
            setDepartments(data);
        };
        fetchData();
    }, [])
    useEffect(() => {
        const fetchStatuses = async () => {
            const data = await fetchStatus();
            setStatuses(data);
        };
        fetchStatuses();
    }, [])
    const [search, setSearch] = useState('');
    const closeModal = () => setModalOpen(false);
    const convertDateToISO = (dateString) => {
        if (!dateString) return '';
        const [year, month, day] = dateString.split('-');
        if (day && month && year) {
            return `${day}/${month}/${year}`;
        }
        return '';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const departmentData = {
            departmentName: formValue.departmentName,
            description: formValue.description,
            status: formValue.status,
            createDate: convertDateToISO(formValue.createDate),
            updateDate: convertDateToISO(formValue.updateDate)
        };
        try {
            let res;
            if (isEditing) {
                res = await updateDepartment(editingDepartmentId, departmentData);
                setIsEditing(false);
            } else {
                res = await createDepartment(departmentData);
            }

            if (res) {
                setDepartments(isEditing ? departments.map(dep => dep.id === editingDepartmentId ? res : dep) : [...departments, res]);
                alert(isEditing ? "Cập nhật thành công!" : "Thêm mới thành công!");
                setFormValue({
                    departmentName: "",
                    description: "",
                    status: "",
                    createDate: "",
                    updateDate: "",
                });
                setEditingDepartmentId(null);
            }
        } catch (error) {
            console.error("Error adding or updating department:", error);
        }
    };
    const handleModalInfo = async (item) => {
        const departmentId = item.data[0];
        const department = await fetchDepartmentById(departmentId);
        console.log("department", department)
        if (department) {
            setModalContent({
                title: 'Thông tin phòng ban',
                content: (
                    <div>
                        <div className="form-group">
                            <label htmlFor="department_Id">ID:</label>
                            <input type="number" id="department_Id" className="form-control" value={department.id} disabled />
                        </div>
                        <div className="form-group">
                            <label htmlFor="department_Name">Tên phòng ban:</label>
                            <input type="text" id="department_Name" className="form-control" value={department.departmentName} disabled />
                        </div>
                        <div className="form-group">
                            <label htmlFor="department_Status">Trạng thái:</label>
                            <input type="text" id="department_Status" className="form-control" value={department.status} disabled />
                        </div>
                        <div className="form-group">
                            <label htmlFor="department_Description">Mô tả:</label>
                            <input type="text" id="department_Description" className="form-control" value={department.description} disabled />
                        </div>
                        <div className="form-group">
                            <label htmlFor="department_CreateDate">Ngày tạo:</label>
                            <input type="text" id="department_CreateDate" className="form-control" value={department.createDate} disabled />
                        </div>
                        <div className="form-group">
                            <label htmlFor="department_UpdateDate">Ngày cập nhật:</label>
                            <input type="text" id="department_UpdateDate" className="form-control" value={department.updateDate} disabled />
                        </div>
                    </div>
                )
            });
            setModalOpen(true);
        }
    };

    const handleUpdateDepartment = async (item) => {
        const departmentId = item.data[0];
        const department = await fetchDepartmentById(departmentId);
        if (department) {
            console.log(department.status);
            setFormValue({
                departmentName: department.departmentName,
                description: department.description,
                status: department.status,
                createDate: convertDateToISO(department.createDate),
                updateDate: convertDateToISO(department.updateDate)
            });
            setEditingDepartmentId(departmentId);
            setIsEditing(true);
            console.log(department.status);
        }
    };
    const handleDeleteDepartment = async (item) => {
        const departmentId = item.data[0];
        const confirmDelete = window.confirm("Bán muôn xóa phòng ban này khong?");
        if (confirmDelete) {
            try {
                await deleteDepartment(departmentId);
                setDepartments(departments.filter(department => department.id === departmentId));
                alert("Xóa phòng ban thành công!");
                const updatedDepartment = await fetchDepartments();
                setDepartments(updatedDepartment);
            } catch (error) {
                console.error("There was an error deleting the department!", error);
                alert("Có lỗi xảy ra khi xóa phòng ban.");
            }
        }

    }
    const handleSearch = (e) => {
        setSearch(e.target.value);
    }
    const filteredDepartments = departments.filter(department => department.departmentName.toLowerCase().startsWith(search.toLowerCase()));

    const header = ["ID", "Tên phòng ban", "Trạng thái", "Chức năng"];
    const row = filteredDepartments.map((department) => ({
        data: [String(department.id), department.departmentName, department.status],
        actions: [
            { className: "btn-primary", icon: "fas fa-edit", onClick: handleUpdateDepartment },
            { className: 'btn-danger', icon: 'fa-trash', onClick: handleDeleteDepartment },
            { className: 'btn-info', icon: 'fa-info', onClick: handleModalInfo }
        ]
    }))

    return (
        <div>
            <section className="content-header">
                <div className="container-fluid" bis_skin_checked={1}>
                    <div className="row mb-2" bis_skin_checked={1}>
                        <div className="col-sm-6" bis_skin_checked={1}>
                            <h1>Quản lý phòng ban</h1>
                        </div>
                        <div className="col-sm-6" bis_skin_checked={1}>
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Quản lý phòng ban</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="container-fluid">
                    <div className="row" >
                        {/* FROM INOUT */}
                        <div className="col-5" >
                            <div className="card">
                                <h2 className="text-center">Thông tin phòng ban</h2>
                                <div className="card-body" >
                                    <form onSubmit={handleSubmit}>
                                        <FormInput
                                            label="Tên phòng ban"
                                            name="departmentName"
                                            disabled={isEditing}
                                            value={formValue.departmentName || ""}
                                            onChange={handleChange}
                                        />
                                        <FormInput
                                            type="textarea"
                                            label="Mô tả"
                                            name="description"
                                            value={formValue.description || ""}
                                            onChange={handleChange}
                                        />
                                        <div className="form-group">
                                            <label>Trạng thái</label>
                                            <select
                                                name="status"
                                                value={formValue.status || ""}
                                                onChange={handleChange}
                                                className="form-control"
                                            >
                                                <option value="" disabled hidden>Chọn trạng thái</option>
                                                {statuses.map((opts, index) => {
                                                    return (
                                                        <option key={index} value={opts.label}>{opts.label}</option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                        <FormInput
                                            type="date"
                                            name="createDate"
                                            label="Thời gian tạo"
                                            disabled={isEditing}
                                            value={formValue.createDate || ""}
                                            onChange={handleChange}
                                        />
                                        <FormInput
                                            type="date"
                                            name="updateDate"
                                            label="Thời gian cập nhật"
                                            value={formValue.updateDate || ""}
                                            onChange={handleChange}
                                        />
                                        <button type="submit" className="btn btn-primary">
                                            {isEditing ? "Cập nhật" : "Thêm mới"}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {/* LIST DEPARTMENT */}
                        <div className="col-7">
                            <div className="card" >
                                <h2 className="text-center">Danh sách phòng ban</h2>
                                <div className="card-body" >
                                    <div id="example1_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer" >
                                        <div className="row">
                                            <div className="col-sm-12 col-md-6" >
                                            </div>
                                            <div className="col-sm-12 col-md-6" >
                                                <div id="filter" className="dataTables_filter" >
                                                    <label>Search:
                                                        <input type="search" className="form-control form-control-sm" value={search} onChange={handleSearch} placeholder="Nhập thông tin tại đây" />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row" >
                                            <div className="col-sm-12" >
                                                <TableComponents headers={header}>
                                                    <TableBodyComponents rows={row} />
                                                </TableComponents>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </section >
            <InfoModal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={modalContent.title}
                content={modalContent.content}
            />
        </div >
    )
}
