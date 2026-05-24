import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Portfolio from './Portfolio';

const mockProjects = [
  {
    id: 1,
    title: 'Project Alpha',
    description: 'Alpha description',
    tags: ['React', 'CSS'],
    imageUrl: 'alpha.png',
    link: 'https://alpha.com',
    images: [],
    softSkills: ['Teamwork'],
  },
  {
    id: 2,
    title: 'Project Beta',
    description: 'Beta description',
    tags: ['Node', 'Solidity'],
    imageUrl: 'beta.png',
    link: 'https://beta.com',
    images: [],
    softSkills: ['Communication'],
  },
];

test('renders Portfolio and switches active project when sidebar button is clicked', () => {
  render(<Portfolio projects={mockProjects} />);
  
  // By default, the first project (Project Alpha) is selected
  expect(screen.getAllByText('Project Alpha').length).toBeGreaterThan(0);
  expect(screen.getByText('Alpha description')).toBeInTheDocument();
  expect(screen.getByText('React')).toBeInTheDocument();
  
  // Click on Project Beta button in the sidebar
  const betaButtons = screen.getAllByText('Project Beta');
  fireEvent.click(betaButtons[0]);
  
  // Now Project Beta should be rendered
  expect(screen.getByText('Beta description')).toBeInTheDocument();
  expect(screen.getByText('Node')).toBeInTheDocument();
});
