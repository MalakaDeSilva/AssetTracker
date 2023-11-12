const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function create(data, withRelations) {
  return prisma.deviceType.create({
    data,
    include: {
      devices: withRelations,
    },
  });
}

function findMany(withRelations) {
  return prisma.deviceType.findMany({
    include: {
      devices: withRelations,
    },
  });
}

function findById(id, withRelations) {
  return prisma.deviceType.findUnique({
    where: { id },
    include: {
      devices: withRelations,
    },
  });
}

async function updateById(id, data) {
  return await prisma.deviceType.update({
    where: { id },
    data,
  });
}

async function deleteById(id) {
  return await prisma.deviceType.delete({
    where: { id },
  });
}

module.exports = {
  create,
  findById,
  findMany,
  updateById,
  deleteById,
};
