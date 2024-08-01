import FormComponent from "../../components/FormComponent";
import axios from "axios";
import {useEffect, useState} from "react";

const SubjectCreateComponent = () => {
    const [isEdit, setIsEdit] = useState(true)
    const [idCurrent, setIdCurrent] = useState(1)
    const handleSubmit = (formData) => {
        console.log('Form submitted with data:', formData);
        axios.post('https://66aa0b5b613eced4eba7559a.mockapi.io/subject', formData)
            .then((res) => {
                console.log(res.data)
            })
    };
    const handleEdit = (formData) => {
        console.log('Form submitted with data:', formData);
        const id = formData.id
        axios.put(`https://66aa0b5b613eced4eba7559a.mockapi.io/subject/${id}`, formData)
            .then((res) => {
                    console.log('Update' + res.data)
                }
            ).catch(() => {
                console.log(formData)
                console.log('Error Edit')
            }
        )
    }

    useEffect(() => {
        setIdCurrent(17);
        setIsEdit(false);
    }, []);

    const formFields = [
        {
            name: 'name',
            type: 'text',
            label: 'Name',
            placeholder: 'Enter your name',
        },
        // {
        //     name: 'dateOfBirth',
        //     type: 'date',
        //     label: 'Date of Birth',
        // },
        // {
        //     name: 'age',
        //     type: 'number',
        //     label: 'Age',
        //     placeholder: 'Enter your age',
        // },
        // {
        //     name: 'role',
        //     type: 'select',
        //     label: 'Role',
        //     apiUrl: '/data/status.json',// API URL for fetching roles
        //     defaultOption: {value: '', label: 'Select a role'},
        // },
    ];

    return (
        <div>
            <h1>My Form</h1>
            <FormComponent fields={formFields} onSubmit={isEdit ? handleEdit : handleSubmit} isEdit={isEdit}
                           idCurrent={idCurrent}/>
        </div>
    );
};

export default SubjectCreateComponent;
