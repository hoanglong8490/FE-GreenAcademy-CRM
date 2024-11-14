import axios from "axios";

const apiContract = "http://localhost:9002/hr/contracts";
const apiPersons = "http://localhost:9002/hr/employee";

// Lấy danh sách hợp đồng
export const fetchContracts = async () => {
  try {
    const response = await axios.get(apiContract);
    const contracts = response.data.data;
    const sortedContracts = Array.isArray(contracts) ? contracts.sort((a, b) => {
      if (b.status === a.status) {
        return new Date(b.update_at) - new Date(a.update_at);
      }
      return b.status - a.status;
    }) : [];

    return sortedContracts;
  } catch (error) {
    console.error("Có lỗi xảy ra khi lấy dữ liệu hợp đồng!", error);
    throw error;
  }
};

// Lấy danh sách nhân sự
export const fetchPersons = async () => {
  try {
    const response = await axios.get(apiPersons);
    // Kiểm tra response để đảm bảo API trả về đúng dữ liệu
    if (response?.data?.code === 200 && response?.data?.data?.content) {
      const employees = response.data.data.content;
      return employees;
    } else {
      console.error("Dữ liệu không hợp lệ:", response.data);
      throw new Error("Không thể lấy danh sách nhân sự");
    }
  } catch (error) {
    console.error("Có lỗi xảy ra khi lấy danh sách nhân sự!", error);
    throw new Error("Không thể lấy danh sách nhân sự");
  }
};

// Thêm mới hợp đồng
export const addContract = async (newContract) => {
  try {
    const { data } = await axios.post(apiContract, newContract);
    return data;
  } catch (error) {
    if (error.response) {
      // Lỗi phản hồi từ máy chủ
      console.error("Có lỗi xảy ra khi thêm hợp đồng!", error.response.data);
      throw new Error(`Không thể thêm hợp đồng mới: ${error.response.data.message}`);
    } else if (error.request) {
      // Yêu cầu đã được gửi nhưng không nhận được phản hồi
      console.error("Không nhận được phản hồi từ máy chủ", error.request);
      throw new Error("Không nhận được phản hồi từ máy chủ");
    } else {
      // Lỗi trong cấu hình yêu cầu
      console.error("Lỗi cấu hình yêu cầu", error.message);
      throw new Error(`Lỗi cấu hình yêu cầu: ${error.message}`);
    }
  }
};

// Cập nhật hợp đồng
export const updateContract = async (updatedContract) => {
  try {
    const { data } = await axios.put(
        `${apiContract}/${updatedContract.id}`,
        updatedContract,
    );
    return data;
  } catch (error) {
    console.error("Có lỗi xảy ra khi cập nhật hợp đồng!", error);
    throw new Error("Không thể cập nhật hợp đồng");
  }
};

// Xóa hợp đồng (status = false)
export const deleteContract = async (contractId) => {
  try {
    const { data } = await axios.put(`${apiContract}/${contractId}`, {
      status: false,
    });
    return data;
  } catch (error) {
    console.error("Có lỗi xảy ra khi cập nhật trạng thái hợp đồng!", error);
    throw new Error("Không thể xóa hợp đồng");
  }
};
