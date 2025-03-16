import { insertFillerDocuments, createFolder, getFolderStatsByEmail } from "./dbFunctions.js";
import { createBackup, restoreBackup } from "./dbConnect.js";

// await insertFillerDocuments();
console.log(await getFolderStatsByEmail("syjhert@gmail.com"));
// createBackup();
// restoreBackup();