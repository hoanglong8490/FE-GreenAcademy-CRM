import React, {useState} from 'react';
import FormInput from "../../../components/FormInputComponents";
import {NumericFormat} from 'react-number-format';

const ContractForm = ({onSubmit}) => {
    const [formData, setFormData] = useState({
        employeeId: '',
        contractType: '',
        salary: '',
        startDate: '',
        endDate: '',
        files: []
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const {name, value, files} = e.target;
        if (files) {
            setFormData({
                ...formData,
                [name]: Array.from(files)
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
        if (!formData.contractType) newErrors.contractType = 'Loại hợp đồng không được để trống';
        if (!formData.salary || isNaN(Number(formData.salary.replace(/\./g, ''))) || Number(formData.salary.replace(/\./g, '')) <= 0)
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
            // Create FormData object for file upload
            const data = new FormData();
            Object.keys(formData).forEach(key => {
                if (Array.isArray(formData[key])) {
                    formData[key].forEach(file => data.append(key, file));
                } else {
                    data.append(key, formData[key]);
                }
            });

            // Submit form data
            onSubmit(data);
            setFormData({
                employeeId: '',
                contractType: '',
                salary: '',
                startDate: '',
                endDate: '',
                files: []
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
                    <option value="fulltime">Full-time (Toàn thời gian)</option>
                    <option value="parttime">Part-time (Bán thời gian)</option>
                    <option value="freelance">Freelance (Làm việc tự do)</option>
                    <option value="intern">Internship (Thực tập)</option>
                    <option value="seasonal">Seasonal (Theo mùa vụ)</option>
                </select>
                {errors.contractType && <div className="text-danger">{errors.contractType}</div>}
            </div>
            <div className="form-group">
                <label>Mức lương</label>
                <NumericFormat
                    className="form-control"
                    name="salary"
                    value={formData.salary}
                    thousandSeparator="."
                    decimalSeparator=","
                    onValueChange={(values) => {
                        const {value} = values;
                        setFormData({
                            ...formData,
                            salary: value
                        });
                    }}
                    isNumericString
                />
                {errors.salary && <div className="text-danger">{errors.salary}</div>}
            </div>
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
                <label>Hồ sơ hợp đồng</label>
                <input
                    type="file"
                    name="files"
                    multiple
                    onChange={handleChange}
                    className="form-control"
                    accept=".doc,.docx,.xls,.xlsx,.pdf"
                />
                {formData.files.length > 0 && (
                    <ul className="list-group mt-2">
                        {formData.files.map((file, index) => (
                            <li key={index} className="list-group-item">
                                {file.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <button type="submit" className="btn btn-primary">Thêm hợp đồng</button>
        </form>
    );
};

export default ContractForm;