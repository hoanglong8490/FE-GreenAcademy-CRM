import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import FormInput from "../../components/FormInputComponents";
import {fetch_ListLiability, get_LiabilityById} from "./service/LiabilityService.";
import TableComponents from "../../components/TableComponents";
import TableBodyComponents from "../../components/TableBodyComponents";
import ReactPaginate from "react-paginate";

const LiabilityComponents = () => {
    const [liability, setLiability] = useState([]);
    const [formValue, setFormValue] = useState({
        student_Id: "",
        student_name: "",
        address: "",
        email: "",
        phone_Number: "",
        debt: "",
        period_debt: "",
        status: "",
        course_id: [],
        personnel_id: "",
        note: "",
        create_date: "",
        update_date: "",
    });
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch_ListLiability();
            setLiability(data);
            console.log(data)
        }
        fetchData();
    }, []);

    const handle_Change = (e) => {
        const {name, value} = e.target;
        setFormValue({
            ...formValue, [name]: value
        })
    }
    const handle_ModalInfo = async (item) => {
        const liabilityId = item.data[0];
        const liability = await get_LiabilityById(liabilityId);
        if (liability) {
            setLiability({
                title:"Thông tin chi tiết công nợ",
                content:{

                }
            })
        }
    }
    const header = ["ID", "Mã học viên", "Tên học viên", "Số Tiền Nợ", "Trạng Thái Nợ", "Khóa Học", "Chứ năng"]
    const rows = liability.map((item) => ({
        data: [item.id.toString(), item.student_Id.toString(), item.student_name, item.debt.toString(), item.status, Array.isArray(item.course_id) ? item.course_id.join(', ') : item.course_id],
        actions: [
            {className: 'btn-info', icon: 'fa-eye', onClick: handle_ModalInfo},
            {className: "btn-warning", icon: "fa-pen", onClick: handle_Change},
            {className: 'btn-danger', icon: 'fa-trash', onClick: handle_Change}
        ]
    }));
    return (<div>
        <section className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1>Quản lý công nợ</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                            <li className="breadcrumb-item active">Quản lý công nợ</li>
                        </ol>
                    </div>
                </div>
            </div>
        </section>
        <section className="content">
            <div className="container-fluid">
                <div className="row">
                    {/*<div className="col-4">*/}
                    {/*    <h2>form</h2>*/}
                    {/*</div>*/}
                    <div className="col-12">
                        <div className="card">
                            <h2 className="text-center">Danh sách công nợ</h2>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <TableComponents headers={header}>
                                            <TableBodyComponents rows={rows}/>
                                        </TableComponents>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </div>);
};

export default LiabilityComponents;
