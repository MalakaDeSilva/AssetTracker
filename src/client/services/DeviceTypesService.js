import axiosIns from "../utils/Axios";

/* const baseURL = process.env.REACT_APP_BASE_URL; */

export async function getDeviceTypeData(scope) {
  return await axiosIns.get(`/api/device-types?all=${scope}`);
}

export async function getDeviceTypeDataById(scope, id) {
  return await axiosIns.get(`/api/device-types?all=${scope}&id=${id}`);
}

export async function addDeviceTypeData(data) {
  return await axiosIns.post(`/api/device-types/new-device-type`, data);
}

export async function updateDeviceTypeData(data) {
  return await axiosIns.put(`/api/device-types/${data["id"]}`, data);
}

export async function deleteDeviceTypeData(id) {
  return await axiosIns.delete(`/api/device-types/${id}`);
}
