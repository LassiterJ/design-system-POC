// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//

// Set location by asking what type of component it is.
module.exports = [
  {
    type: "input",
    name: "componentName",
    message: "What's your component's name?",
  },
  {
    type: "input",
    name: "componentLocation",
    message: "Where would you like to place the component?",
  },
];


module.exports = {
  prompt:  async ({ prompter, args }) => {
    // defining questions in arrays ensures all questions are asked before next prompt is executed
    const staticQuestions = [
      {
        type: "input",
        name: "componentName",
        message: "What's your component's name?",
      },
      {
        type: "select",
        name: "componentLocation",
        message: "What type of component is it? This will determine the location of the component. You may select custom to add your own destination url",
        choices: ['Concrete', 'Layout', 'Smart', 'Pattern', 'Base', 'Primitive', 'Template', 'Page', 'Custom'],
      },
    ];
    const conditionalQuestion = {
      type: "input",
      name: "componentLocation",
      message: "Where would you like to place the component?",
    };
    
      const formatOutput = (answers) => {
        const locationsMap = {
          'Concrete': 'src/components/consuming-app/concrete',
          'Layout': 'src/components/consuming-app/layout',
          'Smart': 'src/components/consuming-app/smart',
          'Pattern': 'src/components/compass/pattern',
          'Base': 'src/components/consuming-app/base',
          'Primitive': 'src/components/compass/primitive',
          'Template': 'src/components/compass/template',
          'Page': 'src/components/consuming-app/page',
        }
        const {componentLocation} = answers;
        const location = locationsMap[componentLocation] || 'Custom';
        const componentType = componentLocation;
        
        return {...answers, componentLocation: location, componentType};
      };
  
    const firstQuestions = await prompter.prompt(staticQuestions);
    const firstAnswers = formatOutput(firstQuestions);
    
    if(firstAnswers?.componentLocation !== 'Custom'){
      return Promise.resolve(firstAnswers);
    }
    
    return prompter.prompt(conditionalQuestion).then(secondAnswers => {return {...firstAnswers, ...secondAnswers}});
    
}
};
