// src/components/Input.js
import React from 'react';
import PropTypes from 'prop-types';

const InputComponents = ({type = 'text', name, value, onChange, placeholder = '', icon}) => {
    return (
        <div className="input-group">
            {icon && <span className="input-group-text">{icon}</span>}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="form-control"
            />
        </div>
    );
};

InputComponents.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    icon: PropTypes.node // thêm prop icon để nhận component React
};
// Example :
// return (
//     <InputComponents
//         type="text"
//         name="username"
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//         placeholder="Enter your username"
//         icon={<FontAwesomeIcon icon={faUser} />}
//     />
// );


export default InputComponents;

