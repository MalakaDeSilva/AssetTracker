import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class DeviceAllocation {
  static create({ employeeId, userId, handedOn, returnedOn, remarks }) {
    return prisma.deviceAllocation.create({
      data: {
        employeeId,
        userId,
        handedOn,
        returnedOn,
        remarks,
      },
    });
  }

  static findById(id) {
    return prisma.deviceAllocation.findUnique({
      where: { id },
    });
  }

  static async updateById(id, data) {
    return await prisma.deviceAllocation.update({
      where: { id },
      data,
    });
  }

  static async deleteById(id) {
    return await prisma.deviceAllocation.delete({
      where: { id },
    });
  }
}
