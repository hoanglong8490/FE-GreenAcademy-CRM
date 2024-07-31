import React, {useEffect, useState} from 'react';
import TableComponents from '../../components/TableComponent';
import SelectDropdown from "../../components/SelectDownButton";
import PagingComponent from "../../components/PagingComponent";

const SubjectComponent = () => {
    const [cols, setCols] = useState([]);
    const [dataTable, setDataTable] = useState([]);
    const [titleTable, setTitleTable] = useState('');
    const [classTable, setClassTable] = useState('');

    //BEGIN- GetData
    const getData = () => {
        setCols(['Mã môn học', 'Tên môn học', 'Thời lượng', 'Tên chương trình học', 'Trạng thái']);
        setDataTable([
            {id: 1, name: 'Mathematics', duration: '45 hours', programName: 'STEM', status: 'Active'},
            {id: 2, name: 'Physics', duration: '30 hours', programName: 'STEM', status: 'Inactive'},
            {id: 3, name: 'Chemistry', duration: '40 hours', programName: 'Science', status: 'Active'},
            {id: 4, name: 'Biology', duration: '35 hours', programName: 'Science', status: 'Active'},
            {id: 5, name: 'History', duration: '25 hours', programName: 'Arts', status: 'Inactive'},
            {id: 6, name: 'Geography', duration: '20 hours', programName: 'Arts', status: 'Active'},
            {id: 7, name: 'Computer Science', duration: '50 hours', programName: 'STEM', status: 'Active'},
        ]);
        setTitleTable('SubjectComponent')
        setClassTable('table table-bordered table-hover')
    };

    useEffect(() => {
        getData();
    }, []);
    //END - Get Data

    return (
        <>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Quản lý Môn học</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Quản lý môn học</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col">
                            <div className="card card-primary">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <SelectDropdown
                                                id="programStatus"
                                                // label="Trạng thái"
                                                defaultOption={{value: '', label: 'Chọn trạng thái'}}
                                                apiUrl="/data/status.json"
                                            />
                                        </div>
                                    </div>
                                    <TableComponents cols={cols} dataTable={dataTable} classTable={classTable}/>
                                    <div className="row justify-content-center mt-3">
                                        <PagingComponent/>
                                    </div>
                                </div>
                                <div className="card-footer">

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default SubjectComponent;
