import axiosIns from "../utils/Axios";

/* const baseURL = process.env.REACT_APP_BASE_URL; */

export async function getDeviceData(scope) {
  return await axiosIns.get(`/devices/${scope}`);
}

export async function getDeviceDataById(scope, id) {
  return await axiosIns.get(`/devices/${id}/${scope}`);
}

export async function addDeviceData(data) {
  return await axiosIns.post(`/devices/new-device`, data);
}

export async function updateDeviceData(data) {
  return await axiosIns.put(`/devices/${data["_id"]}`, data);
}

export async function deleteDeviceData(id) {
  return await axiosIns.delete(`/devices/${id}`);
}
