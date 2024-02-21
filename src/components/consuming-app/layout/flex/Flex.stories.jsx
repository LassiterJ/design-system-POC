import { layoutArgTypes, marginArgTypes } from '../../../../../.storybook/argTypes';
import { flexPropDefs } from './Flex.props.js';
import { Flex } from './Flex.jsx';
import { Box } from '../box/Box.jsx';

export default {
  title: 'Layout/Flex',
  component: Flex,
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
    display: { control: 'select', options: flexPropDefs.display.values },
    direction: { control: 'select', options: flexPropDefs.direction.values },
    align: { control: 'select', options: flexPropDefs.align.values },
    justify: { control: 'select', options: flexPropDefs.justify.values },
    wrap: { control: 'select', options: flexPropDefs.wrap.values },
    gap: { control: 'select', options: flexPropDefs.gap.values },
  },
};

const singleBoxAsChild = (
  <Box width="10" height="10" className={'TestBox'} style={{ backgroundColor: 'lightsalmon' }}>
    <span>This is a Box inside a Flex component</span>
  </Box>
);
const multipleBoxesAsChildren = (
  <>
    <Box width="15" height="15" className={'TestBox'} style={{ backgroundColor: 'lightblue' }}>
      <span>Box1</span>
    </Box>
    <Box width="15" height="15" className={'TestBox'} style={{ backgroundColor: 'lightblue' }}>
      <span>Box2</span>
    </Box>
    <Box width="15" height="15" className={'TestBox'} style={{ backgroundColor: 'lightblue' }}>
      <span>Box3</span>
    </Box>
  </>
);
export const Basic = {
  args: {
    children: singleBoxAsChild,
  },
};
export const MultipleChildren = {
  args: {
    children: multipleBoxesAsChildren,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '100vw', padding: '3rem' }}>
        <Story />
      </div>
    ),
  ],
};
