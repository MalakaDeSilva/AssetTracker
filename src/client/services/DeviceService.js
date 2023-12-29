import axiosIns from "../utils/Axios";

/* const baseURL = process.env.REACT_APP_BASE_URL; */

export async function getDeviceData(scope) {
  return await axiosIns.get(`/api/devices?all=${scope}`);
}

export async function getDeviceDataById(scope, serialNo) {
  return await axiosIns.get(`/api/devices?all=${scope}&serialNo=${serialNo}`);
}

export async function addDeviceData(data) {
  return await axiosIns.post(`/api/devices/new-device`, data);
}

export async function updateDeviceData(data) {
  return await axiosIns.put(`/api/devices/${data["serialNo"]}`, data);
}

export async function deleteDeviceData(id) {
  return await axiosIns.delete(`/api/devices/${id}`);
}

export async function getDevicesUsingFilter(filter) {
  return await axiosIns.post(`api/devices/filter`, filter);
}
