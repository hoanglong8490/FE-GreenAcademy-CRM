// import React from 'react'
// import { PropTypes } from 'prop-types';

// const infoModal = ({ show, close, infoDepartment }) => {
    
//     return (
//         <div className={`modal fade ${show ? ' show' : ''}`} style={{ display: show ? 'block' : 'none' }} tabIndex={-1} aria-labelledby='infoModal' aria-hidden={!show}>
//             <div className="modal-dialog">
//                 <div className="modal-content">
//                     <div className="modal-header">
//                         <h5 className="modal-title" id="infoModal">Thông tin phòng ban</h5>
//                         <button type="button" className="close" onClick={close} aria-label="Close">
//                             <span aria-hidden="true">×</span>
//                         </button>
//                     </div>
//                     <div className="modal-body">
//                         {infoDepartment ? (
//                             <div>
//                                 <p>ID: {infoDepartment.id}</p>
//                                 <p>Tên: {infoDepartment.name}</p>
//                                 <p>Trạng thái: {infoDepartment.status}</p>
//                                 <p>Nội dung: {infoDepartment.description}</p>
//                                 <p>Ngày tạo:{infoDepartment.createdAt}</p>
//                                 <p>Ngày thay đổi: {infoDepartment.updatedAt}</p>
//                             </div>
//                         ) : (
//                             <p>Không có thông tin</p>
//                         )};
//                     </div>
//                     <div className="modal-footer">
//                         <button type="button" className="btn btn-secondary" onClick={close}>Close</button>

//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
// infoModal.prototype = {
//     show: PropTypes.bool.isRequired,
//     close: PropTypes.func.isRequired,
//     departmentInfo: PropTypes.shape({
//         id: PropTypes.string,
//         name: PropTypes.string,
//         status: PropTypes.string,
//         description: PropTypes.string,
//         createdAt: PropTypes.string,
//         updatedAt: PropTypes.string
//     })
// }
// export default infoModal;

