const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function create(data) {
  return prisma.deviceAllocation.create({
    data,
  });
}

function findMany(withRelations) {
  return prisma.deviceAllocation.findMany({
    include: {
      employee: withRelations,
      authorizedBy: withRelations,
      device: withRelations,
    },
  });
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
