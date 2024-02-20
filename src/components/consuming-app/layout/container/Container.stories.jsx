import { Container } from './Container.jsx';
import { sizePropValueEnum } from './ContainerPropDef.js';
import { layoutArgTypes, marginArgTypes } from '../../../../../.storybook/argTypes';
import Box from '../box/Box.jsx';

export default {
  title: 'Layout/Container',
  component: Container,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    ...marginArgTypes,
    ...layoutArgTypes,
    display: { control: 'select', options: ['none', 'block'] },
    size: { control: 'select', options: sizePropValueEnum },
  },
};
const singleBoxAsChild = (
  <Box p={'4'} className={'TestBox'} style={{ backgroundColor: 'lightsalmon' }}>
    <span>This is a Box inside a Container</span>
  </Box>
);

export const Basic = {
  args: {
    children: singleBoxAsChild,
    style: { border: '2px solid black' },
  },
};
export const InFlexContainer = {
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', width: '100%', padding: '3rem' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    children: singleBoxAsChild,
  },
};
