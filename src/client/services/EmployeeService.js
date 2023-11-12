import axiosIns from "../utils/Axios";

/* const baseURL = process.env.REACT_APP_BASE_URL; */

export async function getEmployeeData(scope) {
  return await axiosIns.get(`/api/employees/${scope}`);
}

export async function getEmployeeDataById(scope, id) {
  return await axiosIns.get(`/api/employees/${id}/${scope}`);
}

export async function addEmployeeData(data) {
  return await axiosIns.post(`/api/employees/new-employee`, data);
}

export async function updateEmployeeData(data) {
  return await axiosIns.put(`/api/employees/${data["id"]}`, data);
}

export async function deleteEmployeeData(id) {
  return await axiosIns.delete(`/api/employees/${id}`);
}
