import { useState } from "react";
import Input from "../../components/InputComponents";
import { addDecision } from "../../service/decision";

function CreateDecision() {
    const [data, setData] = useState([]);

    const handleSave = (e) => {
        e.preventDefault(); // Ngăn hành động mặc định của form

        // Xử lý dữ liệu form ở đây
        // Bạn có thể lấy giá trị từ các trường input nếu cần
   
        console.log(e);

        // Ví dụ: console.log(e.target.elements['manv'].value);
    };

    return (
        <div className="create-decision" style={{ padding: '20px'}}>
            <form className="container" style={{ border: '1px solid gray', padding: '20px' }} onSubmit={handleSave}>
                <h2>Thêm khen thưởng/kỷ luật</h2>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label>Mã nhân viên:</label>
                            <Input
                                type="text"
                                name="manv"
                                placeholder="Nhập mã nhân viên..."
                            />
                        </div>  
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label>Họ tên</label>
                            <Input
                                type="text"
                                name="fullName"
                                placeholder="Nhập tên nhân viên..."
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <label>Nội dung</label>
                            <textarea
                                className="form-control"
                                id="exampleInputEmail1"
                                name="content"
                                aria-describedby="emailHelp"
                            />
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <label>Ngày quyết định</label>
                            <Input
                                type="date"
                                name="date"
                            />
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <label>Phone</label>
                            <Input
                                type="text"
                                name="phone"
                                placeholder="Nhập số điện thoại..."
                            />
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <label>Email address</label>
                            <Input
                                type="email"
                                name="email"
                                placeholder="Nhập email..."
                            />
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="form-group">
                            <label>Hình thức</label>
                            <select className="form-control" id="exampleSelect" name="options">
                                <option value="">Choose...</option>
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="form-group">
                            <label>Trạng thái</label>
                            <select className="form-control" id="exampleSelect" name="status">
                                <option value="option1">Đã xử lý</option>
                                <option value="option2">Đang chờ</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <label>Phòng ban</label>
                            <Input
                                type="text"
                                name="phongban"
                                placeholder="Nhập phòng ban..."
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
