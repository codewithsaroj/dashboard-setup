import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Grid,
  Box,
  CircularProgress,
  InputAdornment,
  IconButton,
  Tooltip,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BusinessIcon from "@mui/icons-material/Business";
import EditIcon from "@mui/icons-material/Edit";
import { useForm, Controller } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";

const EditableGrid = ({ rowData }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState({});
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  // Handle opening the modal and pre-populating form data
  const handleEditClick = (row) => {
    setSelectedRowData(row); // Set selected row data
    setModalOpen(true); // Open the modal

    // Populate form fields with selected row data (excluding barcode)
    setValue("fullName", row.name);
    setValue("email", row.email);
    setValue("phone", row.phone);
    setValue("companyName", row.companyName);
    setValue("countryCode", row.countryCode || ""); // Assuming countryCode is part of rowData
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Close the modal
    setSelectedRowData({}); // Clear selected row data
  };

  const handleSaveChanges = (data) => {
    console.log("Saved Data:", data);
    setModalOpen(false); // Close the modal after saving
  };

  return (
    <div>
      {/* Your Data Grid here */}
      {/* Example Edit Button */}
      <Tooltip title="Edit" arrow>
        <IconButton color="primary" onClick={() => handleEditClick(rowData)}>
          <EditIcon />
        </IconButton>
      </Tooltip>

      {/* Modal for Editing */}
      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <Box px={4} py={3} maxWidth={800} mx="auto">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="fullname"
                  name="fullname"
                  label="Name"
                  fullWidth
                  margin="dense"
                  {...register("fullName", { required: "Name is required" })}
                  error={Boolean(errors.fullName)}
                  helperText={errors.fullName?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  id="email"
                  name="email"
                  label="Email"
                  fullWidth
                  margin="dense"
                  {...register("email", { required: "Email is required" })}
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} md={5}>
                <Controller
                  name="countryCode"
                  control={control}
                  defaultValue={selectedRowData.countryCode || ""}
                  rules={{ required: "Country Code is required" }}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      options={countryOptions}
                      getOptionLabel={(option) =>
                        `${option.countryName} (${option.countryCode})`
                      }
                      onChange={(event, newValue) =>
                        field.onChange(newValue ? newValue.countryCode : "")
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Country Code"
                          required
                          fullWidth
                          margin="dense"
                          error={Boolean(errors.countryCode)}
                          helperText={errors.countryCode?.message}
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={7}>
                <TextField
                  required
                  id="phone"
                  name="phone"
                  label="Phone"
                  fullWidth
                  margin="dense"
                  {...register("phone", { required: "Phone is required" })}
                  error={Boolean(errors.phone)}
                  helperText={errors.phone?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  id="companyName"
                  name="companyName"
                  label="Company Name"
                  fullWidth
                  margin="dense"
                  {...register("companyName", {
                    required: "Company Name is required",
                  })}
                  error={Boolean(errors.companyName)}
                  helperText={errors.companyName?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BusinessIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
              </Grid>
            </Grid>

            <Box mt={3} display="flex" justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit(handleSaveChanges)}
                startIcon={<CircularProgress size={24} color="inherit" />}
              >
                Save Changes
              </Button>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditableGrid;
