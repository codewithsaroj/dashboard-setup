import axios from "axios";
import { setAuthorizationToken } from "../authorization";

let config = {
  headers: {
    "Content-Type": "application/json",
  },
};

class ApiClient {
  static get(url, params = null, useToken = false) {
    setAuthorizationToken(axios, useToken);
    return new Promise((fulfill, reject) => {
      axios
        .get(url, { params, ...config })
        .then((response) => {
          fulfill(response);
        })
        .catch((error) => {
          if (error && error.response) {
            reject(error.response);
          } else {
            reject(error);
          }
        });
    });
  }

  static post(url, params, useToken = false) {
    setAuthorizationToken(axios, useToken);
    return new Promise((fulfill, reject) => {
      axios
        .post(url, JSON.stringify(params), config)
        .then((response) => {
          fulfill(response);
        })
        .catch((error) => {
          if (error && error.response) {
            reject(error.response);
          } else {
            reject(error);
          }
        });
    });
  }

  static patch(url, params, useToken = false) {
    setAuthorizationToken(axios, useToken);
    return new Promise((fulfill, reject) => {
      axios
        .patch(url, JSON.stringify(params), config)
        .then((response) => {
          fulfill(response);
        })
        .catch((error) => {
          if (error && error.response) {
            reject(error.response);
          } else {
            reject(error);
          }
        });
    });
  }

  static delete(url, useToken = false) {
    setAuthorizationToken(axios, useToken);
    return new Promise((fulfill, reject) => {
      axios
        .delete(url, config)
        .then((response) => {
          fulfill(response);
        })
        .catch((error) => {
          if (error && error.response) {
            reject(error.response);
          } else {
            reject(error);
          }
        });
    });
  }
}

export default ApiClient;
