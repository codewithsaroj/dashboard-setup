/*
@description: This is file contains all backend API end points
*/

/******************Base URl**********************/
export const BASE_URL = import.meta.env.VITE_BACKEND_URL;

/******************User**********************/
export const USER = {
  LOGIN: "auth/login",
  REGISTER: "auth/create-user",
  LOGOUT: "auth/logout",
};

/******************Customers**********************/
export const CUSTOMERS = {
  CREATE_CUSTOMER: "customer/create",
  GET_CUSTOMER_BY_ID: "customer/getCustomerById",
  UPDATE_CUSTOMER: "customer/updateCustomer",
  DELETE_CUSTOMER: "customer/deleteCustomer",
  GET_ALL_CUSTOMERS: "customer/allCustomers",
};

/******************Dashboard**********************/
export const DASHBOARD = {
  DASHBOARD_CUSTOMER_DATA: "customer/dashboardCustomerData",
};
