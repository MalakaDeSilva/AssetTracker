import axiosIns from "../utils/Axios";

/* const baseURL = process.env.REACT_APP_BASE_URL; */

export async function getEmployeeData(scope) {
  return await axiosIns.get(`/employees/${scope}`);
}

export async function getEmployeeDataById(scope, id) {
  return await axiosIns.get(`/employees/${id}/${scope}`);
}

export async function addEmployeeData(data) {
  return await axiosIns.post(`/employees/new-employee`, data);
}

export async function updateEmployeeData(data) {
  return await axiosIns.put(`/employees/${data["_id"]}`, data);
}

export async function deleteEmployeeData(id) {
  return await axiosIns.delete(`/employees/${id}`);
}
