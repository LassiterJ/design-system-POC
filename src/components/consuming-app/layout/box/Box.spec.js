import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import { Box } from './Box';
import * as layoutUtilities from '../../../../utilities/js/layout';
import * as marginPropsUtilities from '../../../../utilities/js/margin.props';

// Mock styles and utility functions
vi.mock('./Box.module.scss', () => ({
  'compass-box': 'compass-box',
}));

vi.mock('../../../../utilities/js/layout', () => ({
  extractLayoutProps: vi.fn(),
  getLayoutStyles: vi.fn().mockReturnValue([[], {}]),
  withBreakpoints: vi.fn().mockReturnValue(''),
}));

vi.mock('../../../../utilities/js/margin.props', () => ({
  extractMarginProps: vi.fn(),
  withMarginProps: vi.fn().mockReturnValue(''),
}));

vi.mock('../../../../utilities/js/mergeStyles', () => ({
  mergeStyles: vi.fn((layoutCustomProperties, style) => ({
    ...layoutCustomProperties,
    ...style,
  })),
}));

describe('Box component', () => {
  it('tests the test runner', () => {
    expect(true).toBe(true);
  });
  // it('renders correctly with default props', () => {
  //   render(<Box />);
  //   const box = screen.getByRole('generic');
  //   expect(box).toHaveClass('compass-box');
  //   expect(box).not.toHaveStyle({ display: 'block' }); // Assuming 'block' is not the default
  // });
  //
  // it('applies custom class names and styles', () => {
  //   const customStyle = { backgroundColor: 'blue' };
  //   render(<Box className="custom-class" style={customStyle} />);
  //   const box = screen.getByRole('generic');
  //   expect(box).toHaveClass('compass-box', 'custom-class');
  //   expect(box).toHaveStyle({ backgroundColor: 'blue' });
  // });
  //
  // it('handles the display prop with a valid value', () => {
  //   layoutUtilities.withBreakpoints.mockReturnValue('display-block');
  //   render(<Box display="block" />);
  //   const box = screen.getByRole('generic');
  //   expect(box).toHaveClass('display-block');
  // });
  //
  // it('ignores the display prop with an invalid value', () => {
  //   render(<Box display="flex" />); // Assuming 'flex' is not a valid value for display
  //   const box = screen.getByRole('generic');
  //   expect(box).not.toHaveClass('display-flex');
  // });
  //
  // it('renders as a different component when asChild is true', () => {
  //   render(<Box asChild />);
  //   const box = screen.getByRole('generic');
  //   expect(box.tagName).not.toBe('DIV'); // Check for the correct tag or implementation based on Slot or asChild usage
  // });
});
