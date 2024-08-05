<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditDecision from '../../pages/DecisionComponent/EditDecision';
import DetailDecision from '../../pages/DecisionComponent/DetailDecision';
import ConfirmDeleteModal from '../../pages/DecisionComponent/deleteDecision';

const TableBodyComponents = () => {
    const [currentDecision, setCurrentDecision] = useState(null);
    const [detailDecision, setDetailDecision] = useState(null);
    const [data, setData] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        axios.get('data/decision.json')
            .then(response => {
                if (response.data && Array.isArray(response.data.data)) {
                    setData(response.data.data);
                } else {
                    console.log('Unexpected data format:', response.data);
                }
            })
            .catch(err => console.log("Xảy ra lỗi: " + err));
    }, []);

    const handleEditClick = (decision) => {
        setCurrentDecision(decision);
        const modal = new window.bootstrap.Modal(document.getElementById('editEmployeeModal'));
        modal.show();
    };

    const handleDetailClick = (decision) => {
        setDetailDecision(decision);
        const modal = new window.bootstrap.Modal(document.getElementById('detailEmployeeModal'));
        modal.show();
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setShowConfirmModal(true);
    };

    const confirmDelete = () => {
        axios.delete(`/api/decisions/${deleteId}`)
            .then(response => {
                setData(data.filter(item => item.id !== deleteId));
                console.log('Deleted successfully');
                setShowConfirmModal(false);
            })
            .catch(err => {
                console.log('Failed to delete:', err);
                setShowConfirmModal(false);
            });
    };

    const handleCloseConfirmModal = () => {
        setShowConfirmModal(false);
    };

    return (
        <>
            <tbody>
                {Array.isArray(data) && data.length > 0 ? (
                    data.map((row, index) => (
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
                                <button
                                    style={{ margin: '0 10px' }}
                                    className="btn btn-warning"
                                    onClick={() => handleDetailClick(row)}
                                >
                                    <i className="fa-solid fa-eye"></i>
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(row.id)}
                                >
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="8">No data available</td>
                    </tr>
                )}
            </tbody>

            {/* Edit Modal */}
            <div className="modal fade" id="editEmployeeModal" tabIndex="-1" aria-labelledby="editEmployeeModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editEmployeeModalLabel">Chỉnh sửa quyết định</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {currentDecision ? <EditDecision decision={currentDecision} /> : <p>Loading...</p>}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                            <button type="button" className="btn btn-primary">Lưu thay đổi</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detail Modal */}
            <div className="modal fade" id="detailEmployeeModal" tabIndex="-1" aria-labelledby="detailEmployeeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="detailEmployeeModalLabel">Chi tiết quyết định</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {detailDecision ? <DetailDecision decision={detailDecision} /> : <p>Loading...</p>}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirm Delete Modal */}
            <ConfirmDeleteModal
                show={showConfirmModal}
                onClose={handleCloseConfirmModal}
                onConfirm={confirmDelete}
            />
=======
// src/components/TableBodyComponents.js
import PropTypes from 'prop-types';
import React from 'react';

const TableBodyComponents = ({rows}) => {
    const handleActionClick = (action, item) => {
        if (action.onClick) {
            action.onClick(item);
        }
    };
    return (
        <>
            {rows.map((row, index) => (
                <tr key={index}>
                    {row.data.map((cell, cellIndex) => (
                        <td key={cellIndex}>{cell}</td>
                    ))}
                    <td>
                        {row.actions.map((action, actionIndex) => (
                            <button
                                type="button"
                                className={`btn ${action.className}`}
                                key={actionIndex}
                                onClick={() => handleActionClick(action, row)}
                            >
                                <i className={`fas ${action.icon}`}></i>
                            </button>
                        ))}
                    </td>
                </tr>
            ))}
>>>>>>> origin/crm-hr
        </>
    );
};

<<<<<<< HEAD
=======
TableBodyComponents.propTypes = {
    rows: PropTypes.arrayOf(
        PropTypes.shape({
            data: PropTypes.arrayOf(
                PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.object // Cập nhật điều này để phản ánh các loại thực tế
                ])
            ).isRequired,
            actions: PropTypes.arrayOf(
                PropTypes.shape({
                    className: PropTypes.string.isRequired,
                    icon: PropTypes.string.isRequired,
                    onClick: PropTypes.func // Xử lý sự kiện nhấp chuột
                })
            ).isRequired
        })
    ).isRequired
};

>>>>>>> origin/crm-hr
export default TableBodyComponents;
