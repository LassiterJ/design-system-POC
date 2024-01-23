
import classNames from 'classnames';
import { withBreakpoints} from './breakpoints';
import { mergeStyles } from './mergeStyles';
import {coreNumbers, fractionalUnits} from './coreNumbers';

const paddingValues = Object.keys(coreNumbers);
const fractionalValues = Object.keys(fractionalUnits);

const paddingPropDefs = {
  p: { type: 'enum', values: paddingValues, default: undefined, responsive: true },
  px: { type: 'enum', values: paddingValues, default: undefined, responsive: true },
  py: { type: 'enum', values: paddingValues, default: undefined, responsive: true },
  pt: { type: 'enum', values: paddingValues, default: undefined, responsive: true },
  pe: { type: 'enum', values: paddingValues, default: undefined, responsive: true },
  pb: { type: 'enum', values: paddingValues, default: undefined, responsive: true },
  ps: { type: 'enum', values: paddingValues, default: undefined, responsive: true },
};

export const extractPaddingProps = (props) => {
  const {
    p = layoutPropDefs.p.default,
    px = layoutPropDefs.px.default,
    py = layoutPropDefs.py.default,
    pt = layoutPropDefs.pt.default,
    pe = layoutPropDefs.pe.default,
    pb = layoutPropDefs.pb.default,
    ps = layoutPropDefs.ps.default,
    ...rest
  } = props;
  return { p, px, py, pt, pe, pb, ps, rest };
}

export const withPaddingProps = (props) => {
  return [
    withBreakpoints(props.p, 'compass-p'),
    withBreakpoints(props.px, 'compass-px'),
    withBreakpoints(props.py, 'compass-py'),
    withBreakpoints(props.pt, 'compass-pt'),
    withBreakpoints(props.pe, 'compass-pe'),
    withBreakpoints(props.pb, 'compass-pb'),
    withBreakpoints(props.ps, 'compass-ps'),
  ]
    .filter(Boolean)
    .join(' ');
}

