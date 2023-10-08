import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class DeviceType {
  static create({ serialNo, typeId }) {
    return prisma.deviceType.create({
      data: {
        serialNo,
        typeId,
      },
    });
  }

  static findById(id) {
    return prisma.deviceType.findUnique({
      where: { id },
    });
  }

  static async updateById(id, data) {
    return await prisma.deviceType.update({
      where: { id },
      data,
    });
  }

  static async deleteById(id) {
    return await prisma.deviceType.delete({
      where: { id },
    });
  }
}
