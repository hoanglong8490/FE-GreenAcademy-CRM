import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import InputComponents from "../../../components/InputComponents";
import ButtonComponents from "../../../components/ButtonComponents";
import moment from 'moment';

const ContractEditComponents = ({ show, handleClose, contract, onSave }) => {
  const [formData, setFormData] = useState({
    id: "",
    employeeCode: "",
    contractCode: "",
    contractCategory: "",
    salary: "",
    dateStart: "",
    dateEnd: "",
    status: 1,
    contentContract: "", 
    updateAt: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (contract) {
      // Convert date format to YYYY-MM-DD
      const formatDate = (dateStr) => {
        return moment(dateStr, 'DD/MM/YYYY').format('YYYY-MM-DD');
      };

      setFormData({
        id: contract.id || "",
        employeeCode: contract.employeeCode || "",
        contractCode: contract.contractCode || "",
        contractCategory: contract.contractCategory || "",
        salary: contract.salary || "",
        dateStart: contract.dateStart ? formatDate(contract.dateStart) : "", // Convert to YYYY-MM-DD
        dateEnd: contract.dateEnd ? formatDate(contract.dateEnd) : "", // Convert to YYYY-MM-DD
        status: contract.status || 0,
        contentContract: contract.contentContract || "",
        updateAt: contract.updateAt || "",
      });
    }
  }, [contract]);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === "file") {
      const fileList = Array.from(files).map(file => file.name).join(",");
      setFormData({
        ...formData,
        [name]: fileList,
      });
    } else if (name === "status") {
      setFormData({
        ...formData,
        [name]: value === "true",
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    const errors = validateFormEdit();

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      const updatedContract = {
        ...formData,
        updated_at: new Date().toISOString(),
      };
      onSave(updatedContract);
      handleClose();
      setErrors({});
    }
  };

  const validateFormEdit = () => {
    const newErrors = {};

    if (!formData.contractCategory) {
      newErrors.contractCategory = "Loại hợp đồng không được để trống";
    }
    if (!formData.salary || parseFloat(formData.salary) <= 0) {
      newErrors.salary = "Mức lương không hợp lệ";
    }

    return newErrors;
  };

  const contentList = formData.contentContract ? formData.contentContract.split(',') : [];

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      dialogClassName="custom-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa hợp đồng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <InputComponents
                  label="Mã nhân viên"
                  type="text"
                  name="employeeCode"
                  value={formData.employeeCode}
                  onChange={handleChange}
                  placeholder=""
                  disabled
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <InputComponents
                  label="Mã hợp đồng"
                  type="text"
                  onChange={handleChange}
                  name="contractCode"
                  value={formData.contractCode}
                  placeholder=""
                  disabled
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Loại hợp đồng</label>
                <select
                  name="contractCategory"
                  value={formData.contractCategory}
                  onChange={handleChange}
                  className="form-control"
                >
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
            <div className="col-md-6">
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
                      salary: parseFloat(value),
                    });
                  }}
                />
                {errors.salary && (
                  <div className="text-danger">{errors.salary}</div>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <InputComponents
                  label="Ngày bắt đầu"
                  type="date"
                  name="dateStart"
                  value={formData.dateStart}
                  onChange={handleChange}
                  placeholder=""
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <InputComponents
                  label="Ngày kết thúc"
                  type="date"
                  name="dateEnd"
                  value={formData.dateEnd}
                  onChange={handleChange}
                  placeholder=""
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Trạng thái</label>
                <select
                  name="status"
                  value={formData.status ? "true" : "false"}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="true">Active</option>
                  <option value="false">Disable</option>
                </select>
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-group">
                <label>Có {contentList.length} hồ sơ</label>
                {contentList.length > 0 && (
                  <ul className="list-group mt-2">
                    {contentList.map((file, index) => (
                      <li key={index} className="list-group-item">
                        {file}
                      </li>
                    ))}
                  </ul>
                )}
                <InputComponents
                  label="Hồ sơ hợp đồng (.doc, .pdf)"
                  type="file"
                  name="description"
                  onChange={handleChange}
                  multiple
                  accept=".doc,.pdf"
                />
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <ButtonComponents
          className="custom-button btn btn-danger"
          variant="secondary"
          onClick={handleClose}
        >
          Đóng
        </ButtonComponents>
        <ButtonComponents
          className="custom-button btn btn-success"
          variant="primary"
          onClick={handleSave}
        >
          Lưu thay đổi
        </ButtonComponents>
      </Modal.Footer>
    </Modal>
  );
};

export default ContractEditComponents;
