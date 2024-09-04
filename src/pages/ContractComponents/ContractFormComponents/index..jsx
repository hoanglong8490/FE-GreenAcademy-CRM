import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import InputComponents from "../../../components/InputComponents";
import { fetchPersons } from "../ContractService/contractService";

// Component để thêm hợp đồng mới
const ContractForm = ({ onSubmit, contracts }) => {
  const [formData, setFormData] = useState({
    contractCode: "",
    contractCategory: "",
    dateStart: "",
    dateEnd: "",
    salary: "",
    contentContract: [],
    employee_id: "",
    created_at: "",
    updated_at: "",
  });

  const [errors, setErrors] = useState({});
  const [persons, setPersons] = useState([]);

  // useEffect để thiết lập thời gian hiện tại khi form được tải
  useEffect(() => {
    const now = new Date().toISOString().slice(0, 16);
    setFormData((prevState) => ({
      ...prevState,
      created_at: now,
      updated_at: now,
    }));

    // Gọi API để lấy danh sách nhân sự
    const loadPersons = async () => {
      try {
        const personsData = await fetchPersons();
        setPersons(personsData);
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy danh sách nhân sự!", error);
      }
    };

    loadPersons();
  }, []);

  // Hàm xử lý thay đổi dữ liệu form
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const now = new Date().toISOString().slice(0, 16);
    if (name === "description" && files) {
      setFormData({
        ...formData,
        [name]: Array.from(files).map((file) => file.name),
        updated_at: now,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
        updated_at: now,
      });
    }
  };

  // Hàm kiểm tra dữ liệu form
  const validate = () => {
    const newErrors = {};

    //  Kiểm tra mã hợp đồng
    if (!formData.contractCode) {
      newErrors.contractCode = "Mã hợp đồng không được để trống";
    } else if (formData.contractCode.length !== 7) {
      newErrors.contractCode = "Mã hợp đồng phải là 7 ký tự";
    } else if (
      contracts.some(
        (contract) => contract.contractCode === formData.contractCode,
      )
    ) {
      newErrors.contractCode = "Mã hợp đồng đã tồn tại";
    }

    // Kiểm tra mã nhân viên
    if (!formData.employee_id) {
      newErrors.employee_id = "Mã nhân viên không được để trống";
    } else if (!persons.some((person) => person.employee_code === formData.employee_id)) {
      newErrors.employee_id = "Mã nhân viên không tồn tại trong hệ thống";
    }

    // Kiểm tra loại hợp đồng
    if (!formData.contractCategory)
      newErrors.contractCategory = "Loại hợp đồng không được để trống";

    // Kiểm tra mức lương
    if (
      !formData.salary ||
      isNaN(Number(formData.salary.replace(/\./g, ""))) ||
      Number(formData.salary.replace(/\./g, "")) <= 0
    )
      newErrors.salary = "Mức lương phải là số dương";

    // Kiểm tra ngày bắt đầu
    if (!formData.dateStart)
      newErrors.dateStart = "Ngày bắt đầu không được để trống";
    // Kiểm tra ngày kết thúc
    if (!formData.dateEnd)
      newErrors.dateEnd = "Ngày kết thúc không được để trống";
    if (new Date(formData.dateStart) > new Date(formData.dateEnd))
      newErrors.dateEnd = "Ngày kết thúc phải sau ngày bắt đầu";

    return newErrors;
  };

  // Hàm xử lý khi form được submit
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
      const now = new Date().toISOString().slice(0, 16);
      setFormData({
        contractCode: "",
        contractCategory: "",
        salary: "",
        dateStart: "",
        dateEnd: "",
        contentContract: [],
        employee_id: "",
        created_at: now,
        updated_at: now,
      });
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label>Mã hợp đồng</label>
              <InputComponents
                type="text"
                name="contractCode"
                value={formData.contractCode}
                onChange={handleChange}
                disabled={false}
              />
              {errors.contractCode && (
                <div className="text-danger">{errors.contractCode}</div>
              )}
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label>Mã nhân viên</label>
              <InputComponents
                type="text"
                name="employee_id"
                value={formData.employee_id}
                onChange={handleChange}
                disabled={false}
              />
              {errors.employee_id && (
                <div className="text-danger">{errors.employee_id}</div>
              )}
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label>Loại hợp đồng</label>
              <select
                name="contractCategory"
                value={formData.contractCategory}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">-- Chọn loại hợp đồng --</option>
                <option value="fulltime">Hợp đồng lao động chính thức</option>
                <option value="parttime">Hợp đồng lao động parttime</option>
                <option value="freelance">Hợp đồng Freelance</option>
                <option value="probationary">Hợp đồng thử việc</option>
                <option value="intern">Hợp đồng thực tập</option>
              </select>
              {errors.contractCategory && (
                <div className="text-danger">{errors.contractCategory}</div>
              )}
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label>Mức lương</label>
              <NumericFormat
                className="form-control"
                name="salary"
                value={formData.salary}
                thousandSeparator="."
                decimalSeparator=","
                onValueChange={(values) => {
                  const { value } = values;
                  setFormData({
                    ...formData,
                    salary: value,
                    updated_at: new Date().toISOString().slice(0, 16),
                  });
                }}
              />
              {errors.salary && (
                <div className="text-danger">{errors.salary}</div>
              )}
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label>Ngày bắt đầu</label>
              <InputComponents
                type="date"
                name="dateStart"
                value={formData.dateStart}
                onChange={handleChange}
              />
              {errors.dateStart && (
                <div className="text-danger">{errors.dateStart}</div>
              )}
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label>Ngày kết thúc</label>
              <InputComponents
                type="date"
                name="dateEnd"
                value={formData.dateEnd}
                onChange={handleChange}
              />
              {errors.dateEnd && (
                <div className="text-danger">{errors.dateEnd}</div>
              )}
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label>Hồ sơ hợp đồng</label>
              <InputComponents
                type="file"
                name="contentContract"
                onChange={handleChange}
                className="form-control"
                multiple // Cho phép chọn nhiều tệp tin
                accept=".doc,.docx,.pdf"
              />
              {formData.contentContract.length > 0 && (
                <ul className="list-group mt-2">
                  {formData.contentContract.map((fileName, index) => (
                    <li key={index} className="list-group-item">
                      {fileName}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <button type="submit" className="btn btn-primary">
              Thêm hợp đồng
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ContractForm;
