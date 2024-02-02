// Make a function that creates or replaces a file with the given name and writes the given tokens to it.
// args: {fileName: string, tokens: object, path?: string}

import fs from 'fs';
import { open } from 'fs/promises';
import path from 'path';
export const writeJSONStringToFile = async({ jsonString, fileName, path = './' })=> {
  const filePath = `${path}/${fileName}.json`;
  const fileHandle = await open(filePath, 'w');
  fileHandle?.writeFile(jsonString);
  fileHandle?.close();
}
