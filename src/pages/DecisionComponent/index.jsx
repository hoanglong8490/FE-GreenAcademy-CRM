import React, { useEffect, useState } from 'react';
import './style.css';
import axios from 'axios';
import TableComponents from '../../components/TableComponents';
import PagingComponent from '../../components/PagingComponent'; // Make sure the path is correct
import { Row, Col } from 'react-bootstrap'; // Or use another library if needed
import ListDecision from './ListDecision';
import { Link } from 'react-router-dom';

const DecisionComponent = () => {
    const [rows, setRows] = useState([]);
    const [totalPage, setTotalPage] = useState(1); // Adjust this if your API provides pagination info
    const [currentPage, setCurrentPage] = useState(1);

    const headerContract = ['ID', 'Mã nhân viên', 'Tên nhân viên', 'Nội dung', 'Ngày quyết định', 'Hình thức', 'Trạng thái', 'Action'];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios('https://66b0477a6a693a95b5383ecc.mockapi.io/decision');
                const data = response.data || []; // Adjust if your API returns a different structure
                setRows(data); // Update rows with fetched data
                
                // If your API provides pagination info, update totalPage accordingly
                // setTotalPage(response.data.totalPages || 1);
                
            } catch (error) {
                console.error("Có lỗi xảy ra khi lấy dữ liệu: ", error);
            }
        };

        fetchData();
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <Link type='submit' to='/CreateDecision' className='btn btn-primary' style={{ margin: '10px' }}>
                Thêm quyết định
            </Link>
            <Row className="contract-content" style={{ textAlign: 'center' }}>
                <Col span={12}>
                    <TableComponents headers={headerContract}>
                        <ListDecision rows={rows} />
                    </TableComponents>
                    <PagingComponent
                        totalPage={totalPage}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </Col>
            </Row>
        </>
    );
};

export default DecisionComponent;
