import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class Device {
  static create({ type }) {
    return prisma.device.create({
      data: {
        type,
      },
    });
  }

  static findById(id) {
    return prisma.device.findUnique({
      where: { id },
    });
  }

  static async updateById(id, data) {
    return await prisma.device.update({
      where: { id },
      data,
    });
  }

  static async deleteById(id) {
    return await prisma.device.delete({
      where: { id },
    });
  }
}
