const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function create({ employeeId, userId, deviceId, remarks }) {
  return prisma.deviceAllocation.create({
    data: {
      employeeId,
      userId,
      deviceId,
      remarks,
    },
  });
}

function findMany(withRelations) {
  return prisma.deviceAllocation.findMany({
    include: { employee: withRelations, authorizedBy: withRelations },
  });
}

function findById(id, withRelations) {
  return prisma.deviceAllocation.findUnique({
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
