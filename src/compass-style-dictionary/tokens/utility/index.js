// module.exports = {
//   marginTokens: require('./margin'),
// }

import {marginTokens} from './margin.js';
// import marginTokens from './marginTokens.js' assert { type: 'json' };

export const utilityTokens = {...marginTokens};
