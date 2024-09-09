import React, { useState } from 'react';
import FormInput from '../../../components/FormInputComponents';

const QualificationForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    qualificationName : '',
    employeeName: '',
    image: '',
    status: true,
    duration: '',
    id: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({
        ...formData,
        [name]: Array.from(files),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.qualificationName) {
      newErrors.qualificationName = 'Tên bằng cấp không được để trống';
    }

    if (!formData.employeeName) {
      newErrors.employeeName = 'Tên nhân viên không được để trống';
    }

    if (!formData.duration) {
      newErrors.duration = 'Thời hạn không được để trống';
    }

    if (!formData.image) {
      newErrors.image = 'Hình ảnh không được để trống';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      onSubmit({
        ...formData,
        status: true,
      });
      setFormData({
        qualificationName : '',
        employeeName: '',
        image: '',
        status: true,
        duration: '',
        id: '',
      });
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormInput
        label="Tên bằng cấp"
        type="text"
        name="qualificationName"
        value={formData.qualificationName}
        onChange={handleChange}
        error={errors.qualificationName}
      />
      <div className="form-group">
        <label>Tên nhân viên</label>
        <select
          name="employeeName"
          value={formData.employeeName}
          onChange={handleChange}
          className="form-control"
        >
          <option value="">-- Chọn nhân viên --</option>
          <option value="Nguyen Van A">Nguyen Van A</option>
          <option value="Le Van B">Le Van B</option>
          <option value="Tran Van C">Tran Van C</option>
        </select>
        {errors.employeeName && <div className="text-danger">{errors.employeeName}</div>}
      </div>

      <FormInput
        label="Thời hạn"
        type="date"
        name="duration"
        value={formData.duration}
        onChange={handleChange}
        error={errors.duration}
      />

      <div className="form-group">
        <label>Image</label>
        <input
          type="file"
          name="image"
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

      <button type="submit" className="btn btn-primary">Thêm bằng cấp</button>
    </form>
  );
};

export default QualificationForm;
