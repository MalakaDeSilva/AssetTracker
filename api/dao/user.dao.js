import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class User {

  static create({ coreId, firstName, lastName, email, createdAt, devices }) {
    return prisma.user.create({
      data: {
        coreId,
        firstName,
        lastName,
        email,
      },
    });
  }

  static findByCoreId(coreId) {
    return prisma.user.findUnique({
      where: { coreId },
    });
  }

  static async updateByCoreId(coreId, data) {
    return await prisma.user.update({
      where: { coreId },
      data,
    });
  }

  static async deleteByCoreId(coreId) {
    return await prisma.user.delete({
      where: { coreId },
    });
  }
}
