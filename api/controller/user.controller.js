import { User } from "../DAO/user.dao.js";

export async function addUser({
  coreId,
  firstName,
  lastName,
  email,
  devices = [],
}) {
  let user = await User.create({ coreId, firstName, lastName, email, devices });
}

export async function getUserByCoreId(coreId) {
  let result = await User.findByCoreId(coreId);

  console.log(result);
}

export async function updateByCoreId(coreId, data) {
    let result = await User.updateByCoreId(coreId, data);
}

export async function deleteByCoreId(coreId) {
    let result = await User.deleteByCoreId(coreId);
}