import { layoutArgTypes, marginArgTypes } from '../../../../../.storybook/argTypes';
import LayoutComponentTestPage from './LayoutComponentTestPage.jsx';
import { AppStateProvider } from '../../smart/app-state/AppStateProvider.jsx';
export default {
  title: 'Layout/Demo',
  component: LayoutComponentTestPage,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // argTypes: {},
};

export const Basic = {
  decorators: [
    (Story) => (
      <AppStateProvider>
        <Story />
      </AppStateProvider>
    ),
  ],
  args: {
    example: 'basic',
  },
};
export const windowClassCSS = {
  parameters: {
    layout: 'centered',
  },
  args: {
    example: 'windowClassCSS',
  },
  decorators: [
    (Story) => (
      <AppStateProvider>
        <Story />
      </AppStateProvider>
    ),
  ],
};

export const windowClassWithOriginalExample = {
  args: {
    example: 'windowClassWithOriginalExample',
  },
  decorators: [
    (Story) => (
      <AppStateProvider>
        <Story />
      </AppStateProvider>
    ),
  ],
};
export const windowClassHero = {
  args: {
    example: 'windowClassHero',
  },
  decorators: [
    (Story) => (
      <AppStateProvider>
        <Story />
      </AppStateProvider>
    ),
  ],
};
