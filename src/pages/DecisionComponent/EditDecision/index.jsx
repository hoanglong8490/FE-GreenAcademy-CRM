import { useState, useEffect } from "react";
import Input from "../../../components/InputComponents";
<<<<<<< HEAD
=======
import { updateDecision } from "../service/decision";
>>>>>>> origin/crm-hr

function EditDecision({ decision }) {
    const [formData, setFormData] = useState(decision);

    useEffect(() => {
        setFormData(decision);
    }, [decision]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
<<<<<<< HEAD
        // Xử lý dữ liệu form ở đây
        console.log("Form Data:", formData);
        // Đóng modal sau khi lưu
        // const modal = window.bootstrap.Modal.getInstance(document.getElementById('editEmployeeModal'));
        // modal.hide();
    };
=======
        updateDecision(formData.id, formData)
            .then(() => {
                // Show a success message or handle successful update
                console.log("Decision updated successfully.");
                // Optionally, close the modal here
                // const modal = window.bootstrap.Modal.getInstance(document.getElementById('editEmployeeModal'));
                // modal.hide();
            })
            .catch(error => {
                // Handle any errors here
                console.error("Error updating decision:", error);
            });
    };
    
>>>>>>> origin/crm-hr

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="editEmployeeId">Mã NV</label>
                <Input
                    type="text"
                    className="form-control"
                    id="editEmployeeId"
                    name="id"
                    value={formData.manv}
<<<<<<< HEAD
                    readOnly
=======
                    readOnly 
>>>>>>> origin/crm-hr
                />
            </div>
            <div className="form-group">
                <label htmlFor="editEmployeeName">Tên NV</label>
                <Input
                    type="text"
                    className="form-control"
                    id="editEmployeeName"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="editContent">Nội dung</label>
                <textarea
                    className="form-control"
                    id="editContent"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                ></textarea>
            </div>
            <div className="form-group">
<<<<<<< HEAD
=======
                <label htmlFor="editEmployeeName">Số điện thoại</label>
                <Input
                    type="text"
                    className="form-control"
                    id="editEmployeeName"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="editEmployeeName">Email</label>
                <Input
                    type="text"
                    className="form-control"
                    id="editEmployeeName"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="editEmployeeName">Phòng ban</label>
                <Input
                    type="text"
                    className="form-control"
                    id="editEmployeeName"
                    name="phongban"
                    value={formData.phong_ban}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
>>>>>>> origin/crm-hr
                <label htmlFor="editDecisionDate">Ngày quyết định</label>
                <Input
                    type="date"
                    className="form-control"
                    id="editDecisionDate"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="editDecisionType">Hình thức</label>
                <select
                    className="form-control"
                    id="editDecisionType"
                    name="hinhthuc"
                    value={formData.hinhthuc}
                    onChange={handleChange}
                >
                    <option value="Khen thưởng">Khen thưởng</option>
                    <option value="Kỷ luật">Kỷ luật</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="editStatus">Trạng Thái</label>
                <Input
                    type="text"
                    className="form-control"
                    id="editStatus"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                />
<<<<<<< HEAD
            </div> 
=======
            </div>  
            <button type="submit" className="btn btn-primary">Cập nhật</button> 
>>>>>>> origin/crm-hr
        </form>
    );
}

export default EditDecision;
