import { withBreakpoints } from '../breakpoints';

// prettier-ignore
const marginValues = ['auto', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-1', '-2', '-3', '-4', '-5', '-6', '-7', '-8', '-9'];

const marginPropDefs = {
  m: { type: 'enum', values: marginValues, default: undefined, responsive: true },
  mx: { type: 'enum', values: marginValues, default: undefined, responsive: true },
  my: { type: 'enum', values: marginValues, default: undefined, responsive: true },
  mt: { type: 'enum', values: marginValues, default: undefined, responsive: true },
  me: { type: 'enum', values: marginValues, default: undefined, responsive: true },
  mb: { type: 'enum', values: marginValues, default: undefined, responsive: true },
  ms: { type: 'enum', values: marginValues, default: undefined, responsive: true },
};

export const extractMarginProps = (props) =>{
  const {
    m = marginPropDefs.m.default,
    mx = marginPropDefs.mx.default,
    my = marginPropDefs.my.default,
    mt = marginPropDefs.mt.default,
    me = marginPropDefs.me.default,
    mb = marginPropDefs.mb.default,
    ms = marginPropDefs.ms.default,
    ...rest
  } = props;
  return { m, mx, my, mt, me, mb, ms, rest };
}

export const withMarginProps = (props) => {
  return [
    withBreakpoints(props.m, 'compass-r-m'),
    withBreakpoints(props.mx, 'compass-r-mx'),
    withBreakpoints(props.my, 'compass-r-my'),
    withBreakpoints(props.mt, 'compass-r-mt'),
    withBreakpoints(props.me, 'compass-r-me'),
    withBreakpoints(props.mb, 'compass-r-mb'),
    withBreakpoints(props.ms, 'compass-r-ms'),
  ]
    .filter(Boolean)
    .join(' ');
}
