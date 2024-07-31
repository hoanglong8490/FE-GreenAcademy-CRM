import { Link } from 'react-router-dom';
import './style.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
const DecisionComponent = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("data/decision.json")
        .then((res) => setData(res.data.data))
        .catch((err) => console.log("Xay ra loi roi" + err));
    }, []);
    console.log(data);
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
                            <button className="btn btn-primary mb-2" data-bs-toggle="modal" data-bs-target="#addEmployeeModal">
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

                                    {data.map((item, index) =>
                                        <tr key={index} data-type={item.type}>
                                            <td>{item.id}</td>
                                            <td>{item.manv}</td>
                                            <td>{item.name}</td>
                                            <td>{item.content}</td>
                                            <td>{item.date}</td>
                                            <td>{item.hinhthuc}</td>
                                            <td>{item.status}</td>
                                            <td>
                                                <Link data-toggle="modal" data-target="#editEmployeeModal" className='btn btn-primary' to="#"><i className="fa-regular fa-pen-to-square"></i></Link>
                                                <Link className="eye btn btn-warning" to="#"><i className="fa-solid fa-eye"></i></Link>
                                                <Link className="trash btn btn-danger" to="#"><i className="fa-solid fa-trash"></i></Link>
                                            </td>
                                        </tr>
                                    ) }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="modal fade" id="editEmployeeModal" tabIndex="-1" aria-labelledby="editEmployeeModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title" id="editEmployeeModalLabel">Chỉnh sửa Nhân Viên</h4>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="editEmployeeId">Mã NV</label>
                                            <input type="text" className="form-control" id="editEmployeeId" placeholder="Nhập mã NV" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="editEmployeeName">Tên NV</label>
                                            <input type="text" className="form-control" id="editEmployeeName" placeholder="Nhập tên NV" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="editContent">Nội dung</label>
                                            <textarea className="form-control" id="editContent" placeholder="Nhập nội dung"></textarea>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="editDecisionDate">Ngày quyết định</label>
                                            <input type="date" className="form-control" id="editDecisionDate" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="editDecisionType">Hình thức</label>
                                            <select className="form-control" id="editDecisionType">
                                                <option value="Khen thưởng">Khen thưởng</option>
                                                <option value="Kỷ luật">Kỷ luật</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="editStatus">Trạng Thái</label>
                                            <input type="text" className="form-control" id="editStatus" placeholder="Nhập trạng thái" />
                                        </div>
                                        <button type="submit" className="btn btn-primary">Lưu</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default DecisionComponent;
