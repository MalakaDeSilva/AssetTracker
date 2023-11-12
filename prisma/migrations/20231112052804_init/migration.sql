-- CreateTable
CREATE TABLE "User" (
    "coreId" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Employee" (
    "coreId" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "floor" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Device" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "serialNo" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "powerAdapter" BOOLEAN NOT NULL,
    "bag" BOOLEAN NOT NULL,
    "typeId" INTEGER NOT NULL,
    "vendor" TEXT NOT NULL,
    "invoiceNo" TEXT NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "remarks" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Device_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "DeviceType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DeviceType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "DeviceAllocation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "deviceId" INTEGER NOT NULL,
    "employeeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "handedOn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hasReturned" BOOLEAN NOT NULL DEFAULT false,
    "returnedOn" DATETIME,
    "remarks" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "DeviceAllocation_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DeviceAllocation_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("coreId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DeviceAllocation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("coreId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "DeviceType_type_key" ON "DeviceType"("type");
