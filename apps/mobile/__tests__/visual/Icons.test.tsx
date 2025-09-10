// packages/mobile/__tests__/visual/Icons.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import { Icon } from '../../src/components/Icon';

describe('Icon Visual Tests', () => {
  const iconNames = ['home', 'search', 'scan', 'profile'];

  iconNames.forEach(name => {
    it(`should render ${name} icon correctly`, () => {
      const { toJSON } = render(
        <Icon name={name as any} size={24} color="#2D89EF" />
      );
      expect(toJSON()).toMatchSnapshot();
    });
  });
});
