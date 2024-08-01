import FormComponent from "../../components/FormComponent";
import axios from "axios";
import {useEffect, useState} from "react";

const SubjectCreateComponent = ({apiCreate, apiUpdate, formFieldsProp, initialIsEdit, initialIdCurrent}) => {
    const [isEdit, setIsEdit] = useState(initialIsEdit || false);
    const [idCurrent, setIdCurrent] = useState(initialIdCurrent || null);

    const handleSubmit = (formData) => {
        console.log('Form submitted with data:', formData);
        axios.post(apiCreate, formData)
            .then((res) => {
                console.log(res.data);
            });
    };

    const handleEdit = (formData) => {
        console.log('Form submitted with data:', formData);
        const id = formData.id;
        axios.put(`${apiUpdate}/${id}`, formData)
            .then((res) => {
                console.log('Update' + res.data);
            })
            .catch(() => {
                console.log(formData);
                console.log('Error Edit');
            });
    };

    useEffect(() => {
        setIdCurrent(17);
        setIsEdit(false);
    }, []);

    return (
        <div>
            <h1>My Form</h1>
            <FormComponent
                fields={formFieldsProp}
                onSubmit={isEdit ? handleEdit : handleSubmit}
                isEdit={isEdit}
                idCurrent={idCurrent}
            />
        </div>
    );
};

export default SubjectCreateComponent;
