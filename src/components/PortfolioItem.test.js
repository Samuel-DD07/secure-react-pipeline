import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PortfolioItem from './PortfolioItem';

const mockProps = {
  title: 'Project Gamma',
  description: 'Gamma description details.',
  tags: ['Solidity', 'Web3'],
  imageUrl: 'gamma.png',
  link: 'https://gamma-url.com',
  images: ['image1.png', 'image2.png'],
  softSkills: ['Adaptability'],
};

test('renders PortfolioItem with details and handles image clicks', () => {
  // Mock window.open
  const windowOpenSpy = jest.spyOn(window, 'open').mockImplementation(() => {});

  render(<PortfolioItem {...mockProps} />);

  // Check texts
  expect(screen.getByText('Project Gamma')).toBeInTheDocument();
  expect(screen.getByText('Gamma description details.')).toBeInTheDocument();
  expect(screen.getByText('Solidity')).toBeInTheDocument();
  expect(screen.getByText('Web3')).toBeInTheDocument();
  expect(screen.getByText('Adaptability')).toBeInTheDocument();

  // Check external project link href
  const projectLink = screen.getByText('Voir le projet');
  expect(projectLink).toHaveAttribute('href', 'https://gamma-url.com');

  // Check images are rendered
  const renderedImages = screen.getAllByRole('img');
  expect(renderedImages.length).toBe(2);

  // Click on the first image container to trigger window.open
  const imageContainer = renderedImages[0].closest('div');
  fireEvent.click(imageContainer);

  expect(windowOpenSpy).toHaveBeenCalledWith('image1.png', '_blank');

  windowOpenSpy.mockRestore();
});
