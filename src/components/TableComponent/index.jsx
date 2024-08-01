import React from "react";

function TableComponents({ cols, dataTable, classTable }) {
  return (
    <>
      <table className={classTable}>
        <thead>
          <tr>
            {Array.isArray(cols) &&
              cols.map((col, index) => <th key={index}>{col}</th>)}
          </tr>
        </thead>
        <tbody>
          {dataTable.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(row).map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default TableComponents;
