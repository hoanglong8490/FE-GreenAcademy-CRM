// src/components/Input.js
import React from 'react';
import PropTypes from 'prop-types';

const Input = ({type='text', name, value, onChange, placeholder=''}) => {
    return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="form-control"
        />
    );
};

Input.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string
};

// Input.defaultProps = {
//     type: 'text',
//     placeholder: ''
// };

export default Input;
