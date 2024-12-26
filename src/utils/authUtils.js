export const checkAuthStatus = () => {
  const isLoggedIn = window.localStorage.getItem("isLoggedIn");
  const authToken = window.localStorage.getItem("authToken");
  const userRole = window.localStorage.getItem("userRole");

  if (isLoggedIn && authToken && userRole) {
    return true;
  } else {
    return false;
  }
};
