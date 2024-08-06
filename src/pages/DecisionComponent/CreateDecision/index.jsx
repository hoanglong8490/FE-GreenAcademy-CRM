import { useState } from "react";
import Input from "../../../components/InputComponents";
import { addDecision } from "../service/decision";
import { useNavigate } from "react-router-dom";

function CreateDecision() {
    const navigate = useNavigate();
    // State to manage form data
    const [formData, setFormData] = useState({
        manv: '',
        fullName: '',
        content: '',
        date: '',
        phone: '',
        email: '',
        options: '',
        status: '',
        phongban: ''
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSave = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            // Call addDecision to post data to the backend
            const response = await addDecision(formData);
            console.log("Decision added:", response);
            // Optionally, reset the form or show a success message
            setFormData({
                manv: '',
                name: '',
                content: '',
                date: '',
                phone: '',
                email: '',
                hinhthuc: '',
                status: '',
                phongban: ''
            });
            navigate('/DecisionList');
            // You might also redirect or display a success message here
        } catch (error) {
            console.error("Error adding decision:", error);
        }
    };

    return (
        <div className="create-decision" style={{ padding: '20px' }}>
            <form className="container" style={{ border: '1px solid gray', padding: '20px' }} onSubmit={handleSave}>
                <h2>Thêm khen thưởng/kỷ luật</h2>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label>Mã nhân viên:</label>
                            <Input
                                type="text"
                                name="manv"
                                value={formData.manv}
                                placeholder="Nhập mã nhân viên..."
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label>Họ tên</label>
                            <Input
                                type="text"
                                name="name"
                                value={formData.name}
                                placeholder="Nhập tên nhân viên..."
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <label>Nội dung</label>
                            <textarea
                                className="form-control"
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <label>Ngày quyết định</label>
                            <Input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <label>Số điện thoại</label>
                            <Input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                placeholder="Nhập số điện thoại..."
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <label>Email address</label>
                            <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                placeholder="Nhập email..."
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="form-group">
                            <label>Hình thức</label>
                            <select
                                className="form-control"
                                name="hinhthuc"
                                value={formData.hinhthuc}
                                onChange={handleChange}
                            >
                                <option value="Khen thưởng">Khen thưởng</option>
                                <option value="Kỷ luật">Kỷ luật</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="form-group">
                            <label>Trạng thái</label>
                            <select
                                className="form-control"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="Đã xử lý">Đã xử lý</option>
                                <option value="Đang chờ">Đang chờ</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <label>Phòng ban</label>
                            <Input
                                type="text"
                                name="phongban"
                                value={formData.phongban}
                                placeholder="Nhập phòng ban..."
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="imageUpload">Tải lên hình ảnh:</label>
                            <input
                                type="file"
                                className="form-control-file"
                                id="imageUpload"
                                accept="image/*"
                            />
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Add</button>
            </form>
        </div>
    );
}

export default CreateDecision;
