import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

test('renders Header and handles navigation links', () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
  
  // Verify branding is present
  expect(screen.getByText('DORISMOND')).toBeInTheDocument();
  
  // Verify navigation links are present
  expect(screen.getByText('A PROPOS')).toBeInTheDocument();
  expect(screen.getByText('PROJETS')).toBeInTheDocument();
  expect(screen.getByText('CONTACT')).toBeInTheDocument();
});

test('toggles mobile menu on menu button click', () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
  
  // Find menu button
  const menuButton = screen.getByRole('button');
  expect(menuButton).toBeInTheDocument();
  
  // Click to open menu
  fireEvent.click(menuButton);
  // Verify toggling does not crash
  fireEvent.click(menuButton);
});
