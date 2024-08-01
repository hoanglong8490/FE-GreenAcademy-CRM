import React, {useEffect, useState} from "react";
import FormComponent from "../../components/FormComponent";

const SubjectCreateComponent = ({handleSubmit, formFieldsProp, initialIsEdit, initialIdCurrent, onSave}) => {
    const [isEdit, setIsEdit] = useState(initialIsEdit || false);
    const [idCurrent, setIdCurrent] = useState(initialIdCurrent || null);


    useEffect(() => {
        if (isEdit && idCurrent !== null) {
            setIdCurrent(initialIdCurrent);
            setIsEdit(false);
        }
    }, [isEdit, idCurrent]);

    return (
        <div>
            <h1>My Form</h1>
            <FormComponent
                fields={formFieldsProp}
                onSubmit={handleSubmit}
                isEdit={isEdit}
                idCurrent={idCurrent}
                onSave={onSave}
            />
        </div>
    );
};

export default SubjectCreateComponent;
