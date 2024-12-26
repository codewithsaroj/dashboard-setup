import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import { BASE_URL, DASHBOARD } from "../utils/apiEndPoint";
import ApiClient from "../apiClient";

export default function Home() {
  const [customerCount, setCustomerCount] = useState(0);
  const [attendenceCount, setAttendenceCount] = useState(0);
  const [giftsCount, setGiftsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    ApiClient.get(`${BASE_URL}${DASHBOARD.DASHBOARD_CUSTOMER_DATA}`, {}, true)
      .then((response) => {
        setLoading(false);
        if (response.data.hasError === false) {
          setCustomerCount(response.data.data.totalCustomers);
          setAttendenceCount(response.data.data.totalCheckedIn);
          setGiftsCount(response.data.data.totalGiftCollected);
        } else {
          setCustomerCount(0);
          setAttendenceCount(0);
          setGiftsCount(0);
          setError("Failed to fetch data");
        }
      })
      .catch((err) => {
        setLoading(false);
        setError("Failed to fetch data");
        setCustomerCount(0);
        setAttendenceCount(0);
        setGiftsCount(0);
      });
  }, []);

  return (
    <Grid
      container
      spacing={3}
      justifyContent="center"
      alignItems="center"
      padding="20px"
    >
      {/* Total Customers Card */}
      <Grid item xs={12} sm={4}>
        <Card
          sx={{ maxWidth: 350, backgroundColor: "#1976d2", color: "#ffffff" }}
        >
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              textAlign="center"
            >
              Total Customers
            </Typography>
            {loading ? (
              <Typography variant="h6" textAlign="center">
                <CircularProgress color="inherit" />
              </Typography>
            ) : error ? (
              <Typography variant="h6" textAlign="center" color="error">
                {error}
              </Typography>
            ) : (
              <Typography variant="h3" textAlign="center">
                {customerCount}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>

      {/* Total Orders Card */}
      <Grid item xs={12} sm={4}>
        <Card
          sx={{ maxWidth: 350, backgroundColor: "#1976d2", color: "#ffffff" }}
        >
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              textAlign="center"
            >
              Total Attendence
            </Typography>
            {loading ? (
              <Typography variant="h6" textAlign="center">
                <CircularProgress color="inherit" />
              </Typography>
            ) : error ? (
              <Typography variant="h6" textAlign="center" color="error">
                {error}
              </Typography>
            ) : (
              <Typography variant="h3" textAlign="center">
                {attendenceCount}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>

      {/* Total Revenue Card */}
      <Grid item xs={12} sm={4}>
        <Card
          sx={{ maxWidth: 350, backgroundColor: "#1976d2", color: "#ffffff" }}
        >
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              textAlign="center"
            >
              Gifts Received
            </Typography>
            {loading ? (
              <Typography variant="h6" textAlign="center">
                <CircularProgress color="inherit" />
              </Typography>
            ) : error ? (
              <Typography variant="h6" textAlign="center" color="error">
                {error}
              </Typography>
            ) : (
              <Typography variant="h3" textAlign="center">
                {giftsCount}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
