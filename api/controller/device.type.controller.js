import { DeviceType } from "../dao/device.type.dao.js";

export async function addDeviceType({ id, type }) {
  let deviceType = await DeviceType.create({ id, type });
}

export async function getById(id) {
  let result = await DeviceType.findById(id);

  console.log(result);
}

export async function updateById(id, data) {
  let result = await DeviceType.updateById(id, data);
}

export async function deleteById(id) {
  let result = await DeviceType.deleteById(id);
}
