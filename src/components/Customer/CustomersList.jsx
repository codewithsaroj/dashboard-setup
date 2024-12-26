import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import JsBarcode from "jsbarcode";
import { jsPDF } from "jspdf";
import Search from "./Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Tooltip } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import Swal from "sweetalert2";
import { showSuccessToast, showErrorToast } from "../../utils/toastMessage";
import Switch from "@mui/material/Switch";
import { BASE_URL, CUSTOMERS } from "../../utils/apiEndPoint";
import ApiClient from "../../apiClient";

const CustomersList = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSeaching, setIsSeaching] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState({
    searchField: "",
    searchQuery: "",
  });

  const fetchAllCustomers = () => {
    setRows([]);
    let obj = {
      page: 1,
      limit: 10,
      searchField: searchQuery.searchField,
      searchQuery: searchQuery.searchQuery,
    };
    ApiClient.post(`${BASE_URL}${CUSTOMERS.GET_ALL_CUSTOMERS}`, obj, true)
      .then((response) => {
        const customers = response.data.data.customers;
        const transformedRows = customers.map((customer) => ({
          id: customer._id,
          name: `${customer.fullName}`,
          email: customer.email,
          phone: `${customer.countryCode}-${customer.phone}`,
          companyName: customer.companyName,
          barCodeNumber: customer.barCodeNumber,
          hascheckedIn: customer.hascheckedIn,
          hasGiftCollected: customer.hasGiftCollected,
        }));
        setRows(transformedRows);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching data: " + err.message);
        setLoading(false);
      });
  };

  const handlePrint = (rowData) => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "in",
      format: [2, 4],
    });
    const barcodeCanvas = document.createElement("canvas");
    JsBarcode(barcodeCanvas, rowData.barCodeNumber, {
      format: "CODE128",
      displayValue: true,
    });
    const barcodeImg = barcodeCanvas.toDataURL("image/png");
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const imageWidth = 1.8;
    const imageHeight = 0.5;
    const imageX = (pageWidth - imageWidth) / 2;
    const imageY = 1.0;
    doc.addImage(barcodeImg, "PNG", imageX, imageY, imageWidth, imageHeight);
    doc.setFont("helvetica");
    doc.setFontSize(18);
    doc.setTextColor("#333");
    const textWidth = doc.getTextWidth(`${rowData.name}`);
    const centerX = doc.internal.pageSize.width / 2 - textWidth / 2;
    const centerY = 0.5;
    doc.text(`${rowData.name}`, centerX, centerY);
    // doc.text(`${rowData.name}`, 1.0, 0.5);
    doc.setFont("helvetica");
    doc.setFontSize(16);
    doc.setTextColor("#333");
    const companyNameWidth = doc.getTextWidth(`${rowData.companyName}`);
    // Calculate the X position for centering the text
    const centerXX = doc.internal.pageSize.width / 2 - companyNameWidth / 2;
    const centerYX = 0.8; // Adjust as per your requirement
    doc.text(`${rowData.companyName}`, centerXX, centerYX); // Text aligned in center
    // doc.text(`${rowData.companyName}`, 1.0, 0.8);
    doc.save(`${rowData.name}_barcode.pdf`);
  };

  const handleEdit = (row) => {
    // console.log("Edit row", row);
  };

  const handleDelete = (row) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        ApiClient.delete(
          `${BASE_URL}${CUSTOMERS.DELETE_CUSTOMER}/${row.id}`,
          true
        )
          .then((result) => {
            if (result.data.hasError == false) {
              fetchAllCustomers();
              showSuccessToast("Customer deleted successfully");
            } else {
              fetchAllCustomers();
              showErrorToast("Error while deleting customer");
            }
          })
          .catch((error) => {
            if (error.data.hasError == true) {
              showErrorToast(error.data.message);
            } else {
              showErrorToast("Something went wrong, please try again later");
            }
            fetchAllCustomers();
          });
      }
    });
  };

  useEffect(() => {
    fetchAllCustomers();
  }, [searchQuery]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Typography color="error">{error}</Typography>
      </div>
    );
  }

  const handleAttendanceToggle = (row) => {
    ApiClient.patch(
      `${BASE_URL}${CUSTOMERS.UPDATE_CUSTOMER}/${row.id}`,
      {
        hascheckedIn: !row.hascheckedIn,
      },
      true
    )
      .then((result) => {
        if (result.data.hasError == false) {
          fetchAllCustomers();
          showSuccessToast("Attendance updated successfully");
        } else {
          fetchAllCustomers();
          showErrorToast("Error updating attendance");
        }
      })
      .catch((error) => {
        if (error.data.hasError == true) {
          showErrorToast(error?.data?.message);
        } else {
          showErrorToast("Something went wrong, please try again later");
        }
        fetchAllCustomers();
      });
  };

  const handleGiftsToggle = (row) => {
    let obj = {
      hasGiftCollected: !row.hasGiftCollected,
    };
    ApiClient.patch(
      `${BASE_URL}${CUSTOMERS.UPDATE_CUSTOMER}/${row.id}`,
      obj,
      true
    )
      .then((result) => {
        if (result.data.hasError == false) {
          fetchAllCustomers();
          showSuccessToast("Gift updated successfully");
        } else {
          fetchAllCustomers();
          showErrorToast("Error updating Gift");
        }
      })
      .catch((error) => {
        if (error.data.hasError == true) {
          showErrorToast(error?.data?.message);
        } else {
          showErrorToast("Something went wrong, please try again later");
        }
        fetchAllCustomers();
      });
  };

  const columns = [
    { field: "barCodeNumber", headerName: "Unique ID", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "name", headerName: "Name", flex: 2 },
    { field: "email", headerName: "Email", flex: 2 },
    { field: "companyName", headerName: "Company Name", flex: 2 },
    {
      field: "hascheckedIn",
      headerName: "Check-In",
      flex: 2,
      renderCell: (params) => {
        return (
          <Switch
            disabled={params.row.hasGiftCollected}
            checked={params.row.hascheckedIn}
            onChange={() => handleAttendanceToggle(params.row)}
          />
        );
      },
    },
    {
      field: "hasGiftCollected",
      headerName: "Gifts Received",
      flex: 2,
      renderCell: (params) => {
        return (
          <Switch
            checked={params.row.hasGiftCollected}
            onChange={() => handleGiftsToggle(params.row)}
            disabled={!params.row.hascheckedIn}
          />
        );
      },
    },
    {
      field: "print",
      headerName: "Action",
      flex: 2,
      headerAlign: "center",
      renderCell: (params) => {
        const userRole = window.localStorage.getItem("userRole");
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Tooltip title="Print" arrow>
              <IconButton
                color="primary"
                onClick={() => handlePrint(params.row)}
              >
                <PrintIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Edit" arrow>
              <IconButton
                color="primary"
                onClick={() => handleEdit(params.row)}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>

            {userRole === "SuperAdmin" && (
              <Tooltip title="Delete" arrow>
                <IconButton
                  color="error"
                  onClick={() => handleDelete(params.row)}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        );
      },
    },
  ];

  return (
    <Box>
      <Search
        setSearchQuery={setSearchQuery}
        handlePrint={handlePrint}
        rows={rows}
      />

      <DataGrid rows={rows} columns={columns} pageSize={5} sx={{ border: 0 }} />
    </Box>
  );
};

export default CustomersList;
