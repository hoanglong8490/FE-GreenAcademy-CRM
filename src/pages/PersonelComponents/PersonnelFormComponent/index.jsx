import React, { useState } from 'react';
import FormInput from "../../../components/FormInputComponents";

const PersonnelForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        employeeId: '',
        employeeName: '',
        position: '',
        date: '',
        gender: '',
        email: '',
        phoneNumber: '',
        CCCD: '',
        status: true,
        image: [], // Đảm bảo rằng image là một mảng
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData({
                ...formData,
                [name]: Array.from(files) // Chuyển đổi file thành một mảng
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.employeeId) newErrors.employeeId = 'Mã nhân viên không được để trống';
        if (!formData.employeeName) newErrors.employeeName = 'Tên nhân viên không được để trống';
        if (!formData.CCCD) newErrors.CCCD = 'CCCD không được để trống';
        if (!formData.position) newErrors.position = 'Chức vụ không được để trống';
        if (!formData.phoneNumber) newErrors.phoneNumber = 'Số điện thoại không được để trống';
        if (!formData.email) newErrors.email = 'Email không được để trống';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            // Kiểm tra dữ liệu hình ảnh trước khi gọi onSubmit
            const validImages = formData.image.every(file => file instanceof File);
            if (validImages) {
                onSubmit({
                    ...formData,
                    status: true
                });
                setFormData({
                    employeeId: '',
                    employeeName: '',
                    position: '',
                    date: '',
                    gender: '',
                    email: '',
                    phoneNumber: '',
                    CCCD: '',
                    status: true,
                    image: [], // Đảm bảo rằng image được đặt lại là một mảng rỗng
                });
                setErrors({});
            } else {
                setErrors({ image: 'Hình ảnh không hợp lệ' });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormInput
                label="Mã nhân viên"
                type="text"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                error={errors.employeeId}
            />
            <FormInput
                label="Tên nhân viên"
                type="text"
                name="employeeName"
                value={formData.employeeName}
                onChange={handleChange}
                error={errors.employeeName}
            />
            <FormInput
                label="Chức vụ"
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                error={errors.position}
            />
            <FormInput
                label="Ngày sinh"
                type="date"
                name="date" // Đảm bảo name khớp với tên trong state
                value={formData.date}
                onChange={handleChange}
                error={errors.date}
            />
            <div className="form-group">
                <label>Giới tính</label>
                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="form-control"
                >
                    <option value="">Chọn giới tính</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                </select>
            </div>
            <FormInput
                label="Email"
                type="text"
                name="email" // Đảm bảo name khớp với tên trong state
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
            />
            <FormInput
                label="Số điện thoại"
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                error={errors.phoneNumber}
            />
            <FormInput
                label="CCCD"
                type="text"
                name="CCCD"
                value={formData.CCCD}
                onChange={handleChange}
                error={errors.CCCD}
            />
            <FormInput
                label="Bằng cấp"
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                error={errors.position}
            />
            <div className="form-group">
                <label>Image</label>
                <input
                    type="file"
                    name="image" // Đảm bảo name khớp với tên trong state
                    multiple
                    onChange={handleChange}
                    className="form-control"
                    accept=".jpg,.png"
                />
                {formData.image.length > 0 && (
                    <ul className="list-group mt-2">
                        {formData.image.map((image, index) => (
                            <li key={index} className="list-group-item">
                                {image.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <button type="submit" className="btn btn-primary">Thêm nhân viên</button>
        </form>
    );
};

export default PersonnelForm;
