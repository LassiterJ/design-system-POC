import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import { Container } from './Container.jsx';
import * as layoutUtilities from '../../../../utilities/js/layout';
import * as marginPropsUtilities from '../../../../props/marginPropDefs.js';
import { setupLayoutComponentTests } from '../../../../test/layoutComponentTestsSetup.js';

// Mock styles and utility functions
setupLayoutComponentTests({ componentName: 'Container' });
describe('Container component', () => {
  it('tests the test runner', () => {
    expect(true).toBe(true);
  });
  // it('renders correctly with default props', () => {
  //   render(<Container />);
  //   const box = screen.getByRole('generic');
  //   expect(box).toHaveClass('compass-box');
  //   expect(box).not.toHaveStyle({ display: 'block' }); // Assuming 'block' is not the default
  // });
  //
  // it('applies custom class names and styles', () => {
  //   const customStyle = { backgroundColor: 'blue' };
  //   render(<Container className="custom-class" style={customStyle} />);
  //   const box = screen.getByRole('generic');
  //   expect(box).toHaveClass('container', 'custom-class');
  //   expect(box).toHaveStyle({ backgroundColor: 'blue' });
  // });
  //
  // it('handles the display prop with a valid value', () => {
  //   layoutUtilities.withBreakpoints.mockReturnValue('display-block');
  //   render(<Container display="block" />);
  //   const box = screen.getByRole('generic');
  //   expect(box).toHaveClass('display-block');
  // });
  //
  // it('ignores the display prop with an invalid value', () => {
  //   render(<Container display="flex" />); // Assuming 'flex' is not a valid value for display
  //   const box = screen.getByRole('generic');
  //   expect(box).not.toHaveClass('display-flex');
  // });
  //
  // it('renders as a different component when asChild is true', () => {
  //   render(<Container asChild />);
  //   const box = screen.getByRole('generic');
  //   expect(box.tagName).not.toBe('DIV'); // Check for the correct tag or implementation based on Slot or asChild usage
  // });
});
