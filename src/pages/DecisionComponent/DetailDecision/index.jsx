// src/components/DetailPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DetailPage = () => {
    const { id } = useParams(); // Get ID from URL
    const [item, setItem] = useState(null); // Initialize as null

    useEffect(() => {
        axios.get('/data/decision.json') // Assuming the path is correct
            .then(response => {
                const data = response.data.data.find(item => item.id == id); // Find item by ID
                setItem(data);
            })
            .catch(err => console.log("Error occurred: " + err));
    }, [id]);

    if (!item) return <p>Loading...</p>;
    console.log(item);
    return (
        <div className="container mt-5">
            <h2>Chi Tiết Quyết Định</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Thông tin</th>
                        <th>Chi tiết</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>ID:</td>
                        <td>{item.id}</td>
                    </tr>
                    <tr>
                        <td>Mã nhân viên:</td>
                        <td>{item.manv}</td>
                    </tr>
                    <tr>
                        <td>Tên:</td>
                        <td>{item.name}</td>
                    </tr>
                    <tr>
                        <td>Nội dung:</td>
                        <td>{item.content}</td>
                    </tr>
                    <tr>
                        <td>Ngày:</td>
                        <td>{item.date}</td>
                    </tr>
                    <tr>
                        <td>Hình thức:</td>
                        <td>{item.hinhthuc}</td>
                    </tr>
                    <tr>
                        <td>Trạng thái:</td>
                        <td>{item.status}</td>
                    </tr>
                    <tr>
                        <td>Địa chỉ:</td>
                        <td>{item.address}</td>
                    </tr>
                    <tr>
                        <td>Số điện thoại:</td>
                        <td>{item.phone}</td>
                    </tr>
                    <tr>
                        <td>Hình ảnh:</td>
                        <td><img src={item.img} alt="Image" style={{ maxWidth: '200px' }} /></td>
                    </tr>
                    <tr>
                        <td>Phòng ban:</td>
                        <td>{item.phong_ban}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    );
};

export default DetailPage;
