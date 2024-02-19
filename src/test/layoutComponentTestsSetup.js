import { vi } from 'vitest';

export const setupLayoutComponentTests = (config) => {
  const { componentName, mainCSSClassName } = config;
  const componentCSSClassName = mainCSSClassName
    ? mainCSSClassName
    : `compass-${componentName.toLowerCase()}`;

  vi.mock(`./${componentName.toUpperCase()}.module.scss`, () => ({
    componentCSSClassName: componentCSSClassName,
  }));

  vi.mock('../utilities/js/layout', () => ({
    extractLayoutProps: vi.fn(),
    getLayoutStyles: vi.fn().mockReturnValue([[], {}]),
    withBreakpoints: vi.fn().mockReturnValue(''),
  }));

  vi.mock('../utilities/js/margin.props', () => ({
    extractMarginProps: vi.fn(),
    withMarginProps: vi.fn().mockReturnValue(''),
  }));

  vi.mock('../utilities/js/mergeStyles', () => ({
    mergeStyles: vi.fn((layoutCustomProperties, style) => ({
      ...layoutCustomProperties,
      ...style,
    })),
  }));
};
