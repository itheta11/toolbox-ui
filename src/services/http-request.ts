import axios from "axios";
import { APP_BASE_URL } from "../constants";

const axiosInstance = axios.create({
  baseURL: APP_BASE_URL,
  timeout: 30000,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use(
  function (response) {
    // Do something with request data
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const httpRequest = {
  setHeader(header) {
    ////setting header
    axiosInstance.defaults.headers.common[header.key] = header.value;
    // axiosInstance.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axiosInstance.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
  },
  fetch(methodName, data = {}) {
    return axiosInstance.get(methodName, {
      params: data,
    });
  },
  create(methodName, data) {
    return axiosInstance.post(methodName, data);
  },
  update(methodName, id, data) {
    /// call put on axiosinstance
    return axiosInstance.put(methodName + `$/{id}`, data);
  },
  updatePatch(methodName, data) {
    //// call delete on axiosinstance
    return axiosInstance.patch(methodName, data);
  },
  delete(methodName, id) {
    return axiosInstance.delete(methodName + `/${id}`);
  },

  request(type, url, data) {
    let promise = null;
    switch (type) {
      case "GET":
        promise = axios.get(url, { params: data });
        break;
      case "POST":
        promise = axios.post(url, data);
        break;
      case "PUT":
        promise = axios.put(url, data);
        break;
      case "PATCH":
        promise = axios.patch(url, data);
        break;
      case "DELETE":
        promise = axios.delete(url, data);
        break;
      default:
        promise = axios.get(url, { params: data });
        break;
    }

    return promise;
  },
};

export default httpRequest;
