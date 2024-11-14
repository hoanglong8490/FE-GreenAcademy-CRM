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
    contentContract: "",
    employeeCode: "",
    createAt: "",
    updateAt: "",
  });

  const [errors, setErrors] = useState({});
  const [persons, setPersons] = useState([]);

  // useEffect để thiết lập thời gian hiện tại khi form được tải
  useEffect(() => {
    const now = new Date().toISOString().slice(0, 16);
    setFormData((prevState) => ({
      ...prevState,
      createAt: now,
      updateAt: now,
    }));

    // Gọi API để lấy danh sách nhân sự
    const loadPersons = async () => {
      try {
        const personsData = await fetchPersons();
        console.log(personsData);
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
    if (name === "contentContract" && files) {
      setFormData({
        ...formData,
        [name]: Array.from(files).map((file) => file.name).join(", "),
        updateAt: now,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
        updateAt: now,
      });
    }
  };

  // Hàm kiểm tra dữ liệu form
  const validate = () => {
    const newErrors = {};

    // Kiểm tra mã hợp đồng
    if (!formData.contractCode) {
      newErrors.contractCode = "Mã hợp đồng không được để trống";
    } else if (formData.contractCode.length !== 7) {
      newErrors.contractCode = "Mã hợp đồng phải là 7 ký tự";
    } else if (
        contracts.some(
            (contract) => contract.contractCode === formData.contractCode
        )
    ) {
      newErrors.contractCode = "Mã hợp đồng đã tồn tại";
    }

    // Kiểm tra mã nhân viên
    if (!formData.employeeCode) {
      newErrors.employeeCode = "Mã nhân viên không được để trống";
    } else if (
        !persons.some(
            (person) =>
                person.employeeCode.trim().toUpperCase() === formData.employeeCode.trim().toUpperCase()
        )
    ) {
      newErrors.employeeCode = "Mã nhân viên không tồn tại trong hệ thống";
    }

    // Kiểm tra loại hợp đồng
    if (!formData.contractCategory || formData.contractCategory.length === 0) {
      newErrors.contractCategory = "Loại hợp đồng không được để trống";
    }

    // Kiểm tra mức lương
    const salary = Number(formData.salary.replace(/\./g, ""));
    if (!formData.salary || isNaN(salary) || salary <= 0) {
      newErrors.salary = "Mức lương phải là số dương";
    }

    // Kiểm tra ngày bắt đầu
    if (!formData.dateStart) {
      newErrors.dateStart = "Ngày bắt đầu không được để trống";
    } else if (isNaN(new Date(formData.dateStart).getTime())) {
      newErrors.dateStart = "Ngày bắt đầu không hợp lệ";
    }

    // Kiểm tra ngày kết thúc
    if (!formData.dateEnd) {
      newErrors.dateEnd = "Ngày kết thúc không được để trống";
    } else if (isNaN(new Date(formData.dateEnd).getTime())) {
      newErrors.dateEnd = "Ngày kết thúc không hợp lệ";
    } else if (new Date(formData.dateStart) > new Date(formData.dateEnd)) {
      newErrors.dateEnd = "Ngày kết thúc phải sau ngày bắt đầu";
    }

    return newErrors;
  };


  // Set id tự tăng: 
    const generateNewId = () => {
      const lastContract = contracts[contracts.length - 1];
      if (lastContract && lastContract.id) {
        return lastContract.id + 1; // Tăng id cuối cùng lên 1
      }
      return 1; // Nếu danh sách trống, bắt đầu từ id 1
    };

  // Hàm xử lý khi form được submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const newId = generateNewId(); // Tạo id tự động
      onSubmit({
        ...formData,
        id: newId, // Thêm id tự động vào formData
        status: 1,
      });
      
      const now = new Date().toISOString().slice(0, 16);
      setFormData({
        contractCode: "",
        contractCategory: "",
        salary: "",
        dateStart: "",
        dateEnd: "",
        contentContract: "",
        employeeCode: "",
        createAt: now,
        updateAt: now,
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
                name="employeeCode"
                value={formData.employeeCode}
                onChange={handleChange}
                disabled={false}
              />
              {errors.employeeCode && (
                <div className="text-danger">{errors.employeeCode}</div>
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
                    updateAt: new Date().toISOString().slice(0, 16),
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
             {formData.contentContract && (
            <ul className="list-group mt-2">
              {typeof formData.contentContract === "string" && formData.contentContract.length > 0 ? (
                formData.contentContract.split(", ").map((fileName, index) => (
                  <li key={index} className="list-group-item">
                    {fileName}
                  </li>
                ))
              ) : (
                <li className="list-group-item">No files uploaded</li>
              )}
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