const positionValues = ['static', 'relative', 'absolute', 'fixed', 'sticky'];
const positionEdgeValues = ['auto', ...fractionalValues];
const widthHeightValues = ['auto', 'min-content', 'max-content', '100%', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const flexShrinkValues = ['0', '1'];
const flexGrowValues = ['0', '1'];

const layoutPropDefs = {
  ...paddingPropDefs,
  position: { type: 'enum', values: positionValues, default: undefined, responsive: true },
  inset: { type: 'enum', values: positionEdgeValues, default: undefined, responsive: true },
  top: { type: 'enum', values: positionEdgeValues, default: undefined, responsive: true },
  end: { type: 'enum', values: positionEdgeValues, default: undefined, responsive: true },
  bottom: { type: 'enum', values: positionEdgeValues, default: undefined, responsive: true },
  start: { type: 'enum', values: positionEdgeValues, default: undefined, responsive: true },
  width: { type: 'enum', values: widthHeightValues, default: undefined, responsive: true },
  height: { type: 'enum', values: widthHeightValues, default: undefined, responsive: true },
  shrink: { type: 'enum', values: flexShrinkValues, default: undefined, responsive: true },
  grow: { type: 'enum', values: flexGrowValues, default: undefined, responsive: true },
  gridColumn: { type: 'string', default: undefined, responsive: true },
  gridColumnStart: { type: 'string', default: undefined, responsive: true },
  gridColumnEnd: { type: 'string', default: undefined, responsive: true },
  gridRow: { type: 'string', default: undefined, responsive: true },
  gridRowStart: { type: 'string', default: undefined, responsive: true },
  gridRowEnd: { type: 'string', default: undefined, responsive: true },
};
export const extractLayoutProps = (props) =>{
  const { rest: paddingRest, ...paddingProps } = extractPaddingProps(props);
  const {
    position = layoutPropDefs.position.default,
    width = layoutPropDefs.width.default,
    height = layoutPropDefs.height.default,
    inset = layoutPropDefs.inset.default,
    top = layoutPropDefs.top.default,
    bottom = layoutPropDefs.bottom.default,
    start = layoutPropDefs.start.default,
    end = layoutPropDefs.end.default,
    shrink = layoutPropDefs.shrink.default,
    grow = layoutPropDefs.grow.default,
    gridColumn = layoutPropDefs.gridColumn.default,
    gridColumnStart = layoutPropDefs.gridColumnStart.default,
    gridColumnEnd = layoutPropDefs.gridColumnEnd.default,
    gridRow = layoutPropDefs.gridRow.default,
    gridRowStart = layoutPropDefs.gridRowStart.default,
    gridRowEnd = layoutPropDefs.gridRowEnd.default,
    ...rest
  } = paddingRest;
  return {
    ...paddingProps,
    position,
    width,
    height,
    inset,
    top,
    bottom,
    start,
    end,
    shrink,
    grow,
    gridColumn,
    gridColumnStart,
    gridColumnEnd,
    gridRow,
    gridRowStart,
    gridRowEnd,
    rest,
  };
}

export const getLayoutStyles = (props) => { // TODO: I want to say we can skip the "withBreakpoints" function if we use css variables for these values. Gonna try it out
  const baseLayoutClassNames = classNames(
    withPaddingProps(props),
    withBreakpoints(props.position, 'compass-position'),
    withBreakpoints(props.shrink, 'compass-fs'),
    withBreakpoints(props.grow, 'compass-fg'),
    withBreakpoints(props.width, 'compass-w'),
    withBreakpoints(props.height, 'compass-h'),
    withBreakpoints(props.inset, 'compass-inset'),
    withBreakpoints(props.top, 'compass-top'),
    withBreakpoints(props.right, 'compass-right'),
    withBreakpoints(props.bottom, 'compass-bottom'),
    withBreakpoints(props.left, 'compass-left'),
    withBreakpoints(props.start, 'compass-start'),
    withBreakpoints(props.end, 'compass-end')
  );
  //
  // const [gridColumnClassNames, gridColumnCustomProperties] = getResponsiveStyles({
  //   className: 'compass-gc',
  //   customProperty: '--grid-column',
  //   value: props.gridColumn,
  // });
  //
  // const [gridColumnStartClassNames, gridColumnStartCustomProperties] = getResponsiveStyles({
  //   className: 'compass-gcs',
  //   customProperty: '--grid-column-start',
  //   value: props.gridColumnStart,
  // });
  //
  // const [gridColumnEndClassNames, gridColumnEndCustomProperties] = getResponsiveStyles({
  //   className: 'compass-gce',
  //   customProperty: '--grid-column-end',
  //   value: props.gridColumnEnd,
  // });
  //
  // const [gridRowClassNames, gridRowCustomProperties] = getResponsiveStyles({
  //   className: 'compass-gr',
  //   customProperty: '--grid-row',
  //   value: props.gridRow,
  // });
  //
  // const [gridRowStartClassNames, gridRowStartCustomProperties] = getResponsiveStyles({
  //   className: 'compass-grs',
  //   customProperty: '--grid-row-start',
  //   value: props.gridRowStart,
  // });
  //
  // const [gridRowEndClassNames, gridRowEndCustomProperties] = getResponsiveStyles({
  //   className: 'compass-gre',
  //   customProperty: '--grid-row-end',
  //   value: props.gridRowEnd,
  // });
  
  return [
    classNames(
      baseLayoutClassNames,
      // gridColumnClassNames,
      // gridColumnStartClassNames,
      // gridColumnEndClassNames,
      // gridRowClassNames,
      // gridRowStartClassNames,
      // gridRowEndClassNames
    ),
    mergeStyles(
      // gridColumnCustomProperties,
      // gridColumnStartCustomProperties,
      // gridColumnEndCustomProperties,
      // gridRowCustomProperties,
      // gridRowStartCustomProperties,
      // gridRowEndCustomProperties
    ),
  ];
}
