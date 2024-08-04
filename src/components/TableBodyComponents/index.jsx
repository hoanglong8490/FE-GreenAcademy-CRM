// src/components/TableBody.js
import React from 'react';
import PropTypes from 'prop-types';

const TableBodyComponents = ({ rows }) => {
    const handleActionClick = (action, item) => {
        if (action.onClick) {
            action.onClick(item); // Đảm bảo rằng item được truyền đúng
        }
    };

    return (
        <>
            {rows.map((row, index) => (
                <tr key={index}>
                    {row.data.map((cell, cellIndex) => (
                        <td key={cellIndex}>{cell}</td>
                    ))}
                    <td>
                        {row.actions.map((action, actionIndex) => (
                            <button
                                type="button"
                                className={`btn ${action.className}`}
                                key={actionIndex}
                                onClick={() => handleActionClick(action, row)}
                            >
                                <i className={`fas ${action.icon}`}></i>
                            </button>
                        ))}
                    </td>
                </tr>
            ))}
        </>
    );
};

TableBodyComponents.propTypes = {
    rows: PropTypes.arrayOf(
        PropTypes.shape({
            data: PropTypes.arrayOf(PropTypes.string).isRequired,
            actions: PropTypes.arrayOf(
                PropTypes.shape({
                    className: PropTypes.string.isRequired,
                    icon: PropTypes.string.isRequired,
                    onClick: PropTypes.func // Xử lý sự kiện nhấp chuột
                })
            ).isRequired
        })
    ).isRequired
};

export default TableBodyComponents;
