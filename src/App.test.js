import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App and displays homepage welcome text', () => {
  render(<App />);
  const mainTitle = screen.getByText(/Je suis Samuel Dorismond/i);
  expect(mainTitle).toBeInTheDocument();
});
