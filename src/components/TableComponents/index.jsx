import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';
import TableBodyComponents from '../TableBodyComponents';
import Input from '../InputComponents';
import { Link } from 'react-router-dom';

const TableComponents = ({ headers, children }) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("data/thead.json")
            .then((res) => setData(res.data.data))
            .catch(
                (err) => console.log("Xay ra loi roi" + err)
            );
    }, []);
    // console.log(data);

    return (
        <> 
                <Link className='btn btn-primary' style={{ margin: '10px 0 10px 0' }} to='/createDecision'>Thêm quyết định</Link>
                <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="row"> 
                            </div> 
                            <table className="table table-bordered table-hover"> 
                                <thead id="employeeTable">
                                    {data.length > 0 ? (
                                        data.map((item) => (
                                            <tr key={item.id} data-type={item.type}>
                                                <th>STT</th>
                                                <th>{item.manv}</th>
                                                <th>{item.name}</th>
                                                <th>{item.content}</th>
                                                <th>{item.date}</th>
                                                <th>{item.hinhthuc}</th>
                                                <th>{item.status}</th> 
                                                <th>Hành Động</th> 
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="8" className="text-center">Không có dữ liệu</td>
                                        </tr>
                                    )}
                                </thead>
                                <TableBodyComponents />
                            </table>
                        </div>
                    </div> 
                </div>
            </section>
        </>
    );
};

TableComponents.propTypes = {
    headers: PropTypes.arrayOf(PropTypes.string).isRequired,
    children: PropTypes.node.isRequired
};

export default TableComponents;