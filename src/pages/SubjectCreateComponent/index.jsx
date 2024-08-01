import React, {useEffect, useState} from "react";
import FormComponent from "../../components/FormComponent";

const SubjectCreateComponent = ({formFieldsProp, initialIsEdit, initialIdCurrent}) => {
    const [isEdit, setIsEdit] = useState(initialIsEdit || false);
    const [idCurrent, setIdCurrent] = useState(initialIdCurrent || 17);

    useEffect(() => {
        if (isEdit && idCurrent !== null) {
            setIdCurrent(initialIdCurrent);
            setIsEdit(false);
        }
    }, []);
    const handleSave = (formData) => {
        console.log("Saving data in SubjectCreate...");
        console.log("Form data:", JSON.stringify(formData));
        // Your save logic here
    };

    return (
        <div>
            <FormComponent
                fields={formFieldsProp}
                onSubmit={handleSave}
                isEdit={true}
                idCurrent={idCurrent}
            />
        </div>
    );
};

export default SubjectCreateComponent;
