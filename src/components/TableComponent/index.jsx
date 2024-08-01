import React from 'react';
import {Button} from "react-bootstrap";

function TableComponents({cols, titleTable, dataTable, classTable}) {
    return (
        <>
            <h2>{titleTable}</h2>
            <table className={classTable}>
                <thead>
                <tr>
                    {Array.isArray(cols) && cols.map((col, index) => (
                        <th key={index}>{col}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {dataTable.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {Object.values(row).map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                        ))}
                        <td className="text-center">
                            <Button variant="light" className="me-2">View</Button>
                            <Button variant="primary" className="me-2">Edit</Button>
                            <Button variant="danger">Delete</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}

export default TableComponents;
