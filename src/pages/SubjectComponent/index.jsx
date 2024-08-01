import React, {useEffect, useState} from 'react';
import TableComponents from '../../components/TableComponent';
import SelectDropdown from "../../components/SelectDownButton";
import PagingComponent from "../../components/PagingComponent";
import SubjectCreateComponent from "../SubjectCreateComponent";
import ModalComponent from "../../components/ModalComponent";
import {Button} from "react-bootstrap";
import axios from "axios";

const SubjectComponent = () => {
    const [cols, setCols] = useState([]);
    const [dataTable, setDataTable] = useState([]);
    const [titleTable, setTitleTable] = useState('');
    const [classTable, setClassTable] = useState('');
    const [totalPage, setTotalPage] = useState(5);
    const [isEdit, setIsEdit] = useState(false);
    const [isCurrent, setIsCurrent] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const apiUpdate = 'https://66aa0b5b613eced4eba7559a.mockapi.io/subject'
    const apiCreate = 'https://66aa0b5b613eced4eba7559a.mockapi.io/subject'

    //BEGIN- GetData
    const getData = async () => {
        try {
            setCols(['Mã môn học', 'Tên môn học', 'Thời lượng', 'Tên chương trình học', 'Trạng thái']);

            const res = await axios.get('/data/subject.json');
            setDataTable(res.data.data);

            // Uncomment the lines below if you want to use mock data instead of the API response
            // setDataTable([
            //     {id: 1, name: 'Mathematics', duration: '45 hours', programName: 'STEM', status: 'Active'},
            //     {id: 2, name: 'Physics', duration: '30 hours', programName: 'STEM', status: 'Inactive'},
            //     {id: 3, name: 'Chemistry', duration: '40 hours', programName: 'Science', status: 'Active'},
            //     {id: 4, name: 'Biology', duration: '35 hours', programName: 'Science', status: 'Active'},
            //     {id: 5, name: 'History', duration: '25 hours', programName: 'Arts', status: 'Inactive'},
            //     {id: 6, name: 'Geography', duration: '20 hours', programName: 'Arts', status: 'Active'},
            //     {id: 7, name: 'Computer Science', duration: '50 hours', programName: 'STEM', status: 'Active'},
            // ]);

            setTitleTable('SubjectComponent');
            setClassTable('table table-bordered table-hover');
            setTotalPage(5);
            setCurrentPage(1);
        } catch (error) {
            console.error("Error fetching data:", error);
            // Handle the error appropriately
            // e.g., set an error state or show a message to the user
        }
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
    //Modal
    const [modalShow, setModalShow] = useState(false);

    const handleSave = (formData) => {
        console.log("Saving data...");
        console.log("Form data:", formData);
        // Your save logic here
    };

    const handleSubmit = (formData) => {
        console.log('Form submitted with data:', formData);
        console.log('Form submitted with data:', formData);
        const apiUrl = isEdit ? `${apiUpdate}/${formData.id}` : apiCreate;
        const method = isEdit ? 'put' : 'post';

        axios[method](apiUrl, formData)
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    };
    //
    const handleSearch = () => {
    }
    // =>
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
                                    <div className="row align-items-center">
                                        <div className="col-md-10 d-flex align-items-center gap-3">
                                            <div className="col-6 d-flex align-items-center">
                                                <SelectDropdown
                                                    id="programStatus"
                                                    defaultOption={{value: '', label: 'Chọn trạng thái'}}
                                                    apiUrl="/data/status.json"
                                                    className="form-select"
                                                />
                                            </div>
                                            <div className="col-6 d-flex align-items-center">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Search..."
                                                    aria-label="Search input"
                                                />
                                                <Button variant="light" size="sm" className="ml-1">
                                                    <i className="bi bi-search"></i>
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="col-2 d-flex align-items-center justify-content-end">
                                            <Button variant="primary" size="sm" onClick={() => setModalShow(true)}>
                                                Thêm mới
                                            </Button>
                                        </div>
                                    </div>


                                    <TableComponents cols={cols} dataTable={dataTable} classTable={classTable}/>
                                    <div className="row justify-content-center mt-3">
                                        <PagingComponent totalPage={totalPage} currentPage={currentPage}
                                                         onPageChange={handlePageChange}/>
                                    </div>
                                </div>
                                <div className="card-footer">

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*
        díplay modal
        */}
            <ModalComponent
                show={modalShow}
                onHide={() => setModalShow(false)}
                onSave={handleSave}
            >
                <SubjectCreateComponent
                    formFieldsProp={[
                        {
                            name: 'name',
                            type: 'text',
                            label: 'Name',
                            placeholder: 'Enter your name',
                        },
                        // Add other form fields here
                    ]}
                    initialIsEdit={isEdit}
                    initialIdCurrent={isCurrent}
                />
            </ModalComponent>
        </>
    );
}

export default SubjectComponent;
