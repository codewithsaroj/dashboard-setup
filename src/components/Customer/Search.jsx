import Button from "@mui/material/Button";
import { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
} from "@mui/material";
import * as XLSX from "xlsx";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// eslint-disable-next-line react/prop-types
const Search = ({ setSearchQuery, handlePrint, rows }) => {
  // const [rows, setRows] = useState([]);
  const [selectedValue, setSelectedValue] = useState("barCodeNumber");
  const [inputText, setInputText] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleTextChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSearch = () => {
    setSearchQuery({
      searchField: selectedValue,
      searchQuery: inputText,
    });
  };

  const clearSearch = () => {
    setSearchQuery({
      searchField: "",
      searchQuery: "",
    });
    // setSelectedValue("");
    setInputText("");
  };
  // Function to download table data as Excel
  const handleDownloadExcel = () => {
    // // Convert the rows data to a worksheet
    // const worksheet = XLSX.utils.json_to_sheet(rows);

    // // Create a new workbook and append the worksheet to it
    // const workbook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");

    // // Write the Excel file and trigger download
    // XLSX.writeFile(workbook, "customers_list.xlsx");
    if (rows.length > 0) {
      // Define custom column headers (Excel headers)
      const headers = [
        { barCodeNumber: "Barcode" },
        { phone: "Phone Number" },
        { name: "Full Name" },
        { email: "Email Address" },
        { companyName: "Company Name" },
      ];

      // Map rows data to custom headers
      const mappedRows = rows.map((row) => ({
        Barcode: row.barCodeNumber,
        "Phone Number": `${row.countryCode || ""}${row.phone || ""}`,
        "Full Name": row.name,
        "Email Address": row.email,
        "Company Name": row.companyName,
      }));

      // Convert the mapped rows data to a worksheet
      const worksheet = XLSX.utils.json_to_sheet(mappedRows, {
        header: [
          "Barcode",
          "Phone Number",
          "Full Name",
          "Email Address",
          "Company Name",
        ], // Custom header row
      });

      // Create a new workbook and append the worksheet to it
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");

      // Write the Excel file and trigger download
      XLSX.writeFile(workbook, "customers_list.xlsx");
    } else {
      alert("No data available to download");
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          flexGrow: 1,
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        <Grid container spacing={1}>
          <Grid item md={5}>
            <Typography
              variant="h4"
              gutterBottom
              textAlign={"center"}
              fontWeight={600}
              display={"flex"}
              alignItems={"center"}
              color="rgb(86, 184, 249)"
            >
              Customer Details
            </Typography>
          </Grid>
          <Grid item xs={12} md={7}>
            <div
              style={{
                margin: "8px auto", // Centering the div horizontally
                display: "flex",
                flexDirection: "row", // Ensuring items are arranged in a row
                alignItems: "center", // Aligns items vertically in the center
              }}
            >
              <FormControl>
                <InputLabel id="select-label">Select Option</InputLabel>
                <Select
                  labelId="select-label"
                  value={selectedValue}
                  onChange={handleChange}
                  label="Select Option"
                >
                  <MenuItem value="barCodeNumber">Bar Code</MenuItem>
                  <MenuItem value="email">Email</MenuItem>
                  <MenuItem value="phone">Phone</MenuItem>
                  <MenuItem value="companyName">Company Name</MenuItem>
                  <MenuItem value="fullName">Name</MenuItem>
                </Select>
              </FormControl>

              {/* Input Field for Typing */}
              <TextField
                label="Search"
                variant="outlined"
                aria-level={true}
                value={inputText}
                onChange={handleTextChange}
                style={{ marginLeft: "20px", width: "300px" }}
              />

              {/* Search Button */}
              <div className="button" style={{ marginLeft: "20px" }}>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSearch}
                  >
                    Search
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={clearSearch}
                  >
                    Clear
                  </Button>

                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleDownloadExcel}
                  >
                    Download Excel
                  </Button>
                </Box>
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Search;
