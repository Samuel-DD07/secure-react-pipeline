import React from 'react';
import { render, screen } from '@testing-library/react';
import ProfileCard from './ProfileCard';

test('renders ProfileCard with info and social links', () => {
  render(<ProfileCard />);
  
  expect(screen.getByText('Samuel Dorismond')).toBeInTheDocument();
  expect(screen.getByText(/Etudiant et Responsable en développement web/i)).toBeInTheDocument();
  
  // Verify social links are configured correctly by matching their hrefs
  const links = screen.getAllByRole('link');
  const hrefs = links.map(link => link.getAttribute('href'));
  
  expect(hrefs).toContain('mailto:samuel.dorismond@yahoo.com');
  expect(hrefs).toContain('https://www.linkedin.com/in/samuel-dorismond-a5798321b');
  expect(hrefs).toContain('https://github.com/Samuel-DD07');
});
