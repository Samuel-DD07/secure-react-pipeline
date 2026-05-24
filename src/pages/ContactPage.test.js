import React from 'react';
import { render, screen } from '@testing-library/react';
import ContactPage from './ContactPage';

test('renders ContactPage with email and linkedin links', () => {
  render(<ContactPage />);
  expect(screen.getByText(/Contactez-moi/i)).toBeInTheDocument();
  
  const emailLink = screen.getByText(/samuel.dorismond@yahoo.com/i);
  expect(emailLink).toBeInTheDocument();
  expect(emailLink.closest('a')).toHaveAttribute('href', 'mailto:samuel.dorismond@yahoo.com');

  const linkedinLink = screen.getByText(/LinkedIn/i);
  expect(linkedinLink).toBeInTheDocument();
  expect(linkedinLink.closest('a')).toHaveAttribute('href', 'https://www.linkedin.com/in/samuel-dorismond-a5798321b/');
});
