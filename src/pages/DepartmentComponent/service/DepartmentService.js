// src/api/departmentApi.js
import axios from 'axios';

// Địa chỉ API của bạn trên MockAPI
const API_URL = "https://66ac77fdf009b9d5c73228f4.mockapi.io/Deparment";

const API = "http://localhost:9002/hr/department";


// Lấy danh sách phòng ban
export const fetchDepartments = async () => {
    try {
        const response = await axios.get(`${API}/getAllDepartment`);
        return response.data.data;
    } catch (error) {
        console.error("There was an error fetching the departments!", error);
    }
};
//Lấy phòng ban theo id
export const fetchDepartmentById = async (id) => {
    try {
        const response = await axios.get(`${API}/getDepartment/${id}`);
        return response.data.data;
    } catch (error) {
        console.error("There was an error fetching the departments!", error);
    }
}

// Thêm phòng ban mới
export const createDepartment = async (newDepartment) => {
    try {
        const response = await axios.post(`${API}/addDepartment`, newDepartment);
        return response.data;
    } catch (error) {
        console.error("There was an error creating the department!", error);
    }
};

// Cập nhật phòng ban
export const updateDepartment = async (id, updatedDepartment) => {
    try {
        const response = await axios.put(`${API}/updateDepartment/${id}`, updatedDepartment);
        return response.data;
    } catch (error) {
        console.error("There was an error updating the department!", error);
    }
};

// Xóa phòng ban
export const deleteDepartment = async (id) => {
    try {
        await axios.delete(`${API}/deleteDepartment/${id}`);
    } catch (error) {
        console.error("There was an error deleting the department!", error);
    }
};
