import { describe, it, expect, vi } from 'vitest';
import { filterTokensByType } from '../filters.js'; // Adjust the import path based on your file structure

describe('filterTokensByType function', () => {
  const mockTokens = [
    { name: 'primaryColor', type: 'color/primary', value: '#007bff' },
    { name: 'secondaryColor', type: 'color/secondary', value: '#6c757d' },
    { name: 'fontSizeSmall', type: 'size/font/small', value: '12px' },
    { name: 'fontSizeLarge', type: 'size/font/large', value: '18px' },
    { name: 'marginMedium', type: 'size/margin/medium', value: '16px' },
  ];

  it('includes tokens based on type', () => {
    const filtered = mockTokens.filter(
      filterTokensByType({ include: 'color/primary' })
    );
    expect(filtered).toEqual([mockTokens[0]]);
  });

  it('excludes tokens based on type', () => {
    const filtered = mockTokens.filter(
      filterTokensByType({ exclude: 'color/primary' })
    );
    expect(filtered).not.toContain(mockTokens[0]);
    expect(filtered.length).toBe(mockTokens.length - 1);
  });

  it('supports partial matching for includes', () => {
    const filtered = mockTokens.filter(
      filterTokensByType({ include: 'font', partial: true })
    );
    expect(filtered).toEqual([mockTokens[2], mockTokens[3]]);
  });

  it('supports partial matching for excludes', () => {
    const filtered = mockTokens.filter(
      filterTokensByType({ exclude: 'font', partial: true })
    );
    expect(filtered).toEqual([mockTokens[0], mockTokens[1], mockTokens[4]]);
  });

  it('gives precedence to includes over excludes when preferIncluded is true', () => {
    const filtered = mockTokens.filter(
      filterTokensByType({
        include: 'size',
        exclude: 'medium',
        partial: true,
        preferIncluded: true,
      })
    );
    expect(filtered).toEqual([mockTokens[2], mockTokens[3], mockTokens[4]]);
  });

  it('properly excludes tokens when preferIncluded is false and tokens match both include and exclude criteria', () => {
    const filtered = mockTokens.filter(
      filterTokensByType({
        include: 'size',
        exclude: 'medium',
        partial: true,
        preferIncluded: false,
      })
    );
    expect(filtered).toEqual([mockTokens[2], mockTokens[3]]);
  });

  it('returns all tokens if no include or exclude criteria are specified', () => {
    const filtered = mockTokens.filter(filterTokensByType({}));
    expect(filtered).toEqual(mockTokens);
  });

  it('handles strings and arrays for include and exclude', () => {
    const filteredIncludeArray = mockTokens.filter(
      filterTokensByType({ include: ['color/primary', 'color/secondary'] })
    );
    expect(filteredIncludeArray).toEqual([mockTokens[0], mockTokens[1]]);

    const filteredExcludeString = mockTokens.filter(
      filterTokensByType({ exclude: 'color', partial: true })
    );
    expect(filteredExcludeString).toEqual([
      mockTokens[2],
      mockTokens[3],
      mockTokens[4],
    ]);
  });
});
