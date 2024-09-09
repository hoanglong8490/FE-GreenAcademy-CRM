import React, {useState} from 'react';
import '../Qualification.scss';
import {CSVLink} from "react-csv";
import SearchComponents from "../../../components/SearchComponents";
import ButtonComponents from "../../../components/ButtonComponents";

const QualificationTitleComponents = ({qualification, onSearch}) => {
    const [dataExport, setDataExport] = useState([]);
    const [statusFilter, setStatusFilter] = useState('');

    const handleSearch = (searchTerm) => {
        const searchValue = searchTerm.toLowerCase();

        const filteredQualification = qualification.filter(item => {
            const qualificationName = item.qualificationName ? item.qualificationName : '';
            const employeeName = item.employeeName ? item.employeeName : '';
            const duration = item.duration ? item.duration : '';
            const image = item.image ? item.image : '';
            const status = item.status ? (item.status ? 'active' : 'inactive') : '';

            return (
                qualificationName.includes(searchValue) ||
                employeeName.includes(searchValue) ||
                duration.includes(searchValue) ||
                image.includes(searchValue) ||
                status.includes(searchValue)
            );
        });

        onSearch(filteredQualification);
    };

    const handleImportClick = () => {
        document.getElementById('import').click();
    };

    const getQualificationExport = (even, done) => {
        let result = [];
        if (qualification && qualification.length > 0) {
            result.push(["Tên bằng cấp", "Tên nhân viên", "Thời hạn", "Trạng thái"]);
            qualification.map((item) => {
                let arr = [];
                arr[0] = item.qualification;
                arr[1] = item.employeeName;
                arr[2] = item.duration;
                arr[3] = item.status;
                result.push(arr);
            });
            setDataExport(result);
            done();
        }
    };


    return (
        <div className="row position-tittle d-flex justify-content-between align-items-center">
            <div className="col-sm-6">
                <h2>DANH SÁCH BẰNG CẤP</h2>
            </div>
            <div className="action-button col-sm-6 d-flex justify-content-end align-items-center">
                <select
                    style={{
                        width: "130px",
                        padding: "8px"
                    }}
                    className="form-select form-select-sm"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>

                <SearchComponents onSearch={handleSearch}/>
                <ButtonComponents
                    className='btn btn-success align-items-center'
                    onClick={handleImportClick}
                >
                    <i className="fas fa-file-excel"></i>
                </ButtonComponents>

                <input id='import' type='file' hidden/>

                <CSVLink
                    data={dataExport}
                    asyncOnClick={true}
                    onClick={getQualificationExport}
                    filename={"List-Position.csv"}
                    className="btn btn-danger align-items-center"
                >
                    <i className="fas fa-file-export"></i>
                </CSVLink>
            </div>
        </div>
    );
};

export default QualificationTitleComponents;