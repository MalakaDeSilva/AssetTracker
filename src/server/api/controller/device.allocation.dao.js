const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function create(data) {
  return prisma.deviceAllocation.create({
    data,
  });
}

function findMany(withRelations, filter) {
  let queryParam = {
    include: {
      employee: withRelations,
      authorizedBy: withRelations,
      device: withRelations,
    },
    where: filter,
  };
  return prisma.deviceAllocation.findMany(queryParam);
}

function findById(id, withRelations) {
  return prisma.deviceAllocation.findMany({
    where: { id },
    include: { employee: withRelations, authorizedBy: withRelations },
  });
}

async function updateById(id, data) {
  return await prisma.deviceAllocation.update({
    where: { id },
    data,
  });
}

async function deleteById(id) {
  return await prisma.deviceAllocation.delete({
    where: { id },
  });
}

module.exports = {
  create,
  findMany,
  findById,
  updateById,
  deleteById,
};
