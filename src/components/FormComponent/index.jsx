import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import SelectDropdown from '../SelectDownButton';
import axios from 'axios';
import {Button, Col, Form, Row} from 'react-bootstrap';
import Input from '../InputComponents';

// Updated function signature
function FormComponent({fields, getData, action, idCurrent, onClose, api}) {
    const [formData, setFormData] = useState(
        fields.reduce((acc, field) => ({...acc, [field.name]: ''}), {})
    );

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (action === 'EDIT') {
                await axios.put(`${api}/${formData.id}`, formData);
                // toast.success("Update successful!", {position: toast.POSITION.TOP_RIGHT});
            } else if (action === 'CREATE') {
                await axios.post(api, formData);
                // toast.success("Creation successful!", {position: toast.POSITION.TOP_RIGHT});
            }
            onClose();
            getData();
        } catch (error) {
            console.error(`Error ${action.toLowerCase()} item:`, error);
            // toast.error(`Error ${actionModal.toLowerCase()} item`, {position: toast.POSITION.TOP_RIGHT});
        }

    };

    useEffect(() => {
        if (action === 'EDIT' || action === 'VIEW') {
            const url = `${api}/${idCurrent}`;
            axios.get(url)
                .then((res) => {
                    setFormData(res.data);
                })
                .catch((err) => {
                    console.error('Error fetching data:', err);
                });
        }
    }, [action, idCurrent, api]);

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                {fields.map((field) => {
                    switch (field.type) {
                        case 'text':
                            return (
                                <Col key={field.name} md={6} className="mb-3">
                                    <Form.Group controlId={field.name}>
                                        <Form.Label>{field.label}</Form.Label>
                                        <Input
                                            type="text"
                                            id={field.name}
                                            name={field.name}
                                            value={formData[field.name] || ''}
                                            onChange={handleChange}
                                            placeholder={field.placeholder}
                                            className="form-control"
                                            disabled={action === 'VIEW'}
                                        />
                                    </Form.Group>
                                </Col>
                            );
                        case 'select':
                            return (
                                <Col key={field.name} md={6} className="mb-3">
                                    <Form.Group controlId={field.name}>
                                        <SelectDropdown
                                            id={field.name}
                                            apiUrl={field.apiUrl}
                                            label={field.label}
                                            defaultOption={action === 'EDIT' || action === 'VIEW' ? {
                                                value: formData[field.name],
                                                label: formData[field.name]
                                            } : field.defaultOption}
                                            onChange={handleChange}
                                            disabled={action === 'VIEW'}
                                        />
                                    </Form.Group>
                                </Col>
                            );
                        case 'date':
                            return (
                                <Col key={field.name} md={6} className="mb-3">
                                    <Form.Group controlId={field.name}>
                                        <Form.Label>{field.label}</Form.Label>
                                        <Form.Control
                                            type="date"
                                            id={field.name}
                                            name={field.name}
                                            value={formData[field.name]}
                                            onChange={handleChange}
                                            disabled={action === 'VIEW'}
                                        />
                                    </Form.Group>
                                </Col>
                            );
                        case 'number':
                            return (
                                <Col key={field.name} md={6} className="mb-3">
                                    <Form.Group controlId={field.name}>
                                        <Form.Label>{field.label}</Form.Label>
                                        <Form.Control
                                            type="number"
                                            id={field.name}
                                            name={field.name}
                                            value={formData[field.name]}
                                            onChange={handleChange}
                                            placeholder={field.placeholder}
                                            disabled={action === 'VIEW'}
                                        />
                                    </Form.Group>
                                </Col>
                            );
                        default:
                            return null;
                    }
                })}
            </Row>
            <div className="d-flex justify-content-center">
                <Button variant="secondary" className="me-2" type="button" onClick={onClose}>Close</Button>
                {action === 'VIEW' ? <Button variant="primary" type="button">Edit</Button> :
                    <Button variant="primary" type="submit">Save Changes</Button>}
            </div>
        </Form>
    );
}

FormComponent.propTypes = {
    fields: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            type: PropTypes.oneOf(['text', 'select', 'date', 'number']).isRequired,
            label: PropTypes.string.isRequired,
            placeholder: PropTypes.string,
            apiUrl: PropTypes.string, // Added for select fields
            defaultOption: PropTypes.shape({
                value: PropTypes.string.isRequired,
                label: PropTypes.string,
            }), // Added for select fields
        })
    ).isRequired,
    getData: PropTypes.func.isRequired,
    action: PropTypes.oneOf(['CREATE', 'EDIT', 'VIEW']).isRequired,
    idCurrent: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    onClose: PropTypes.func.isRequired,
    api: PropTypes.string.isRequired,
};

export default FormComponent;
