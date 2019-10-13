import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App.js';

describe('App', () => {
  it('can render the app', () => {
    const container = render(<App />);
    expect(container).toMatchSnapshot();
  });
});
