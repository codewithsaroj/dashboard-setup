import { useState, useEffect } from "react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Button, CircularProgress, InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoginBgImg from "../assets/LoginPageBGImg.jpg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";
import { BASE_URL, USER } from "../utils/apiEndPoint";
import ApiClient from "../apiClient";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({
    username: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleLogin = async (values) => {
    setIsLoading(true);
    try {
      const response = await ApiClient.post(
        `${BASE_URL}${USER.LOGIN}`,
        {
          email: values.username,
          password: values.password,
        },
        false
      );
      setIsLoading(false);
      if (response.data.hasError === false) {
        const token = response.data.data.token;
        const userRole = response.data.data.userRole;
        console.log("Login successful:", response);
        console.log("Token:", token);
        localStorage.setItem("authToken", token);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("userRole", userRole);
        window.location.href = "/home";
      } else {
        setErrorMessage(response.data.message);
        localStorage.setItem("authToken", null);
        localStorage.setItem("isLoggedIn", false);
        localStorage.setItem("userRole", null);
      }
    } catch (error) {
      setIsLoading(false);
      console.log("Login failed:", error);
      if (error.response) {
        console.error("Error:", error.response.data.message);
        alert(error.response.data.message);
      } else if (error.request) {
        console.error("No response received from server");
        alert("Server error, please try again later.");
      } else {
        console.error("Error:", error.message);
        alert("Something went wrong.");
      }
      localStorage.setItem("authToken", null);
      localStorage.setItem("isLoggedIn", false);
      localStorage.setItem("userRole", null);
    }
  };

  return (
    <div className="login-container" style={styles.container}>
      <div className="login-box" style={styles.loginBox}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LockIcon style={{ margin: "5px" }} />
          <h2>Login</h2>
        </div>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ values, handleChange, handleBlur, touched, errors }) => (
            <Form>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  width: "90%",
                  margin: "0 auto",
                }}
              >
                <Field
                  as={TextField}
                  type="text"
                  variant="outlined"
                  placeholder="Username"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.username && !!errors.username}
                  helperText={touched.username && errors.username}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                />

                <Field
                  as={TextField}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  variant="outlined"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          style={{ border: "none", background: "transparent" }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                />
                <div>
                  <Button
                    className="px-4"
                    disabled={isLoading}
                    variant="contained"
                    color="primary"
                    type="submit"
                    startIcon={
                      isLoading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : null
                    }
                  >
                    {isLoading ? "Submitting..." : "Login"}
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>

        {errorMessage && <p style={styles.error}>{errorMessage}</p>}
      </div>
    </div>
  );
};

const styles = {
  body: {
    margin: "0px",
    padding: "0px",
    height: "100%",
    width: "100%",
  },

  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100%",
    backgroundColor: "#f4f4f4",
    backgroundImage: `url(${LoginBgImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  loginBox: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "25%",
    textAlign: "center",
  },
  input: {
    width: "90%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    width: "45%",
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "14px",
  },
};

export default Login;
