// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//

async function loadESModulePrompt() {
  const { prompt } = await import('./es-prompt.js'); // Adjust the path to your actual ES Module prompt file
  return prompt; // Assuming the exported function is named `prompt`
}

module.exports.prompt = async (args) => {
  const promptFunction = await loadESModulePrompt();
  return promptFunction(args);
};
