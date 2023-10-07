import { Employee } from "../dao/employee.dao.js";

export async function addEmployee({ coreId, firstName, lastName, email }) {
  let employee = await Employee.create({ coreId, firstName, lastName, email });
}

export async function getEmployeeByCoreId(coreId) {
  let result = await Employee.findByCoreId(coreId);

  console.log(result);
}

export async function updateByCoreId(coreId, data) {
  let result = await Employee.updateByCoreId(coreId, data);
}

export async function deleteByCoreId(coreId) {
  let result = await Employee.deleteByCoreId(coreId);
}
