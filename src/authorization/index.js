/******** Get User from store  ***********/
export const User = (store) => {
  return store.getState().user;
};

/******** Routing authentication middleware ***********/
export const Authorization = (store) => {
  return User(store).loggedIn;
};

export const setAuthorizationToken = (axios, useToken = null) => {
  axios.defaults.withCredentials = true;
  if (useToken === true) {
    const token = localStorage.getItem("authToken");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `${token}`;
    }
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
