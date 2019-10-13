import React from 'react';
import { render } from 'react-native-testing-library';
import App from '../App';

describe('App', () => {
  it('can render the app', () => {
    const { toJSON } = render(<App />);
    expect(toJSON()).toMatchSnapshot();
  });
});