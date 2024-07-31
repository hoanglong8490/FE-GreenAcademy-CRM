import FormComponent from "../../components/FormComponent";

const SubjectCreateComponent = () => {
    const handleSubmit = (formData) => {
        console.log('Form submitted with data:', formData);
    };

    const formFields = [
        {
            name: 'name',
            type: 'text',
            label: 'Name',
            placeholder: 'Enter your name',
        },
        {
            name: 'dateOfBirth',
            type: 'date',
            label: 'Date of Birth',
        },
        {
            name: 'age',
            type: 'number',
            label: 'Age',
            placeholder: 'Enter your age',
        },
        {
            name: 'role',
            type: 'select',
            label: 'Role',
            apiUrl: '/data/status.json',// API URL for fetching roles
            defaultOption: {value: '', label: 'Select a role'},
        },
    ];

    return (
        <div>
            <h1>My Form</h1>
            <FormComponent fields={formFields} onSubmit={handleSubmit}/>
        </div>
    );
};

export default SubjectCreateComponent;
