import fs from 'fs/promises';

// filepath on the same folder
const filePath = 'data/folders.json';

export async function readFolders() {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
}

export async function writeFolders(folders) {
    await fs.writeFile(filePath, JSON.stringify(folders, null, 2));
}