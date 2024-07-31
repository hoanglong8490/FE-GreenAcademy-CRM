import {useState} from 'react';
import PropTypes from 'prop-types';
import SelectDropdown from "../SelectDownButton";

function FormComponent({fields, onSubmit}) {
    const [formData, setFormData] = useState(
        fields.reduce((acc, field) => ({...acc, [field.name]: ''}), {})
    );

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            {fields.map((field) => {
                switch (field.type) {
                    case 'text':
                        return (
                            <div key={field.name} className="form-group">
                                <label htmlFor={field.name}>{field.label}</label>
                                <input
                                    type="text"
                                    id={field.name}
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    placeholder={field.placeholder}
                                />
                            </div>
                        );
                    case 'select':
                        return (
                            <SelectDropdown
                                key={field.name}
                                id={field.name}
                                apiUrl={field.apiUrl}
                                label={field.label}
                                defaultOption={field.defaultOption}
                                onChange={(e) => handleChange(e)}
                            />
                        );
                    case 'date':
                        return (
                            <div key={field.name} className="form-group">
                                <label htmlFor={field.name}>{field.label}</label>
                                <input
                                    type="date"
                                    id={field.name}
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                />
                            </div>
                        );
                    case 'number':
                        return (
                            <div key={field.name} className="form-group">
                                <label htmlFor={field.name}>{field.label}</label>
                                <input
                                    type="number"
                                    id={field.name}
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    placeholder={field.placeholder}
                                />
                            </div>
                        );
                    default:
                        return null;
                }
            })}
            <button type="submit">Submit</button>
        </form>
    );
}

FormComponent.propTypes = {
    fields: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            type: PropTypes.oneOf(['text', 'select', 'date', 'number']).isRequired,
            label: PropTypes.string.isRequired,
            placeholder: PropTypes.string,
            apiUrl: PropTypes.string,  // Add apiUrl for select fields
            defaultOption: PropTypes.shape({
                value: PropTypes.string.isRequired,
                label: PropTypes.string,
            }),  // Add defaultOption for select fields
        })
    ).isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default FormComponent;
