import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from './Sidebar';

const mockProjects = [
  {
    id: 1,
    title: 'Project A',
    imageUrl: 'a.png',
  },
  {
    id: 2,
    title: 'Project B',
    imageUrl: 'b.png',
  },
];

test('renders Sidebar with project items and handles selection', () => {
  const selectProjectMock = jest.fn();

  render(
    <Sidebar
      projects={mockProjects}
      selectProject={selectProjectMock}
      selectedProjectId={1}
    />
  );

  // Check project titles are rendered
  expect(screen.getByText('Project A')).toBeInTheDocument();
  expect(screen.getByText('Project B')).toBeInTheDocument();

  // Click on Project B to select it
  const projectBButton = screen.getByText('Project B').closest('button');
  fireEvent.click(projectBButton);

  expect(selectProjectMock).toHaveBeenCalledWith(2);
});
