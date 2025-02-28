import { folderExists, explainDocumentFind } from "./dbFunctions.js";

// Search folder using name (which is indexed)
console.log("Result for Basic Math2332 search (does not exist):");
console.log(await folderExists("Basic Math2332"));


console.log("Result for Test search (exists):");
console.log(await folderExists("Test"));
console.log("How many documents were examined: ");
console.log(await explainDocumentFind("Test")); //results to 1
// only 1 out of all the documents were examined when the query was called
// making the query faster