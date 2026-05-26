import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutMePage from './AboutMePage';

test('renders AboutMePage with career history and skills', () => {
  render(<AboutMePage />);
  expect(screen.getByText(/My name is Samuel Dorismond/i)).toBeInTheDocument();
  expect(screen.getByText(/Front-End Development/i)).toBeInTheDocument();
  expect(screen.getByText(/Back-End Development/i)).toBeInTheDocument();
  expect(screen.getByText(/Design & UX\/UI/i)).toBeInTheDocument();
});
