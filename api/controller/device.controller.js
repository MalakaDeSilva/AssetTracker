import { Device } from "../dao/device.dao";

export async function addDeviceType({ type }) {
  let device = await Device.create({ type });
}

export async function getById(id) {
  let result = await Device.findById(id);

  console.log(result);
}

export async function updateById(id, data) {
  let result = await Device.updateById(id, data);
}

export async function deleteById(id) {
  let result = await Device.deleteById(id);
}
