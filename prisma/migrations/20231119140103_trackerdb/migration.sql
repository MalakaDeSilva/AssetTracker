-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DeviceAllocation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "deviceId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "handedOn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hasReturned" BOOLEAN NOT NULL DEFAULT false,
    "returnedOn" DATETIME,
    "remarks" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "DeviceAllocation_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device" ("serialNo") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DeviceAllocation_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("coreId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DeviceAllocation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("coreId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DeviceAllocation" ("createdAt", "deviceId", "employeeId", "handedOn", "hasReturned", "id", "remarks", "returnedOn", "userId") SELECT "createdAt", "deviceId", "employeeId", "handedOn", "hasReturned", "id", "remarks", "returnedOn", "userId" FROM "DeviceAllocation";
DROP TABLE "DeviceAllocation";
ALTER TABLE "new_DeviceAllocation" RENAME TO "DeviceAllocation";
CREATE TABLE "new_Device" (
    "serialNo" TEXT NOT NULL PRIMARY KEY,
    "model" TEXT NOT NULL,
    "powerAdapter" BOOLEAN NOT NULL,
    "bag" BOOLEAN NOT NULL,
    "typeId" INTEGER NOT NULL,
    "vendor" TEXT NOT NULL,
    "invoiceNo" TEXT NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "remarks" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Device_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "DeviceType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Device" ("bag", "createdAt", "invoiceNo", "isAvailable", "model", "powerAdapter", "remarks", "serialNo", "typeId", "vendor") SELECT "bag", "createdAt", "invoiceNo", "isAvailable", "model", "powerAdapter", "remarks", "serialNo", "typeId", "vendor" FROM "Device";
DROP TABLE "Device";
ALTER TABLE "new_Device" RENAME TO "Device";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
