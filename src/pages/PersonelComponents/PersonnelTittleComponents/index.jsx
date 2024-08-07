import React from 'react';
import '../Personnel.scss';
import { CSVLink } from "react-csv";
import SearchComponents from "../../../components/SearchComponents";
import ButtonComponents from "../../../components/ButtonComponents";

const PersonnelTittleComponents = ({ personnels = [], onSearch }) => { // Đảm bảo personnels là một mảng mặc định
    const handleSearch = (searchTerm) => {
        const searchValue = searchTerm.toLowerCase();

        const filteredpersonnels = personnels.filter(personnel => {
            const employeeId = personnel.employeeId ? personnel.employeeId.toLowerCase() : '';
            const employeeName = personnel.employeeName ? personnel.employeeName.toLowerCase() : '';
            const positionName = personnel.positionName ? personnel.positionName.toString().toLowerCase() : '';
            const email = personnel.email ? personnel.email.toLowerCase() : '';
            const phoneNumber = personnel.phoneNumber ? personnel.phoneNumber.toLowerCase() : '';
            const status = personnel.status ? (personnel.status ? 'active' : 'inactive') : '';
            const CCCD = personnel.CCCD ? personnel.CCCD.toLowerCase() : '';
            return (
                employeeId.includes(searchValue) ||
                employeeName.includes(searchValue) ||
                positionName.includes(searchValue) ||
                email.includes(searchValue) ||
                phoneNumber.includes(searchValue) ||
                status.includes(searchValue) ||
                CCCD.includes(searchValue)
            );
        });

        onSearch(filteredpersonnels);
    };

    const handleImportClick = () => {
        document.getElementById('import').click();
    };

    console.log(personnels); // Thêm dòng này để kiểm tra cấu trúc của mảng personnels

    // Kiểm tra và định dạng lại dữ liệu nếu cần thiết
    const formattedPersonnels = Array.isArray(personnels) ? personnels.map(personnel => ({
        employeeId: personnel.employeeId,
        employeeName: personnel.employeeName,
        positionName: personnel.positionName,
        email: personnel.email,
        phoneNumber: personnel.phoneNumber,
        status: personnel.status ? 'active' : 'inactive',
        CCCD: personnel.CCCD
    })) : [];

    return (
        <div className="row personnel-tittle d-flex justify-content-between align-items-center">
            <div className="col-sm-6">
                <h2>DANH SÁCH NHÂN VIÊN</h2>
            </div>
            <div className="action-button col-sm-6 d-flex justify-content-end align-items-center">
                <SearchComponents onSearch={handleSearch} />
                <ButtonComponents
                    className='btn btn-danger d-flex align-items-center'
                    onClick={handleImportClick}
                >
                    <i className="fa fa-upload"></i>&nbsp;Import
                </ButtonComponents>
                <input id='import' type='file' hidden />

                <CSVLink
                    data={formattedPersonnels}
                    filename={"List-personnel.csv"}
                    className="btn btn-primary d-flex"
                >
                    <i className="fa fa-download"></i>&nbsp;Export
                </CSVLink>
            </div>
        </div>
    );
};

export default PersonnelTittleComponents;
