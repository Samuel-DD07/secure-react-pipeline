import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './HomePage';

test('renders HomePage with main sections', () => {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );
  expect(screen.getAllByText(/Samuel Dorismond/i).length).toBeGreaterThan(0);
  expect(screen.getByText(/View my projects/i)).toBeInTheDocument();
});
