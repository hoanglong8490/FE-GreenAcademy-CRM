const EditDecision = () => {
    return(
        <>
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
        </>
    )
}
export default EditDecision;