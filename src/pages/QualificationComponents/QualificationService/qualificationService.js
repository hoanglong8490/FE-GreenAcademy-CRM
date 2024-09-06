// Service methods

import axios from 'axios';

const apiEndpoint = '/data/qualification/qualification-list.json';

export const fetchQualification = async () => {
    try {
        const response = await axios.get(apiEndpoint);
        console.log(response.data);
        // Sorting positions based on 'status'; assuming 'true' values are sorted higher
        return response.data.sort((a, b) => b.status - a.status);
    } catch (error) {
        console.error('Có lỗi xảy ra khi lấy dữ liệu!', error);
        throw error;
    }
};

// Add a new Qualification
export const addQualification = async (newQualification) => {
    try {
        console.log(newQualification);
        const response = await axios.post(apiEndpoint, newQualification);
        return response.data;
    } catch (error) {
        console.error('Có lỗi xảy ra khi thêm chức vụ!', error);
        throw error;
    }
};

// Update an existing Qualification
export const updateQualification = async (updatedQualification) => {
    try {
        const response = await axios.put(`${apiEndpoint}/${updatedQualification.id}`, updatedQualification);
        return response.data;
    } catch (error) {
        console.error('Có lỗi xảy ra khi cập nhật hợp đồng!', error);
        throw error;
    }
};

// Mark a Qualification as inactive
export const deleteQualification = async (id) => {
    try {
        // Fetch current data to maintain other fields
        const currentQualification = await axios.get(`${apiEndpoint}/${id}`);
        const updateQualification = {
            ...currentQualification.data,
            status: false
        };
        const response = await axios.put(`${apiEndpoint}/${id}`, updateQualification);
        return response.data;
    } catch (error) {
        console.error('Có lỗi xảy ra khi cập nhật trạng thái hợp đồng!', error);
        throw error;
    }
};