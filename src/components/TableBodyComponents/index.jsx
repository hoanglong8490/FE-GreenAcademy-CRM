import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditDecision from '../../pages/EditDecision';

const TableBodyComponents = () => {
    const [data, setData] = useState([]);
    const [currentDecision, setCurrentDecision] = useState(null);

    useEffect(() => {
        axios.get('data/decision.json')
            .then(response => setData(response.data.data))
            .catch(err => console.log("Xảy ra lỗi: " + err));
    }, []);

    const handleEditClick = (decision) => {
        setCurrentDecision(decision);
        // Mở modal
        const modal = new window.bootstrap.Modal(document.getElementById('editEmployeeModal'));
        modal.show();
    };

    return (
        <>
            {data.map((row, index) => (
                <tr key={index}>
                    <td>{row.id}</td>
                    <td>{row.manv}</td>
                    <td>{row.name}</td>
                    <td>{row.content}</td>
                    <td>{row.date}</td>
                    <td>{row.hinhthuc}</td>
                    <td>{row.status}</td>
                    <td>
                        <button
                            className='btn btn-primary'
                            onClick={() => handleEditClick(row)}
                        >
                            <i className="fa-regular fa-pen-to-square"></i> Sửa
                        </button>
                        <Link style={{ margin: '0 10px' }} className="eye btn btn-warning" to={`/decision/${row.id}`}>
                            <i className="fa-solid fa-eye"></i>
                        </Link>
                        <Link className="trash btn btn-danger" to=''>
                            <i className="fa-solid fa-trash"></i>
                        </Link>
                    </td>
                </tr>
            ))}

            {/* Modal */}
            <div className="modal fade" id="editEmployeeModal" tabIndex="-1" aria-labelledby="editEmployeeModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editEmployeeModalLabel">Chỉnh sửa quyết định</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {currentDecision && <EditDecision decision={currentDecision} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TableBodyComponents;
