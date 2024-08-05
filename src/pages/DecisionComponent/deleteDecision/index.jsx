    // src/components/ConfirmDeleteModal.js
    import React from 'react';

    const ConfirmDeleteModal = ({ show, onClose, onConfirm }) => {
        if (!show) return null;

        return (
            <div className="modal fade show" tabIndex="-1" style={{ display: 'block'}} aria-labelledby="confirmDeleteModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-sm modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="confirmDeleteModalLabel">Xác nhận xóa</h5>
                            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Bạn có chắc chắn muốn xóa quyết định này không?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Hủy</button>
                            <button type="button" className="btn btn-danger" onClick={onConfirm}>Xóa</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    export default ConfirmDeleteModal;
