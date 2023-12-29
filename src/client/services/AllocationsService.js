import axiosIns from "../utils/Axios";

/* const baseURL = process.env.REACT_APP_BASE_URL; */

export async function getAllocationData(scope, filter) {
  let url = `/api/device-alloc`;

  Object.keys(filter).forEach(function (key, idx) {
    if (idx == 0) {
      url = url.concat(`?${key}=${filter[key]}`);
    } else {
      url = url.concat(`&${key}=${filter[key]}`);
    }
  });

  return await axiosIns.get(url);
}

export async function getAllocationDataById(scope, id) {
  return await axiosIns.get(`/api/device-alloc?all=${scope}&id=${id}`);
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
