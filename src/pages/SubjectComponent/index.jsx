import React, {useEffect, useState} from 'react';
import TableComponents from '../../components/TableComponent';
import SelectDropdown from "../../components/SelectDownButton";
import PagingComponent from "../../components/PagingComponent";
import SubjectCreateComponent from "../SubjectCreateComponent";
import ModalComponent from "../../components/ModalComponent";
import {Button} from "react-bootstrap";

const SubjectComponent = () => {
    const [cols, setCols] = useState([]);
    const [dataTable, setDataTable] = useState([]);
    const [titleTable, setTitleTable] = useState('');
    const [classTable, setClassTable] = useState('');
    const [totalPage, setTotalPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);


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
        setTotalPage(5)
        setCurrentPage(1)
    };

    useEffect(() => {
        getData();
    }, []);
    //END - Get Data

    //Paging
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    //
    const [modalShow, setModalShow] = React.useState(false);

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
                                        <PagingComponent totalPage={totalPage} currentPage={currentPage}
                                                         onPageChange={handlePageChange}/>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <SubjectCreateComponent/>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        {/*
        díplay modal
        */}
            <Button variant="primary" onClick={() => setModalShow(true)}>
                Open Modal
            </Button>

            <ModalComponent
                show={modalShow}
                onHide={() => setModalShow(false)}
            >
                <p>Your modal content here.</p>
            </ModalComponent>
        </>
    );
}

export default SubjectComponent;
