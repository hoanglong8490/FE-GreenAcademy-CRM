import React, {useEffect, useState} from "react";
import {liabilityFields, studentFields} from "./Field";
import Button from "react-bootstrap/Button";
import {fetch_option_Liability} from "../service/LiabilityService.";
import {formatDate} from "./DateLiability";


const ModalCreateUpdate = ({liability, isNew, onSave}) => {
    const [statusOptions, setStatusOptions] = useState([]);
    const [formValue, setFormValue] = useState({
        student_Id: '',
        student_name: '',
        address: '',
        email: '',
        phone_Number: '',
        debt: '',
        period_debt: '',
        status: '',
        course_id: '',
        personnel_id: '',
        note: '',
        create_date: '',
        update_date: ''
    })
    useEffect(() => {
        const get_Status = async () => {
            const options = await fetch_option_Liability();
            setStatusOptions(options || []);
        };
        get_Status();

        if (!isNew && liability) {
            const createDateISO = formatDate(liability.createDate);
            const updateDateISO = formatDate(liability.updateDate);
            const periodDebtISO = formatDate(liability.period_debt);
            setFormValue({
                ...liability,
                create_date: createDateISO,
                update_date: updateDateISO,
                period_debt: periodDebtISO
            });
        } else if (isNew) {
            setFormValue({
                student_Id: '',
                student_name: '',
                address: '',
                email: '',
                phone_Number: '',
                debt: '',
                period_debt: '',
                status: '',
                course_id: '',
                personnel_id: '',
                note: '',
                create_date: '',
                update_date: ''
            });
        }
    }, [liability, isNew]);
    const handleChange = (e) => {
        const {id, value} = e.target;
        setFormValue((prev) => ({...prev, [id]: value}));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const createDateISO = formatDate(formValue.create_date);
        const updateDateISO = formatDate(formValue.update_date);
        const periodDebtISO = formatDate(formValue.period_debt);
        const formattedLiability = {
            ...formValue,
            create_date: createDateISO,
            update_date: updateDateISO,
            period_debt: periodDebtISO
        };

        if (onSave) {
            onSave(formattedLiability);
        }
    };

    const renderFields = (fields) => {
        return fields.map((field, index) => {
            return (
                <div className="form-group title_info" key={index}>
                    <label htmlFor={field.id} className="title_Student">{field.label}</label>
                    {field.type === 'select' ? (
                        <select
                            id={field.id}
                            className="form-control"
                            value={formValue[field.id] || ""}
                            onChange={handleChange}
                        >
                            <option value="">Chọn trạng thái</option>
                            {
                                statusOptions.map((option, index) => {
                                    return <option key={index} value={option.name}>
                                        {option.name}
                                    </option>
                                })
                            }
                        </select>
                    ) : (
                        <input
                            type={field.type}
                            id={field.id}
                            className="form-control"
                            value={formValue[field.id] || ""}
                            onChange={handleChange}
                        />
                    )}
                </div>
            )
        });
    }
    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="card col-6">
                            <h5 className="info_Student">Thông tin học viên</h5>
                            <div className="list_info_Student">
                                {renderFields(studentFields)}
                            </div>
                        </div>
                        <div className="card col-6">
                            <h5 className="info_Liability">Học phí phải trả</h5>
                            <div className="list_info_Liability">
                                {renderFields(liabilityFields)}
                            </div>
                        </div>
                    </div>
                    <Button type="submit" className="btn-primary">{isNew ? 'Thêm mới' : 'Cập nhật'}</Button>
                </form>

            </div>
        </>
    )
}
export default ModalCreateUpdate;

