import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class Employee {
  static create({ coreId, firstName, lastName, email }) {
    return prisma.employee.create({
      data: {
        coreId,
        firstName,
        lastName,
        email,
      },
    });
  }

  static findByCoreId(coreId) {
    return prisma.employee.findUnique({
      where: { coreId },
    });
  }

  static async updateByCoreId(coreId, data) {
    return await prisma.employee.update({
      where: { coreId },
      data,
    });
  }

  static async deleteByCoreId(coreId) {
    return await prisma.employee.delete({
      where: { coreId },
    });
  }
}
