import React from 'react';
import FormInput from '../../../components/FormInputComponents';


const DepartmentForm = ({ formValue, handleChange, handleSubmit, isEditing, statuses }) => (
    <div className="col-6">
        <div className="card">
            <h2 className="text-center">Thông tin phòng ban</h2>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <FormInput
                        label="Tên phòng ban"
                        name="departmentName"
                        disabled={isEditing}
                        value={formValue.departmentName || ""}
                        onChange={e => handleChange(e)}
                    />
                    <FormInput
                        type="textarea"
                        label="Mô tả"
                        name="description"
                        value={formValue.description || ""}
                        onChange={e => handleChange(e)}
                    />
                    <div className="form-group">
                        <label>Trạng thái</label>
                        <select
                            name="status"
                            value={formValue.status || ""}
                            onChange={e => handleChange(e)}
                            className="form-control"
                        >
                            <option value="" disabled hidden>Chọn trạng thái</option>
                            {statuses.map((opts, index) => (
                                <option key={index} value={opts.label}>{opts.label}</option>
                            ))}
                        </select>
                    </div>
                    <FormInput
                        type="date"
                        name="createDate"
                        label="Thời gian tạo"
                        disabled={isEditing}
                        value={formValue.createDate || ""}
                        onChange={e => handleChange(e)}
                    />
                    <FormInput
                        type="date"
                        name="updateDate"
                        label="Thời gian cập nhật"
                        value={formValue.updateDate || ""}
                        onChange={e => handleChange(e)}
                    />
                    <button type="submit" className="btn btn-primary">
                        {isEditing ? "Cập nhật" : "Thêm mới"}
                    </button>
                </form>
            </div>
        </div>
    </div>
);

export default DepartmentForm;