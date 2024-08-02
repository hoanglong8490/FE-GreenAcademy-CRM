import React, { useState } from 'react'
import TableComponents from '../../components/TableComponents';
import TableBodyComponents from '../../components/TableBodyComponents';
import FormInput from '../../components/FormInputComponents';
import './sass/DepartmentStyle.scss'
// import Input from '../../components/InputComponents';


export default function DepartmentComponent() {


    const [formValue, setFormValue] = useState({
        departmentName: "",
        descripstion: "",
        status: "Hoạt Động",
        update: "",
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormValue({
            deparment: "",
            descripstion: "",
            status: "",
            update: ""
        })
        console.log(formValue)
    }


    const header = ["ID", "Tên phòng ban", "Trạng thái", "Chức năng"];
    const row = [{
        data: ["PB01", "Hành chính nhân sự", "Hoạt động"],
        actions: [
            { href: "#edit", className: "btn-primary", icon: "fas fa-edit" },
            { href: '#delete', className: 'btn-danger', icon: 'fa-trash' },
            {
                href: '#info', className: 'btn-info', icon: 'fa-info'
            },
        ]
    }]

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
                                            value={formValue.departmentName || ""}
                                            onChange={handleChange}
                                        />
                                        <FormInput
                                            type="textarea"
                                            label="Mô tả"
                                            name="descripstion"
                                            value={formValue.descripstion || ""}
                                            onChange={handleChange}
                                        />
                                        <div className="form-group">
                                            <label>Trạng thái</label>
                                            <select
                                                name="status"
                                                value={formValue.status || ""}
                                                onChange={handleChange}
                                                className="ml-2 form-control"
                                            >
                                                <option value="Hoạt Động" style={{ color: 'green' }}>Hoạt Động</option>
                                                <option value="Tạm Ngưng" style={{ color: 'red' }}>Tạm Ngưng</option>
                                            </select>
                                        </div>
                                        <FormInput
                                            type="date"
                                            name="update"
                                            label="Thời gian cập nhật"
                                            value={formValue.update || ""}
                                            onChange={handleChange}
                                        />
                                        <button type="submit" className="btn btn-primary">
                                            Xác nhận
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
                                                <div id="example1_filter" className="dataTables_filter" >
                                                    <label>Search:<input type="search" className="form-control form-control-sm" placeholder="Nhập thông tin tại đây" aria-controls="example1" /></label>
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
                                        <div className="row" >
                                            <div className="col-sm-12 col-md-5" >
                                                <div className="dataTables_info" id="example1_info" role="status" aria-live="polite" >Showing 1 to 4 of 4 entries</div>
                                            </div>
                                            <div className="col-sm-12 col-md-7" >
                                                <div className="dataTables_paginate paging_simple_numbers" id="example1_paginate" >
                                                    <ul className="pagination"><li className="paginate_button page-item previous disabled" id="example1_previous">
                                                        <a href="#" aria-controls="example1" data-dt-idx={0} tabIndex={0} className="page-link">Previous</a>
                                                    </li>
                                                        <li className="paginate_button page-item active">
                                                            <a href="#" aria-controls="example1" data-dt-idx={1} tabIndex={0} className="page-link">1</a>
                                                        </li>
                                                        <li className="paginate_button page-item next disabled" id="example1_next">
                                                            <a href="#" aria-controls="example1" data-dt-idx={2} tabIndex={0} className="page-link">Next</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="modal fade" id="info" tabIndex={-1} aria-labelledby="infoModal" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="infoModal">Thông tin phòng ban</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">×</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            ...
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-primary">Save changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
