import fs from 'fs';
import StyleDictionary from 'style-dictionary-esm';
import path from 'path';

// Define the custom action
export const generateIndexBarrelAction = {
  name: 'custom/css/index-barrel',
  do: function (dictionary, config) {
    const { buildPath } = config;
    const files = fs.readdirSync(buildPath);

    const exportEntries = files
      .filter((file) => {
        return (
          file.endsWith('.css') ||
          file.endsWith('.module.css') ||
          file.endsWith('.scss') ||
          file.endsWith('.module.scss')
        );
      })
      .map((file) => `@import './${file}';`);
    console.log('exportEntries: ', exportEntries);
    const indexContent = exportEntries.join('\n');
    fs.writeFileSync(path.join(buildPath, 'index.css'), indexContent, 'utf-8');

    console.log('Index barrel generated successfully.');
  },
  undo: function (dictionary, config) {
    console.log('nothing to undo');
  },
};

export const registerCustomActions = () => {
  StyleDictionary.registerAction(generateIndexBarrelAction);
};
