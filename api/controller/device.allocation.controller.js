import { DeviceAllocation } from "../dao/device.allocation.dao";

export async function addDeviceType({
  employeeId,
  userId,
  handedOn,
  returnedOn,
  remarks,
}) {
  let device = await DeviceAllocation.create({
    employeeId,
    userId,
    handedOn,
    returnedOn,
    remarks,
  });
}

export async function getById(id) {
  let result = await DeviceAllocation.findById(id);

  console.log(result);
}

export async function updateById(id, data) {
  let result = await DeviceAllocation.updateById(id, data);
}

export async function deleteById(id) {
  let result = await DeviceAllocation.deleteById(id);
}
