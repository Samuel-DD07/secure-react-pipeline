import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MainSection from './MainSection';

test('renders MainSection welcome text and action links', () => {
  render(
    <MemoryRouter>
      <MainSection />
    </MemoryRouter>
  );
  
  expect(screen.getByText(/Je suis Samuel Dorismond/i)).toBeInTheDocument();
  expect(screen.getByText(/Voir mes projets/i)).toBeInTheDocument();
  expect(screen.getByText(/Me contacter/i)).toBeInTheDocument();
});
