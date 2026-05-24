import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutMePage from './AboutMePage';

test('renders AboutMePage with career history and skills', () => {
  render(<AboutMePage />);
  expect(screen.getByText(/Je m'appelle Samuel Dorismond/i)).toBeInTheDocument();
  expect(screen.getByText(/Développement Front-End/i)).toBeInTheDocument();
  expect(screen.getByText(/Développement Back-End/i)).toBeInTheDocument();
  expect(screen.getByText(/Design & UX\/UI/i)).toBeInTheDocument();
});
