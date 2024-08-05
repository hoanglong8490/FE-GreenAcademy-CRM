// src/components/FormInputComponents.js
import React from 'react';
import PropTypes from 'prop-types';

<<<<<<< HEAD
const FormInput = ({ label, type = 'text', name, value, onChange, placeholder = '', disabled, error = '' }) => {
=======
const FormInput = ({
                       label,
                       type = 'text',
                       name,
                       value,
                       onChange,
                       placeholder = '',
                       error = ''
                   }) => {
>>>>>>> crm-hr-fix
    return (
        <div className="form-group">
            <label>{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className={`form-control ${error ? 'is-invalid' : ''}`}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

FormInput.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    error: PropTypes.string
};

<<<<<<< HEAD
// FormInput.defaultProps = {
//     type: 'text',
//     placeholder: '',
//     error: ''
// };

=======
>>>>>>> crm-hr-fix
export default FormInput;
