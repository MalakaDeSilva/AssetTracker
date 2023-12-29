const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function create(data) {
  return prisma.device.create({
    data,
  });
}

function findMany(withRelations, filter) {
  return prisma.device.findMany({
    include: {
      deviceType: withRelations,
    },
    where: filter,
  });
}

function findById(serialNo, withRelations) {
  return prisma.device.findMany({
    where: { serialNo },
    include: {
      deviceType: withRelations,
    },
  });
}

async function updateById(serialNo, data) {
  return await prisma.device.update({
    where: { serialNo },
    data,
  });
}

async function deleteById(serialNo) {
  return await prisma.device.delete({
    where: { serialNo },
  });
}

function findUsingFilters(filter) {
  return prisma.device.findMany({ where: filter });
}

module.exports = {
  create,
  findMany,
  findById,
  updateById,
  deleteById,
  findUsingFilters,
};
