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
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);

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
        setShowEditModal(true);
    };

    const handleDetailClick = (decision) => {
        setDetailDecision(decision);
        setShowDetailModal(true);
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

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

    const handleCloseDetailModal = () => {
        setShowDetailModal(false);
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
                        <td colSpan="8">Không có dữ liệu</td>
                    </tr>
                )}
            </tbody>

            {/* Edit Modal */}
            <div className={`modal fade ${showEditModal ? 'show' : ''}`} style={{ display: showEditModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="editEmployeeModalLabel" aria-hidden={!showEditModal}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editEmployeeModalLabel">Chỉnh sửa quyết định</h5>
                            <button type="button" className="btn-close" onClick={handleCloseEditModal} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {currentDecision ? <EditDecision decision={currentDecision} /> : <p>Loading...</p>}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleCloseEditModal}>Đóng</button>
                            <button type="button" className="btn btn-primary">Lưu thay đổi</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detail Modal */}
            <div className={`modal fade ${showDetailModal ? 'show' : ''}`} style={{ display: showDetailModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="detailEmployeeModalLabel" aria-hidden={!showDetailModal}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="detailEmployeeModalLabel">Chi tiết quyết định</h5>
                            <button type="button" className="btn-close" onClick={handleCloseDetailModal} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {detailDecision ? <DetailDecision decision={detailDecision} /> : <p>Loading...</p>}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleCloseDetailModal}>Đóng</button>
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
        </>
    );
};

export default TableBodyComponents;
