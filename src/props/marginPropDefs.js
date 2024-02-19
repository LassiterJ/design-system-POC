import { withBreakpoints } from '../utilities/js/breakpoints.js';
import { coreNumbers } from '../utilities/js/coreNumbers.js';
import { negativeCoreKeys } from './layoutPropDefs.js';

// Created based off of Radix-Theme's margin.props.ts: https://github.com/radix-ui/themes/blob/main/packages/radix-ui-themes/src/helpers/props/margin.props.ts
// prettier-ignore

const coreKeys = Object.keys(coreNumbers);
export const marginPropertiesEnums = {
  m: ['auto', ...coreKeys, ...negativeCoreKeys],
  mx: ['auto', ...coreKeys, ...negativeCoreKeys],
  my: ['auto', ...coreKeys, ...negativeCoreKeys],
  mt: ['auto', ...coreKeys, ...negativeCoreKeys],
  me: ['auto', ...coreKeys, ...negativeCoreKeys],
  mb: ['auto', ...coreKeys, ...negativeCoreKeys],
  ms: ['auto', ...coreKeys, ...negativeCoreKeys],
};
export const marginPropDefs = {
  m: {
    type: 'enum',
    className: 'm',
    values: marginPropertiesEnums.m,
    default: undefined,
    responsive: true,
  },
  mx: {
    type: 'enum',
    className: 'mx',
    values: marginPropertiesEnums.mx,
    default: undefined,
    responsive: true,
  },
  my: {
    type: 'enum',
    className: 'my',
    values: marginPropertiesEnums.my,
    default: undefined,
    responsive: true,
  },
  mt: {
    type: 'enum',
    className: 'mt',
    values: marginPropertiesEnums.mt,
    default: undefined,
    responsive: true,
  },
  me: {
    type: 'enum',
    className: 'me',
    values: marginPropertiesEnums.me,
    default: undefined,
    responsive: true,
  },
  mb: {
    type: 'enum',
    className: 'mb',
    values: marginPropertiesEnums.mb,
    default: undefined,
    responsive: true,
  },
  ms: {
    type: 'enum',
    className: 'ms',
    values: marginPropertiesEnums.ms,
    default: undefined,
    responsive: true,
  },
};
//
// export const extractMarginProps = (props) => {
//   const {
//     m = marginPropDefs.m.default,
//     mx = marginPropDefs.mx.default,
//     my = marginPropDefs.my.default,
//     mt = marginPropDefs.mt.default,
//     me = marginPropDefs.me.default,
//     mb = marginPropDefs.mb.default,
//     ms = marginPropDefs.ms.default,
//     ...rest
//   } = props;
//   // Validate that the props are correct.
//   const marginProps = {
//     m,
//     mx,
//     my,
//     mt,
//     me,
//     mb,
//     ms,
//     rest,
//   }; // TODO: Not validating currently.
//   // for (const [key, value] of Object.entries(marginProps)) {
//   //   console.log("value: ", value);
//   //   if (value !== undefined && !marginPropDefs[key]?.values?.includes(value)) {
//   //     console.error(`Invalid value for margin prop '${key}': ${value}`); // TODO: in the real project, we wouldn't let the value move on. We would default it and log the error.
//   //   }
//   // }
//
//   return marginProps;
// };
//
// export const withMarginProps = (props) => {
//   return [
//     withBreakpoints(props.m, 'm'),
//     withBreakpoints(props.mx, 'mx'),
//     withBreakpoints(props.my, 'my'),
//     withBreakpoints(props.mt, 'mt'),
//     withBreakpoints(props.me, 'me'),
//     withBreakpoints(props.mb, 'mb'),
//     withBreakpoints(props.ms, 'ms'),
//   ]
//     .filter(Boolean)
//     .join(' ');
// };
