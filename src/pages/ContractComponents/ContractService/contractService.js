// Service methods

import axios from 'axios';

const apiEndpoint = 'https://66a9b8e2613eced4eba6017a.mockapi.io/api/contracts/Contract';

export const fetchContracts = async () => {
    try {
        const response = await axios.get(apiEndpoint);
        return response.data.sort((a, b) => b.status - a.status);
    } catch (error) {
        console.error('Có lỗi xảy ra khi lấy dữ liệu!', error);
        throw error;
    }
};

export const addContract = async (newContract) => {
    try {
        const response = await axios.post(apiEndpoint, newContract);
        return response.data;
    } catch (error) {
        console.error('Có lỗi xảy ra khi thêm hợp đồng!', error);
        throw error;
    }
};

export const updateContract = async (updatedContract) => {
    try {
        const response = await axios.put(`${apiEndpoint}/${updatedContract.id}`, updatedContract);
        return response.data;
    } catch (error) {
        console.error('Có lỗi xảy ra khi cập nhật hợp đồng!', error);
        throw error;
    }
};

export const deleteContract = async (contractId, contractToUpdate) => {
    try {
        const response = await axios.put(`${apiEndpoint}/${contractId}`, {
            ...contractToUpdate,
            status: false
        });
        return response.data;
    } catch (error) {
        console.error('Có lỗi xảy ra khi cập nhật trạng thái hợp đồng!', error);
        throw error;
    }
};
