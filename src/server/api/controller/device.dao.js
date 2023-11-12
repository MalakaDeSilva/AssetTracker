const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function create(data) {
  return prisma.device.create({
    data,
  });
}

function findMany(withRelations) {
  return prisma.device.findMany({
    include: {
      deviceType: withRelations,
    },
  });
}

function findById(id, withRelations) {
  return prisma.device.findMany({
    where: { id },
    include: {
      deviceType: withRelations,
    },
  });
}

async function updateById(id, data) {
  return await prisma.device.update({
    where: { id },
    data,
  });
}

async function deleteById(id) {
  return await prisma.device.delete({
    where: { id },
  });
}

module.exports = { create, findMany, findById, updateById, deleteById };
