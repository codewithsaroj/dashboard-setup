import { Fragment, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  Paper,
  Box,
  Grid,
  TextField,
  Button,
  CircularProgress,
  FormControl,
} from "@mui/material";
import { showSuccessToast, showErrorToast } from "../../utils/toastMessage";
import bannerImage from "../../assets/banner.jpg";
import PersonIcon from "@mui/icons-material/Person";
import { InputAdornment } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BusinessIcon from "@mui/icons-material/Business";
// import UploadImg from "./UploadImg";
import countryOptions from "../../utils/countryData";
import Autocomplete from "@mui/material/Autocomplete";
import { BASE_URL, CUSTOMERS } from "../../utils/apiEndPoint";
import ApiClient from "../../apiClient";

const CustomerRegistrationForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const [imagePreview, setImagePreview] = useState("");
  const [value, setValue] = useState(countryOptions[0].countryCode);
  const [inputValue, setInputValue] = useState("");

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required").email("Invalid Email"),
    countryCode: Yup.string().required("Country Code is required"),
    phone: Yup.string()
      .required("Phone is required")
      .min(9)
      .max(12)
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Invalid mobile number"
      ),
    companyName: Yup.string().required("Company Name is required"),
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log(JSON.stringify(data, null, 2));
    let obj = {
      ...data,
      phone: Number(data.phone),
    };
    setIsLoading(true);
    ApiClient.post(`${BASE_URL}${CUSTOMERS.CREATE_CUSTOMER}`, obj, false)
      .then((response) => {
        setIsLoading(false);
        if (response.data.hasError) {
          showErrorToast(response.data.message || "Something went wrong.");
        } else {
          showSuccessToast("Form submitted successfully!");
          reset({
            fullName: null,
            email: null,
            phone: null,
            companyName: null,
          });
        }
        console.log("Response:", response.data);
      })
      .catch((error) => {
        setIsLoading(false);
        showErrorToast("Something went wrong. Please try again.");
        console.error("Error:", error);
      });
  };

  // const handleImageChange = (imageData) => {
  //   setImagePreview(imageData); // Update image preview with the selected image data
  // };

  const countryCodeChangeHandler = (newValue) => {
    if (newValue) {
      setValue(newValue.countryCode); // Update the value state with countryCode (string)
    }
  };

  return (
    <Fragment>
      <Paper
        sx={{
          maxWidth: 800,
          mx: "auto",
          boxShadow: 6,
          marginTop: 3,
        }}
      >
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <img
            src={bannerImage}
            alt="Logo"
            style={{
              width: "100%",
            }}
          />
        </Box>

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
                {...register("fullName")}
                error={errors.fullName ? true : false}
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
                {...register("email")}
                error={errors.email ? true : false}
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

            {/* Country Code */}
            <Grid item xs={12} md={5}>
              <Controller
                name="countryCode"
                control={control} // Connect to useForm
                defaultValue={countryOptions[0].countryCode} // Set default value to countryCode only
                rules={{ required: "Country Code is required" }} // Validation
                render={({ field }) => (
                  <Autocomplete
                    {...field} // Spread field props from useForm's Controller
                    value={
                      countryOptions.find(
                        (option) => option.countryCode === value
                      ) || null
                    } // Controlled value: match countryCode
                    onChange={(event, newValue) => {
                      field.onChange(newValue ? newValue.countryCode : ""); // Update form value with only countryCode
                      countryCodeChangeHandler(newValue); // Update local state with countryCode
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) =>
                      setInputValue(newInputValue)
                    }
                    options={countryOptions}
                    getOptionLabel={(option) =>
                      `${option.countryName} (${option.countryCode})`
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
                    sx={{ width: "100%" }}
                  />
                )}
              />
            </Grid>

            {/* Phone Number */}
            <Grid item xs={12} md={7}>
              <TextField
                required
                id="phone"
                name="phone"
                label="Phone"
                fullWidth
                margin="dense"
                {...register("phone")}
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

            {/* Company Name */}
            <Grid item xs={12}>
              <TextField
                required
                id="companyName"
                name="companyName"
                label="Company Name"
                fullWidth
                margin="dense"
                {...register("companyName")}
                error={errors.companyName ? true : false}
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
              disabled={isLoading}
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit)}
              startIcon={
                isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : null
              }
            >
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Fragment>
  );
};

export default CustomerRegistrationForm;
