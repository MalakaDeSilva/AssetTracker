-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Device" (
    "serialNo" TEXT NOT NULL PRIMARY KEY,
    "model" TEXT NOT NULL,
    "powerAdapter" BOOLEAN NOT NULL,
    "bag" BOOLEAN NOT NULL,
    "typeId" INTEGER NOT NULL,
    "warranty" BOOLEAN NOT NULL DEFAULT false,
    "warrantyPeriod" REAL NOT NULL DEFAULT 0.0,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "remarks" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Device_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "DeviceType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Device" ("bag", "createdAt", "isAvailable", "model", "powerAdapter", "remarks", "serialNo", "typeId") SELECT "bag", "createdAt", "isAvailable", "model", "powerAdapter", "remarks", "serialNo", "typeId" FROM "Device";
DROP TABLE "Device";
ALTER TABLE "new_Device" RENAME TO "Device";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
