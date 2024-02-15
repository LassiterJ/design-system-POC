/** @type { import('@storybook/react').Preview } */
import '../src/index.css';
import { withConsole } from '@storybook/addon-console';
const preview = {
  parameters: {
    decorators: [(storyFn, context) => withConsole()(storyFn)(context)],
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
