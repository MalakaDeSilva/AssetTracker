import axiosIns from "../utils/Axios";

/* const baseURL = process.env.REACT_APP_BASE_URL; */

export async function getAllocationData(scope) {
  return await axiosIns.get(`/api/device-alloc/${scope}`);
}

export async function getAllocationDataById(scope, id) {
  return await axiosIns.get(`/api/device-alloc/${id}/${scope}`);
}

export async function addAllocationData(data) {
  return await axiosIns.post(`/api/device-alloc/allocate-device`, data);
}

export async function updateAllocationData(data) {
  return await axiosIns.put(`/api/device-alloc/${data["_id"]}`, data);
}

export async function deleteAllocationData(id) {
  return await axiosIns.delete(`/api/device-alloc/${id}`);
}

export async function getAllocationsUsingFilter(filter) {
  return await axiosIns.post(`api/devices/filter`, filter);
}