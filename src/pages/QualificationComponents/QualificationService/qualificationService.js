// Service methods

import axios from 'axios';

const apiEndpoint = 'http://localhost:9002/hr/qualifications';
const apiEmployee = 'http://localhost:9002/hr/employees/all';
const apiAddQualification = 'http://localhost:9002/hr/qualifications/create';
const apiFetchQualification = 'http://localhost:9002/hr/qualifications';
const apiUpdateQualification = 'http://localhost:9002/hr/qualifications/update';

export const fetchEmployees = async () => {
    try {
        const response = await axios.get(apiEmployee);

        if (response.data.data && Array.isArray(response.data.data)) {
            // Sorting positions based on 'status'; assuming 'true' values are sorted higher
            return response.data.data.sort((a, b) => b.status - a.status);
        } else {
            console.error('Dữ liệu không hợp lệ:', response.data.data);
            return [];
        }
    } catch (error) {
        console.error('Có lỗi xảy ra khi lấy dữ liệu!', error);
        throw error;
    }
};


export const fetchQualification = async () => {
    try {
        const response = await axios.get(apiFetchQualification);

        // Sorting positions based on 'status'; assuming 'true' values are sorted higher
        return response.data.data.content.sort((a, b) => b.status - a.status);
    } catch (error) {
        console.error('Có lỗi xảy ra khi lấy dữ liệu!', error);
        throw error;
    }
};

// Add a new Qualification
export const addQualification = async (newQualification) => {
    try {
        const formData = new FormData();
        formData.append('qualificationDTO', new Blob([JSON.stringify(newQualification)], { type: 'application/json' }));
        formData.append('image', newQualification.image);

        try {
            const response = await axios.post(apiAddQualification, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data.data;
        } catch (error) {
            console.error('Có lỗi xảy ra khi thêm bằng cấp!', error);
            throw error;
        }
    } catch (error) {
        console.error('Có lỗi xảy ra khi thêm bằng cấp!', error);
        throw error;
    }
};

// Update an existing Qualification
export const updateQualification = async (updatedQualification) => {
    try {
        const response = await axios.put(`${apiUpdateQualification}/${updatedQualification.id}`, updatedQualification);
        return response.data.data;
    } catch (error) {
        console.error('Có lỗi xảy ra khi cập nhật bằng cấp!', error);
        throw error;
    }
};

// Mark a Qualification as inactive
export const deleteQualification = async (id) => {
    try {

        const currentQualification = await axios.get(`${apiEndpoint}/${id}`);
        const updateQualification = {
            ...currentQualification.data.data,
            status: 0
        };
        const response = await axios.put(`${apiUpdateQualification}/${id}`, updateQualification);
        return response.data.data;
    } catch (error) {
        console.error('Có lỗi xảy ra khi cập nhật trạng thái bằng cấp!', error);
        throw error;
    }
};