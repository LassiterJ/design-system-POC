import { Container } from './Container.jsx';
import { sizePropValueEnum } from './Container.props.js';
import { layoutArgTypes, marginArgTypes } from '../../../../../.storybook/argTypes';
import Box from '../box/Box.jsx';
import Flex from '../flex/Flex.jsx';

export default {
  title: 'Layout/Container',
  component: Container,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    ...marginArgTypes,
    ...layoutArgTypes,
    display: { control: 'select', options: ['initial', 'none'] },
    size: { control: 'select', options: sizePropValueEnum },
  },
};
const singleBoxAsChild = (
  <Box className={'TestBox'} style={{ backgroundColor: '#d8c1c1' }}>
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
      <Flex>
        <Story />
      </Flex>
    ),
  ],
  args: {
    children: singleBoxAsChild,
  },
};

export const AsChild = {
  args: {
    children: singleBoxAsChild,
    asChild: true,
  },
};
