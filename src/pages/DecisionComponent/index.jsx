import {Link} from 'react-router-dom';
import './style.css';
import {useEffect, useState} from 'react';
import axios from 'axios';
import EditDecision from './editDecision';

const DecisionComponent = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("data/decision.json")
            .then((res) => {
                console.log(res.data);
                setData(Array.isArray(res.data.data) ? res.data.data : []);
            })
            .catch((err) => console.log("Xảy ra lỗi: " + err));
    }, []);

    return (
        <>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-2">
                                    <div className="form-group">
                                        <label htmlFor="filterType">Lọc theo loại:</label>
                                        <select id="filterType" className="form-control">
                                            <option value="">Tất cả</option>
                                            <option value="Khen thưởng">Khen thưởng</option>
                                            <option value="Kỷ luật">Kỷ luật</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <button className="btn btn-primary mb-2" data-bs-toggle="modal"
                                    data-bs-target="#addEmployeeModal">
                                <i className="fa-solid fa-circle-plus"></i> Thêm Nhân Viên
                            </button>
                            <table className="table table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Mã NV</th>
                                    <th>Tên NV</th>
                                    <th>Nội dung</th>
                                    <th>Ngày quyết định</th>
                                    <th>Hình thức</th>
                                    <th>Trạng Thái</th>
                                    <th>Thao Tác</th>
                                </tr>
                                </thead>
                                <tbody id="employeeTable">
                                {data.length > 0 ? (
                                    data.map((item) => (
                                        <tr key={item.id} data-type={item.type}>
                                            <td>{item.id}</td>
                                            <td>{item.manv}</td>
                                            <td>{item.name}</td>
                                            <td>{item.content}</td>
                                            <td>{item.date}</td>
                                            <td>{item.hinhthuc}</td>
                                            <td>{item.status}</td>
                                            <td>
                                                <Link data-toggle="modal" data-target="#editEmployeeModal"
                                                      className='btn btn-primary' to="#"><i
                                                    className="fa-regular fa-pen-to-square"></i></Link>
                                                <Link className="eye btn btn-warning" to="#"><i
                                                    className="fa-solid fa-eye"></i></Link>
                                                <Link className="trash btn btn-danger" to="#"><i
                                                    className="fa-solid fa-trash"></i></Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center">Không có dữ liệu</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <EditDecision/>
                </div>
            </section>
        </>
    );
};

export default DecisionComponent;
