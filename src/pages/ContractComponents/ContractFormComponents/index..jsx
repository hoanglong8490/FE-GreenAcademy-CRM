import React, {useState} from 'react';
import FormInput from "../../../components/FormInputComponents";

const ContractForm = ({onSubmit}) => {
    const [formData, setFormData] = useState({
        employeeId: '',
        contractType: 'Hợp đồng thử việc', // Default value
        salary: '',
        startDate: '',
        endDate: '',
        status: 'Còn hạn' // Default value
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.employeeId) newErrors.employeeId = 'Mã nhân viên không được để trống';
        if (!formData.contractType) newErrors.contractType = 'Loại hợp đồng không được để trống';
        if (!formData.salary || isNaN(formData.salary) || formData.salary <= 0)
            newErrors.salary = 'Mức lương phải là số dương';
        if (!formData.startDate) newErrors.startDate = 'Ngày bắt đầu không được để trống';
        if (!formData.endDate) newErrors.endDate = 'Ngày kết thúc không được để trống';
        if (new Date(formData.startDate) > new Date(formData.endDate))
            newErrors.endDate = 'Ngày kết thúc phải sau ngày bắt đầu';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            onSubmit(formData);
            setFormData({
                employeeId: '',
                contractType: 'Hợp đồng thử việc', // Reset to default value
                salary: '',
                startDate: '',
                endDate: '',
                status: 'Còn hạn' // Reset to default value
            });
            setErrors({});
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
            <div className="form-group">
                <label>Loại hợp đồng</label>
                <select
                    name="contractType"
                    value={formData.contractType}
                    onChange={handleChange}
                    className="form-control"
                >
                    <option value="Hợp đồng thử việc">Hợp đồng thử việc</option>
                    <option value="Hợp đồng chính thức">Hợp đồng chính thức</option>
                    <option value="Hợp đồng part-time">Hợp đồng part-time</option>
                </select>
                {errors.contractType && <div className="invalid-feedback">{errors.contractType}</div>}
            </div>
            <FormInput
                label="Mức lương"
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                error={errors.salary}
            />
            <FormInput
                label="Ngày bắt đầu"
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                error={errors.startDate}
            />
            <FormInput
                label="Ngày kết thúc"
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                error={errors.endDate}
            />
            <div className="form-group">
                <label>Status</label>
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="form-control"
                >
                    <option value="Còn hạn">Còn hạn</option>
                    <option value="Hết hạn">Hết hạn</option>
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Thêm hợp đồng</button>
        </form>
    );
};

export default ContractForm;
