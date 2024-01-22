import {Box} from "./Box";
import { layoutArgTypes, marginArgTypes } from '../../../../../.storybook/argTypes';

export default {
  title: 'Layout/Box',
  component: Box,
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
    display:{control: "select", options:["none","inline","inline-block","block"]},
  },
};
export const Basic = {};
export const InFlexContainer = {
  decorators: [
    (Story) => (
      <div style={{display: 'flex', width: "100%", padding:"3rem"}}>
        <Story />
      </div>
    ),
  ],
};
