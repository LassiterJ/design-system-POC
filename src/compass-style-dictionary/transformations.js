import StyleDictionary from 'style-dictionary-esm';

// Custom name transformation
const addPrefixNameTransform = {
  name: 'name/prefix',
  type: 'name',
  transformer: (prop) => {
    return `compass-${prop.name}`;
  }
};

// Custom transform group for SCSS with the new name transformation
const prefixSCSSTransformGroup = {
  name: 'scss/withPrefix',
  transforms: StyleDictionary.transformGroup['scss'].concat(['name/prefix'])
};

// Register the custom transformation and transform group
StyleDictionary.registerTransform(addPrefixNameTransform);
StyleDictionary.registerTransformGroup(prefixSCSSTransformGroup);

export const scssWithPrefix = prefixSCSSTransformGroup.name;
export default scssWithPrefix
