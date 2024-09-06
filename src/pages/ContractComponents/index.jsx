import React, { useEffect, useState } from "react";
import "./Contract.scss";
import TableComponents from "../../components/TableComponents";
import TableBodyComponents from "../../components/TableBodyComponents";
import ContractForm from "./ContractFormComponents/index.";
import ContractViewComponents from "./ContractViewComponents";
import ContractEditComponents from "./ContractEditComponents";
import PagingComponent from "../../components/PagingComponent";
import { format } from "date-fns";
import ConfirmationComponents from "../../components/ConfirmationComponents";
import { NumericFormat } from "react-number-format";
import ContractTitleComponents from "./ContractTittleComponents";
import {
  addContract,
  deleteContract,
  fetchContracts,
  updateContract,
} from "./ContractService/contractService";
import { toast } from "react-toastify";
import { Col, Container, Row, Spinner } from "react-bootstrap";

const itemsPerPage = 12;

const ContractComponents = () => {
  const [contracts, setContracts] = useState([]);
  const [filteredContracts, setFilteredContracts] = useState([]);
  const [viewModalShow, setViewModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [emptyMessage, setEmptyMessage] = useState("");


  const contractTypeMap = {
    fulltime: "Hợp đồng lao động chính thức",
    parttime: "Hợp đồng lao động parttime",
    freelance: "Hợp đồng Freelance",
    probationary: "Hợp đồng thử việc",
    intern: "Hợp đồng thực tập",
  };

  const headerContract = [
    // "ID",
    "Mã hợp đồng",
    "Mã nhân viên",
    "Loại hợp đồng",
    "Mức lương",
    // "Ngày bắt đầu",
    // "Ngày kết thúc",
    "Trạng thái",
    "Action",
  ];

  useEffect(() => {
    loadContracts();
  }, []);
  const loadContracts = async () => {
    setIsLoading(true);
    try {
      const contractsData = await fetchContracts();
      console.log(contractsData);
      if (!contractsData || contractsData.length === 0) {
        setContracts([]);
        setFilteredContracts([]);
        setTotalPage(0);
        setEmptyMessage("Danh sách hợp đồng trống"); // Gán thông báo khi danh sách hợp đồng trống
      } else {
        setContracts(contractsData);
        setFilteredContracts(contractsData);
        setTotalPage(Math.ceil(contractsData.length / itemsPerPage));
        setEmptyMessage(""); // Xóa thông báo khi có dữ liệu hợp đồng
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi lấy dữ liệu hợp đồng!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (filtered) => {
    const sortedFiltered = filtered.sort((a, b) => b.status - a.status);
    setFilteredContracts(sortedFiltered);
    setTotalPage(Math.ceil(sortedFiltered.length / itemsPerPage));
    setCurrentPage(1);
  };

  const handleAddContract = async (newContract) => {
    setIsLoading(true);
    try {
      console.log(newContract);
      const contractWithDefaultStatus = {
        ...newContract,
        status: newContract.status || true,
      };
      const addedContract = await addContract(contractWithDefaultStatus);
      const updatedContracts = [...contracts, addedContract].sort(
        (a, b) => b.status - a.status,
      );
      setContracts(updatedContracts);
      setFilteredContracts(updatedContracts);
      setTotalPage(Math.ceil(updatedContracts.length / itemsPerPage));
      setCurrentPage(Math.ceil(updatedContracts.length / itemsPerPage));
      toast.success("Thêm hợp đồng thành công!");
    } catch (error) {
      toast.error("Có lỗi xảy ra khi thêm hợp đồng!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveEdit = async (updatedContract) => {
    setIsLoading(true);

    try {
      const savedContract = await updateContract(updatedContract);
      const updatedContracts = contracts
        .map((contract) =>
          contract.id === updatedContract.id ? savedContract : contract,
        )
        .sort((a, b) => b.status - a.status);
      setContracts(updatedContracts);
      setFilteredContracts(updatedContracts);
      setTotalPage(Math.ceil(updatedContracts.length / itemsPerPage));
      setEditModalShow(false);
      toast.success("Cập nhật thành công hợp đồng!");
    } catch (error) {
      toast.error("Có lỗi xảy ra khi cập nhật hợp đồng!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (contractId) => {
    setIsLoading(true);
    try {
      const contractToUpdate = contracts.find(
        (contract) => contract.id === contractId,
      );
      if (contractToUpdate) {
        const deletedContract = await deleteContract(
          contractId,
          contractToUpdate,
        );
        const updatedContracts = contracts
          .map((contract) =>
            contract.id === contractId ? deletedContract : contract,
          )
          .sort((a, b) => b.status - a.status);
        setContracts(updatedContracts);
        setFilteredContracts(updatedContracts);
        setTotalPage(Math.ceil(updatedContracts.length / itemsPerPage));
        setDeleteModalShow(false);
        toast.success("Xóa thành công hợp đồng!");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xóa hợp đồng!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteConfirm = () => {
    if (selectedContract) {
      handleDelete(selectedContract.id);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const formatDate = (dateString) => {
    return dateString ? format(new Date(dateString), "dd/MM/yyyy") : "";
  };

  const handleView = (contract) => {
    setSelectedContract(contract);
    console.log(contract);
    setViewModalShow(true);
  };

  const handleEdit = (contract) => {
    setSelectedContract(contract);
    setEditModalShow(true);
  };

  const rows = filteredContracts
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    .map((contract) => ({
      data: [
        // contract.id,
        contract.contractCode,
        contract.employeeCode,
        contractTypeMap[contract.contractCategory],
        <NumericFormat
          value={contract.salary}
          displayType={"text"}
          thousandSeparator="."
          decimalSeparator=","
          prefix=""
          renderText={(value) => value}
        />,
        // formatDate(contract.start_date),
        // formatDate(contract.end_date),
        contract.status ? (
          <span className="badge badge-primary">Còn hạn</span>
        ) : (
          <span className="badge badge-danger">Hết hạn</span>
        ),
      ],
      actions: [
        {
          className: "btn-info",
          icon: "fa-eye",
          onClick: () => handleView(contract),
        },
        {
          className: "btn-warning",
          icon: "fa-pen",
          onClick: () => handleEdit(contract),
        },
        ...(contract.status
          ? [
              {
                className: "btn-danger",
                icon: "fa-trash",
                onClick: () => {
                  setSelectedContract(contract);
                  setDeleteModalShow(true);
                },
              },
            ]
          : []),
      ],
    }));

    console.log("contract render");
  return (
      <Container fluid className="Contract-list">
        <ContractTitleComponents
            onSearch={handleSearch}
            contracts={contracts}
            onAddContract={handleAddContract}
        />
        <Row className="contract-content">
          <Col xs={12} md={4}>
            <h3>Thêm hợp đồng</h3>
            <ContractForm onSubmit={handleAddContract} contracts={contracts} />
          </Col>
          <Col xs={12} md={8}>
            {isLoading ? (
                <div className="spinner-container text-primary">
                  <Spinner animation="border" role="status" />
                  <span className="visually-hidden">Loading...</span>
                </div>
            ) : contracts.length === 0 ? (
                <span style={{ color: "red", fontWeight: "bold" }}>
            Danh sách hợp đồng trống
          </span>
            ) : (
                <>
                  <TableComponents headers={headerContract}>
                    <TableBodyComponents rows={rows} />
                  </TableComponents>
                  <PagingComponent
                      totalPage={totalPage}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                  />
                </>
            )}
          </Col>
        </Row>
        <ContractViewComponents
            show={viewModalShow}
            handleClose={() => setViewModalShow(false)}
            contract={selectedContract}
        />
        <ContractEditComponents
            show={editModalShow}
            handleClose={() => setEditModalShow(false)}
            contract={selectedContract}
            onSave={handleSaveEdit}
        />
        <ConfirmationComponents
            show={deleteModalShow}
            handleClose={() => setDeleteModalShow(false)}
            onConfirm={handleDeleteConfirm}
            message="Bạn có chắc chắn muốn xóa hợp đồng này?"
        />
      </Container>
  );
};


export default ContractComponents;
