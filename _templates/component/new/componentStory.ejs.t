---
to: <%= componentLocation %>/<%= h.changeCase.param( componentName )%>/<%= h.changeCase.pascal( componentName )%>.stories.js
---
import {<%= h.changeCase.pascal(componentName)%>} from './<%= h.changeCase.pascal( componentName )%>';
export default {
  title: "<%= h.changeCase.pascal(componentType)%>/<%= h.changeCase.pascal( componentName )%>",
  component: <%= h.changeCase.pascal( componentName )%>,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
  },
};

export const Default = {
  args: {
  }
}
