const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function create({ coreId, firstName, lastName, email, floor }) {
  return prisma.employee.create({
    data: {
      coreId,
      firstName,
      lastName,
      email,
      floor,
    },
  });
}

function findMany(withRelations, filter) {
  return prisma.employee.findMany({
    include: { devices: withRelations },
    where: filter,
  });
}

function findByCoreId(coreId, withRelations) {
  return prisma.employee.findMany({
    where: { coreId },
    include: { devices: withRelations },
  });
}

async function updateByCoreId(coreId, data) {
  return await prisma.employee.update({
    where: { coreId },
    data,
  });
}

async function deleteByCoreId(coreId) {
  return await prisma.employee.delete({
    where: { coreId },
  });
}

module.exports = {
  create,
  findMany,
  findByCoreId,
  updateByCoreId,
  deleteByCoreId,
};
