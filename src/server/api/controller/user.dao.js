const Prisma = require("@prisma/client");

const prisma = new Prisma.PrismaClient();

function create({ coreId, firstName, lastName, email }) {
  return prisma.user.create({
    data: {
      coreId,
      firstName,
      lastName,
      email,
    },
  });
}

function findMany(withRelations) {
  return prisma.user.findMany({
    include: { devices: withRelations },
  });
}

function findByCoreId(coreId, withRelations) {
  return prisma.user.findMany({
    where: { coreId },
    include: { devices: withRelations },
  });
}

async function updateByCoreId(coreId, data) {
  return await prisma.user.update({
    where: { coreId },
    data,
  });
}

async function deleteByCoreId(coreId) {
  return await prisma.user.delete({
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
