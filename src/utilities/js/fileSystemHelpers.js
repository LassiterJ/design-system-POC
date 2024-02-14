import fs from 'fs';
import { open } from 'fs/promises';
import path from 'path';

export const removeDirectoryContentsIfExists = async (directory, options = {}) => {
  // const { verbose = false,  } = options;
  const directoryExists = fs.existsSync(directory);

  if (!directoryExists) {
    console.info('No directory to delete');
    return;
  }
  try {
    fs.readdirSync(directory).forEach((file) => {
      fs.unlinkSync(path.join(directory, file));
    });

    console.info('Deleted contents of directory: ', directory);
  } catch (err) {
    console.error('Error deleting dist folder: ', err);
  }
};

// Make a function that creates or replaces a file with the given name and writes the given tokens to it.
// args: {fileName: string, tokens: object, path?: string}

export const writeJSONStringToFile = async ({ jsonString, fileName, path = './' }) => {
  const filePath = `${path}/${fileName}.json`;
  const fileHandle = await open(filePath, 'w');
  try {
    const writeFileResponse = await fileHandle?.writeFile(jsonString);
    const closeFileHandleResponse = await fileHandle?.close();

    if (writeFileResponse) console.info(`Wrote ${fileName}.json to ${path}`);
  } catch (error) {
    console.error('Error writing JSON string to file: ', error);
  }
};

export default { removeDirectoryContentsIfExists, writeJSONStringToFile };
